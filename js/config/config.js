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
    .when("/tags", {
      templateUrl: "/blog-client/views/tags.html",
      controller: 'TagsController'
    })
    .when("/tags/new", {
      templateUrl: "/blog-client/views/formTag.html",
      controller: 'NewTagController'
    })
    .when("/tag/edit/:id", {
      templateUrl: "/blog-client/views/formTag.html",
      controller: 'EditTagController'
    })
});