angular.module('studentcollab')

.factory('TrainingService', ['$q', '$http', '$httpParamSerializer',
    function($q, $http, $httpParamSerializer) {

        var factory = {};
        var courses = [];
        var categories = [];
        var categories_url = "http://localhost:3300/getAllCategories";
        var course_url = "http://localhost:3300/getAllCourses";

        var temp_course_url = "http://www.json-generator.com/api/json/get/cmAeqglynC";
        var temp_categories_url = "http://www.json-generator.com/api/json/get/cvxiApEZea";

        init();

        function init() {
            console.log('Training service is being initialized...');
        }

        factory.getAllCourses = function() {
            var deferred = $q.defer();

            if (courses.length == 0) {
                $http.get(temp_course_url)
                    .then(function(response) {
                        if (response.status == 200) {
                            var db_items = response.data;
                            angular.forEach(db_items, function(course) {
                                courses.push({
                                    id: course.pnum,
                                    category: course.category,
                                    rating: course.rating,
                                    description: course.description,
                                    title: course.title,
                                    url: course.url,
                                    image: course.image,
                                    type: course.type,
                                    price: course.price
                                });
                            });

                            // console.log("Fetched all items : " + JSON.stringify(courses));

                            deferred.resolve(courses);
                        } else {
                            var err = {
                                success: false,
                                message: 'Some backend problem'
                            }
                            deferred.reject(err);
                        }
                    }, function(error) {
                        var err = {
                            success: false,
                            message: 'Some backend problem' + error
                        }
                        console.log('Couldnt fetch all inventory items from database...');
                        deferred.reject(err);
                    });
            } else {
                console.log(courses);
                deferred.resolve(courses);
            }
            return deferred.promise;
        }

        factory.getAllCategories = function() {
            var deferred = $q.defer();

            if (categories.length == 0) {
                $http.get(temp_categories_url)
                    .then(function(response) {
                        if (response.status == 200) {
                            categories = [];
                            angular.forEach(response.data, function(category) {
                                categories.push(category.category);
                            })
                            deferred.resolve(categories);
                        } else {
                            var err = {
                                success: false,
                                message: 'Some backend problem' + error
                            };
                            deferred.reject(err);
                        }
                    }, function(error) {
                        var err = {
                            success: false,
                            message: 'Some backend problem' + error
                        };

                        console.log('Couldnt fetch all inventory items from database...');
                        deferred.reject(err);
                    });
            } else {
                deferred.resolve(categories);
            }

            return deferred.promise;
        }

        factory.getCourseById = function(id) {
            var deferred = $q.defer();
            var response = {};

            if (courses.length > 0) {
                var isFound = false;
                angular.forEach(courses, function(course) {
                    if (course.id == id) {
                        isFound = true;
                        response.isSuccess = true;
                        response.course = course;
                        deferred.resolve(response);
                    }
                });
                if (!isFound) {
                    console.log('course not found');
                    response.isSuccess = false;
                    response.erroMsg = 'Course not found';
                    deferred.reject(response);
                }
            } else {
                factory.getAllCourses().then(function(courses) {
                    var isFound = false;
                    angular.forEach(courses, function(course) {
                        if (course.id == id) {
                            isFound = true;
                            response.isSuccess = true;
                            response.course = course;
                            deferred.resolve(response);
                        }
                    });
                    if (!isFound) {
                        console.log('course not found');
                        response.isSuccess = false;
                        response.erroMsg = 'Course not found';
                        deferred.reject(response);
                    }
                });
            }

            return deferred.promise;
        }

        factory.getRegisteredStudents = function() {
            var deferred = $q.defer();

            var students = [
                { name: "John", grade: "A", class: "Geography" },
                { name: "Alice", grade: "B", class: "History" },
                { name: "Alice", grade: "C", class: "Geography" },
                { name: "Brian", grade: "B", class: "English" },
                { name: "Brian", grade: "A", class: "History" },
                { name: "Alice", grade: "D", class: "English" },
                { name: "John", grade: "C", class: "English" },
                { name: "John", grade: "D", class: "History" },
                { name: "Brian", grade: "A", class: "Geography" }
            ];
            deferred.resolve(students);

            return deferred.promise;
        }

        return factory;
    }
]);
