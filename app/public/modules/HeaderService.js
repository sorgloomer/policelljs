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
    setCurrentPageInternal(($location.url() || '/main').substring(1));
  }

  function getCurrentPage() {
    return currentPage;
  }
  return { isPage: isPage, openPage: openPage, determinePage: determinePage, getCurrentPage: getCurrentPage };
});
