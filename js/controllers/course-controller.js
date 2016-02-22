app.components
    .controller('CourseCtrl', ['$scope', '$stateParams', 'TrainingService',
        function($scope, $stateParams, TrainingService) {
            init();
            function init() {
                console.log('course initializing...');
                var courseId = $stateParams.courseId;
                console.log(courseId);
                TrainingService.getCourseById(courseId).then(function(response) {
                    console.log(response);
                    if (response.isSuccess) {
                        $scope.course = response.course;
                    }
                });
            }
        }
    ]);
