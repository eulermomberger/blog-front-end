blogClient.controller('CommentsController', function($scope, $http, $routeParams, postService) {
    var ctrl = this;

	ctrl.respond = function (comment_id) {
    	document.getElementById('comment').focus();
    	$routeParams.comment_id = comment_id;
	}

  	ctrl.deleteComment = function (comment_id) {
    	let option = confirm('Deseja realmente deletar esse comentário?');
    	if(option) {
      		$http.delete('http://localhost:3000/posts/'+$routeParams.id+'/comments/'+comment_id)
      		.then(function successCallback(response) {
	        	delete $scope.$ctrl;
  			})
    	}
  	}
})