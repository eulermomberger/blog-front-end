blogClient.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'PostsController'
    })
    .when("/posts", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'PostsController',
    })
    .when("/post/:id", {
      templateUrl: "/blog-client/views/show.html",
      controller: 'ShowController'
    })
    .when("/posts/new", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'NewController',
    })
    .when("/post/edit/:id", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'EditController'
    })
});