angular.module('policellApp').factory('HeaderService', function(
  $rootScope, $location
) {
  var currentPage = null;

  function isPage(guess) {
    return currentPage === guess;
  }

  function openPage(page) {
    setCurrentPageInternal(page);
    $location.url(page);
  }
  function setCurrentPageInternal(newPage) {
    if (currentPage !== newPage) {
      currentPage = newPage;
      $rootScope.$broadcast('page-changed', newPage);
    }
  }

  function determinePage() {
    var url = $location.url(), page = null;
    if (url) {
      var m = /\/([^\/]*)/.exec(url);
      if (m) page = m[1];
    }
    if (!page) page = 'main';
    setCurrentPageInternal(page);
    return page;
  }

  function getCurrentPage() {
    return currentPage;
  }

  $rootScope.$on('$locationChangeSuccess', determinePage);

  return { isPage: isPage, openPage: openPage, determinePage: determinePage, getCurrentPage: getCurrentPage };
});
