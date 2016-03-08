angular.module('studentcollab')
    .filter('tel', function() {
        return function(tel) {
            if (!tel) {
                return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 3:
                    return "(" + value + ")";
                case 4:
                case 5:
                    return "(" + value.slice(0, 3) + ") " + value.slice(3, 6) 
                case 6:
                case 7:
                case 8:
                case 9:
                    return "(" + value.slice(0, 3) + ") " + value.slice(3, 6) + "-" + value.slice(6);
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });
