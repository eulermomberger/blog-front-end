blogClient.config(function($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "/blog-client/views/login.html",
      controller: "LoginController"
    })
    .when("/posts", {
      templateUrl: "/blog-client/views/posts.html",
      controller: 'PostsController',
      resolve: {
        posts: function (postsService) {
          return postsService.getPosts();
        },
        tags: function (tagsService) {
          return tagsService.getTags();
        }
      }
    })
    .when("/post/:id", {
      templateUrl: "/blog-client/views/show.html",
      controller: 'ShowController'
    })
    .when("/posts/new", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'NewController',
      resolve: {
        tags: function (tagsService) {
          return tagsService.getTags();
        }
      }
    })
    .when("/post/edit/:id", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'EditController',
      resolve: {
        tags: function (tagsService) {
          return tagsService.getTags();
        }
      }
    })
    .when("/tags", {
      templateUrl: "/blog-client/views/tags.html",
      controller: 'TagsController',
      resolve: {
        tags: function (tagsService) {
          return tagsService.getTags();
        }
      }
    })
    .when("/tags/new", {
      templateUrl: "/blog-client/views/formTag.html",
      controller: 'NewTagController'
    })
    .when("/tag/edit/:id", {
      templateUrl: "/blog-client/views/formTag.html",
      controller: 'EditTagController'
    })
    .when("/user", {
      templateUrl: "/blog-client/views/user.html",
      controller: 'UsersController'
    })
    .when("/users/new", {
      templateUrl: "/blog-client/views/formUser.html",
      controller: 'NewUserController'
    })
    .when("/user/edit/:id", {
      templateUrl: "/blog-client/views/formUser.html",
      controller: 'EditUserController'
    })
});