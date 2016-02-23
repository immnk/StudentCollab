angular.module('studentcollab')

.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            // What to show on the view
            ctrl.$formatters.unshift(function (modelValue) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            // what to keep on the controller
            ctrl.$parsers.push(function (viewValue) {
            	console.log("controller value: "+viewValue);
                var plainNumber = viewValue.replace(/[^\d]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);