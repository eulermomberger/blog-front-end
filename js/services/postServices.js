blogClient.service('postsService', function($http, $routeParams){
  this.getPosts = function(option, value) {
    switch(option) {
      case 'tag' : return $http.get('http://localhost:3000/posts/?tag='+value);
      case 'title': return $http.get('http://localhost:3000/posts/?title='+value);
      case 'description': return $http.get('http://localhost:3000/posts/?description='+value);
      case 'comment': return $http.get('http://localhost:3000/posts/?comment='+value);
    }
    return $http.get('http://localhost:3000/posts');
  }
})

blogClient.service('postService', function($http, $routeParams){
  this.getPost = function() {
    return $http.get('http://localhost:3000/posts/'+$routeParams.id);
  }
})

blogClient.service('userService', function($http) {
  this.getUser = function(username) {
    return $http.get('http://localhost:3000/users/'+username);
  }
})

blogClient.service('tagsService', function($http) {
  this.getTags = function() {
    return $http.get('http://localhost:3000/tags');
  }
})