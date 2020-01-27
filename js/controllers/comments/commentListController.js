blogClient.controller('CommentListController', function($scope, $http, $routeParams){
	var ctrl = this;

	ctrl.list = [];

	ctrl.getComments = function(){
    	$http.get('http://localhost:3000/posts/'+$routeParams.id)
    	.then(function successCallback(response) {
      		ctrl.list = response.data.comments;
    	})
  	}

	ctrl.getComments();

})