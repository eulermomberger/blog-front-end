blogClient.controller('CommentsController', function($scope, $http, $routeParams) {
	var ctrl = this;

	ctrl.respond = function (comment_id) {
    	document.getElementById('comment').focus();
    	$routeParams.comment_id = comment_id;
    	console.log($routeParams.comment_id)
  	}

  	ctrl.deleteComment = function (comment_id) {
    	let option = confirm('Deseja realmente deletar esse comentário?');
    	if(option) {
      		$http.delete('http://localhost:3000/posts/'+$routeParams.id+'/comments/'+comment_id)
      		.then(function successCallback(response) {
	        	window.location.reload();
  			})
    	} else {
      		window.location.replace('/blog-client/#!/post/'+$routeParams.id);
    	}
  	}
})