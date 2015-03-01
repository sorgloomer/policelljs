angular.module('policellApp').factory("SdbReader", function ($q) {
  function file_to_bytes(file) {
    try {
      var defer = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var buffer = e.target.result;
        var bytes = new Uint8Array(buffer);
        defer.resolve(bytes);
      };
      fileReader.readAsArrayBuffer(file);
      return defer.promise;
    } catch (e) {
      return $q.reject(e);
    }
  }

  function readHeader(bytes) {
    return NativeSdbReader.readHeader(bytes);
  }
  function readRecord(bytes, index) {
    return NativeSdbReader.readRecord(bytes, index);
  }
  function readRecords(bytes, index, length) {
    return NativeSdbReader.readRecords(bytes, index, length);
  }


  return {
    readHeader: readHeader,
    readRecord: readRecord,
    readRecords: readRecords,
    file_to_bytes: file_to_bytes
  };
});