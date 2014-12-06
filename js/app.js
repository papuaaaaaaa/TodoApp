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

        // 全て完了/未了
        $scope.checkAll = function () {
            console.log('all');
            var state = !!$scope.remainingCount; // 未了にするのか完了にするのかの判定

            angular.forEach($scope.todos, function (todo) {
                todo.done = state;
            });
        };

        // 完了した ToDo を全て削除
        $scope.removeDoneTodo = function () {
            $scope.todos = where($scope.todos, $scope.filter.remaining);
        };

        // 任意の ToDo を削除
        $scope.removeTodo = function (currentTodo) {
            $scope.todos = where($scope.todos, function (todo) {
                return currentTodo !== todo;
            });
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

