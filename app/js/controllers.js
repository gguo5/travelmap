'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', ['$scope','$http',
        function($scope, $http) {
            $http.get('data/countries_test.json').success(function(data) {
                $scope.countries = data;
            });
            $scope.orderProp = 'continentCode';           
            $scope.currentCountryCode = '';
            $scope.currentCountryName = '';
            $scope.changeCurrentCountry = function(code, name) {
                $scope.currentCountryCode= code; 
                $scope.currentCountryName = name;
            };
        }])


    .controller('MyCtrl2', ['$scope',function($scope) {
            
        $scope.tabs = [
        {
            title:"Dynamic Title 1", 
            content:"Dynamic content 1"
        },
{
            title:"Dynamic Title 2", 
            content:"Dynamic content 2", 
            disabled: true
        }
        ];

        $scope.alertMe = function() {
            setTimeout(function() {
                alert("You've selected the alert tab!");
            });
        };

        $scope.navType = 'pills';    
            
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.alerts = [
        {
            type: 'danger', 
            msg: 'Oh snap! Change a few things up and try submitting again.'
        },
        {
            type: 'success', 
            msg: 'Well done! You successfully read this important alert message.'
        }
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({
                msg: "Another alert!"
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
        
    }]);