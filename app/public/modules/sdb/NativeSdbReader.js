var NativeSdbReader = (function() {

  var DELPHI_EPOCH = new Date(1899, 11, 30, 0, 0);
  var MILLISECS_IN_DAY = 24 * 60 * 60 * 1000;
  var RECORD_SIZE = 696;
  var HEADER_SIZE = 16;

  function string(bytes, index) {
    var result = '';
    var end = index + 1 + bytes[index];
    for (var i = index + 1; i < end; i++) {
      result += String.fromCharCode(bytes[i]);
    }
    return result;
  }

  function int32(bytes, index) {
    return bytes[index]
      | (bytes[index + 1] << 8)
      | (bytes[index + 2] << 16)
      | (bytes[index + 3] << 24);
  }
  function double(bytes, index) {
    var copy = new Uint8Array(bytes.subarray(index, index + 8));
    return (new Float64Array(copy.buffer))[0];
  }

  function date(bytes, index) {
    var days = double(bytes, index);
    return new Date(DELPHI_EPOCH.getTime() + days * MILLISECS_IN_DAY);
  }


  function record(bytes, index) {
    return {
      reg_id: string(bytes, index),
      reg_date: date(bytes, index + 16),

      str1: string(bytes, index + 24),
      str2: string(bytes, index + 95),
      str3: string(bytes, index + 236),
      str4: string(bytes, index + 287),
      str5: string(bytes, index + 338),
      str6: string(bytes, index + 479),
      dbl7: double(bytes, index + 496),
      dbl8: double(bytes, index + 504),
      dbl9: double(bytes, index + 512),
      dbl10: double(bytes, index + 520),
      str11: string(bytes, index + 528),
      str12: string(bytes, index + 669)
      // end at: index + 696
    };
  }

  function estimateRecordCount(bytes) {
    return Math.floor((bytes.length - HEADER_SIZE) / RECORD_SIZE);
  }

  function readHeader(bytes) {
    var version = int32(bytes, 0);
    var counterPiece = int32(bytes, 4);
    var counterYear = int32(bytes, 8);
    var recordCount = int32(bytes, 12);
    var estimatedCount = estimateRecordCount(bytes);

    return {
      version: version,
      counterPiece: counterPiece,
      counterYear: counterYear,
      recordCount: recordCount,
      estimatedCount: estimatedCount,
    };
  }

  function readRecord(bytes, index) {
    if (index === undefined) index = 0;
    return record(bytes, HEADER_SIZE + index * RECORD_SIZE);
  }

  function readRecords(bytes, index, count) {
    if (index === undefined) index = 0;
    var estimatedCount = estimateRecordCount(bytes);
    if (index < 0) index = estimatedCount + index;

    var end = (count === undefined)
      ? estimatedCount
      : Math.min(index + count, estimatedCount);
    var length = end - index;

    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      result[i] = readRecord(bytes, i + index);
    }
    return result;
  }

  return {
    readHeader: readHeader,
    readRecord: readRecord,
    readRecords: readRecords
  };
})();