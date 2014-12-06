/**
 * Created by papua on 2014/12/06.
 */
angular.module('App', [])
    .controller('MainController', ['$scope', function($scope) {

        $scope.todos = [];

        $scope.addTodo = function() {
            console.log('call addTodo');
            $scope.todos.push({
                title: Math.random(),
                done: false
            });
        };

    }]);

