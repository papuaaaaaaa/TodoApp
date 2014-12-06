/**
 * Created by papua on 2014/12/06.
 */
angular.module('App', [])
    .controller('MainController', ['$scope', '$filter', function($scope, $filter) {

        $scope.todos = [];
        $scope.newTitle = '';

        $scope.addTodo = function() {
            console.log('call addTodo');
            $scope.todos.push({
                title: $scope.newTitle,
                done: false
            });
            //双方向
            $scope.newTitle = '';
        };

        $scope.filter = {
            done: {done: true},
            remaining: {done: false}
        };

        $scope.currentFilter = null;

        $scope.changeFilter = function (filter) {
            $scope.currentFilter = filter;
        };

        var where = $filter('filter');
        $scope.$watch('todos', function(todos) {
            var length = todos.length;

            $scope.allCount = length;
            $scope.doneCount = where(todos, $scope.filter.done).length;
            $scope.remainingCount = length - $scope.doneCount;
        }, true)


        var originalTitle;
        $scope.editing = null;

        $scope.editTodo = function(todo) {
            originalTitle = todo.title;
            $scope.editing = todo;
        }

    }]);

