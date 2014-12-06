/**
 * Created by papua on 2014/12/06.
 */
angular.module('App', ['LocationBar'])
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
        }, true);


        var originalTitle;
        $scope.editing = null;

        $scope.editTodo = function(todo) {
            originalTitle = todo.title;
            $scope.editing = todo;
        };

        $scope.doneEdit = function (todoForm) {
            if (todoForm.$invalid) {
                $scope.editing.title = originalTitle;
            }
            $scope.editing = originalTitle = null;
        };

    }])
    .directive('mySelect', [function () {
        return function (scope, $el, attrs) {
            // scope - 現在の $scope オブジェクト
            // $el   - jqLite オブジェクト(jQuery ライクオブジェクト)
            //         jQuery 使用時なら jQuery オブジェクト
            // attrs - DOM 属性のハッシュ(属性名は正規化されている)

            scope.$watch(attrs.mySelect, function (val) {
                if (val) {
                    console.log("set true" + $el[0]);
                    $el[0].select();
                }
            });
        };
    }]);

