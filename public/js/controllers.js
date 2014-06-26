var bracketsControllers = angular.module('bracketsControllers', ['ngRoute']);

//These controllers leverage a RESTapi that communicates with the NodeJS server side code and a MongoDB database
//Using this api, the data in Mongo is available to the angular functions

//This is the controller for the List page
bracketsControllers.controller('listControl', ['$scope', '$http',
	function ($scope, $http){
		//when landing on this page, get all Brackets and show them
		$http.get('/api/getBrackets')
			.success(function(data){
				$scope.brackets = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
		
		//when this function is invoked, delete the bracket with the give ID
		$scope.deleteBracket = function(id){
			window.location.reload();
			$http.delete('api/deleteBracket/' + id)
				.success(function(data){
					$scope.brackets = data;
					console.log(data);
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
		};
		}]);

//this is the controller for the Draw page
bracketsControllers.controller('drawControl', ['$scope', '$http',
	function ($scope, $http){
		
		//when this function is invoked, the given bracket information is saved to the Database
		//the function also disables the save button so that the use cannot hit save multiple times
		//an alert is also given to the customer to notify that the bracket has been saved.
		$scope.saveBracket = function(){
			$scope.disableSave = "true";
			alert("You saved your Bracket!");
			$http.post('/api/saveBracket', $scope.create)
				.success(function(data){
					console.log(data);
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
		};
		
		//Establishes variables that are used by the angular code to determine what information is shown to the user		
		//The initial layout of the page is defined as step 1
		$scope.step = 1;
		$scope.disableSave = "";
		
		//resets the bracket and page to the initial layout. 
		$scope.reset = function(){
			$scope.create = "";
			$scope.step = 1;
			$scope.drawItems = "";
			$scope.disableSave = "";
			$scope.form.$setPristine();
		};
		
		//Draws a bracket on the page given the user's selections
		//Tells the code to show step 2
		$scope.draw = function(items){
			$scope.drawItems = items;
			$scope.step = 2;
		};
		
		//Tells the code to show step 3
		$scope.firstWinners = function(items){
			$scope.step = 3;
		};

		//Tells the code to show step 4	
		$scope.secondWinners = function(items){
			$scope.step = 4;
		};

		//Tells the code to show step 5		
		$scope.thirdWinners = function(items){
			$scope.step = 5;
		};
	}]);

//controller for the global navigation header
bracketsControllers.controller('NavController', function ($scope, $location) {
    $scope.isCollapsed = true;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
    });
    
    $scope.getClass = function (path) {
    if(path === '/') {
        if($location.path() === '/') {
            return "active";
        } else {
            return "";
        }
    }
 
    if ($location.path().substr(0, path.length) === path) {
        return "active";
    } else {
        return "";
    }
};
});	
