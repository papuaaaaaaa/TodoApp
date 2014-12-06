/**
 * Created by papua on 2014/12/06.
 */
angular.module('App', ['LocationBar'])
    .service('todos', ['$rootScope', '$filter', function ($scope, $filter) {
        var list = [];

        $scope.$watch(function () {
            //$scopeのプロパティ以外の者を$watchするときは、第一引数にfunction
            return list;
        }, function (value) {
            $scope.$broadcast('change:list', value);
        }, true);

        var where = $filter('filter');

        var done = {done: true};
        var remaining = {done: false};

        //serviceに定義するときはレシーバはthis
        this.filter = {
            done: done,
            remaining: remaining
        };

        this.getDone = function () {
            return where(list, done);
        };

        this.add = function (title) {
            list.push({
                title: title,
                done: false
            });
        };

        this.remove = function (currentTodo) {
            list = where(list, function (todo) {
                return currentTodo !== todo;
            });
        };

        this.removeDone = function () {
            list = where(list, remaining);
        };

        this.changeState = function (state) {
            angular.forEach(list, function (data) {
                data.done = state;
            });
        };
    }])
    .controller('RegisterController', ['$scope', 'todos', function($scope, todos) {
        $scope.newTitle = '';

        $scope.addTodo = function() {
            todos.add($scope.newTitle);
            $scope.newTitle = '';
        };
    }])
    .controller('ToolbarController', ['$scope', 'todos', function($scope, todos) {
        //htmlのディレクティブでつかうのはserviceでなくてあくまで$scopeのプロパティ
        $scope.filter = todos.filter;

        $scope.$on('change:list', function (evt, list) {
            var length = list.length;
            var doneCount = todos.getDone().length;

            $scope.allCount = length;
            $scope.doneCount = doneCount;
            $scope.remainingCount = length - doneCount;
        });

        $scope.checkAll = function () {
            //!!はbooleanへの型変換
            todos.changeState(!!$scope.remainingCount);
        };

        $scope.removeDoneTodo = function () {
            todos.removeDone();
        };

        $scope.changeFilter = function (filter) {
            $scope.$emit('change:filter', filter);
        };
    }])
    .controller('TodoListController', ['$scope', 'todos', function($scope, todos) {
        $scope.$on('change:list', function (evt, list) {
            //viewとバインドできるのはserviceのlistではなくて、あくまでも$scopeのtodoList
            $scope.todoList = list;
        });

        var originalTitle;

        $scope.editing = null;

        $scope.editTodo = function (todo) {
            originalTitle = todo.title;
            $scope.editing = todo;
        };

        $scope.doneEdit = function (todoForm) {
            if (todoForm.$invalid) {
                $scope.editing.title = originalTitle;
            }
            $scope.editing = originalTitle = null;
        };

        $scope.removeTodo = function (todo) {
            todos.remove(todo);
        };
    }])
    .controller('MainController', ['$scope', function($scope) {
        $scope.currentFilter = null;

        $scope.$on('change:filter', function (evt, filter) {
            console.log($scope.currentFilter);
            $scope.currentFilter = filter;
        });
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

