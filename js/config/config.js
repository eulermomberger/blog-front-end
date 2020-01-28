blogClient.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      redirectTo: "/posts"
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
        users: function (usersService) {
          return usersService.getUsers();
        },
        tags: function (tagsService) {
          return tagsService.getTags();
        }
      }
    })
    .when("/post/edit/:id", {
      templateUrl: "/blog-client/views/form.html",
      controller: 'EditController',
      resolve: {
        users: function (usersService) {
          return usersService.getUsers();
        },
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
    .when("/users", {
      templateUrl: "/blog-client/views/users.html",
      controller: 'UsersController',
      resolve: {
        users: function (usersService) {
          return usersService.getUsers();
        }
      }
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