var blogClient = angular.module('blogClient',["ngRoute", 'angularUtils.directives.dirPagination', 'ngStorage']);

blogClient.run(function ($rootScope, $http, $location, $localStorage, userService){
	if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
  }


  if($location.url() == '/') {
    if ($localStorage.currentUser) {
      $location.url('/posts')
    } else {
      $location.url('/login')
    }
  }

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    var paginasPublicas = ['/login', '/users/new'];
    var paginaRestrita = paginasPublicas.indexOf($location.path()) === -1;

    if (paginaRestrita && !$localStorage.currentUser) {
      $location.path('/login');
    }
  });
});