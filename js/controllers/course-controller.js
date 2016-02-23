app.components
    .controller('CourseCtrl', ['$scope', '$stateParams', 'TrainingService',
        function($scope, $stateParams, TrainingService) {
            init();
            function init() {
                console.log('course initializing...');
                var courseId = $stateParams.courseId;
                $scope.search = {};
                $scope.search.phone = "7418271862";
                // console.log(courseId);
                TrainingService.getCourseById(courseId).then(function(response) {
                    //console.log(response);
                    if (response.isSuccess) {
                        $scope.course = response.course;
                    }
                });
                TrainingService.getRegisteredStudents().then(function(response){
                    // console.log(response);
                    $scope.students = response;
                });
            }
        }
    ]);
