'use strict';

/* Directives */
angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
  
    .directive('chart', function() {
        return {
            restrict: 'A',
            link: function($scope, $elm, $attr) {
                // Create the data table
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Country');
                data.addColumn('number', 'Value'); 
                data.addColumn({
                    type:'string', 
                    role:'tooltip'
                });
       
                // Set chart options
                var options = {};
                options['backgroundColor']= '#96CBD7';//78cabf
                var colorAxis = {
                    minValue: 0, 
                    maxValue: 5,  
                    colors: ['#438094','#FF9933','#0066FF','#438094','#438094']
                };                 
                       
                options['colorAxis']= colorAxis;
                options['datalessRegionColor']= 'silver';
                options['height']= 600;
                options['width']= 800;               
                options['legend']= 'none';//hide the colorAxis set to 'none'
                var tooltip = {
                    textStyle: {
                        color: '#008080'
                    }, 
                    showColorCode: false
                };
                options['tooltip']= tooltip;
                         
                // Instantiate and draw our chart, passing in some options
                var chart = new google.visualization.GeoChart($elm[0]);
              
                chart.draw(data, options);
                
           
                
                $scope.$watchCollection('[currentCountryCode, currentCountryName]', function(newCountry) {        
                    //console.log("newcode: "+newCountry);
                    addCountry(newCountry);
                   
                });
              
                
                function addCountry(country) {
                    data.addRows([[{
                        v:country[0],
                        f:country[1]
                    },0,'Traveled']]);    
                    chart.draw(data, options);            
                }
 
                
                
                
            }
        }
    })
    
    
 
    
    
    .directive('myCurrentTime', function($interval, dateFilter) {
 
        function link(scope, element, attrs) {
            var format, timeoutId;
 
            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }
 
            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });
 
            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });
 
            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }
 
        return {
            link: link
        };
    });


