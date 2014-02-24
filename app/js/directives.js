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
            
            
                $scope.delCountry = function(index,name){
                    console.log("delcountry: "+index+" "+name);
                     
                    $scope.beenTo.splice(index, 1);     
                    
                    
                    var code = '';
           
                    angular.forEach($scope.countries, function(country){   
                        for(var i = 0; i < $scope.countries.length; i++){
                            if(country.name==name) {
                                console.log(country.name+" "+country['alpha-2']);
                                code = country['alpha-2'];
                                break;
                            }
                        }
                    });
                    if(code.length!=0){
                        var foundRows = data.getFilteredRows([{
                            column: 0, 
                            value: code
                        }]);
                    }
                    if(foundRows.length!=0){    
                    for (var i = 0, maxrows = foundRows.length; i < maxrows; i++) {
                     console.log("del found row: should always be 1:  "+foundRows.length+"row deled: "+foundRows[i]);
                        data.removeRow(foundRows[i]);
                        chart.draw(data,options);
                    }               
                    }
                };  
 
 
                $scope.updateMap = function(code,name) {                 
                    var foundExisiting = data.getFilteredRows([{
                        column: 0, 
                        value: code
                    }]);
                 console.log("update foundExisiting.length: "+foundExisiting.length);
                    
                    if(foundExisiting.length==0){
                        var r = Math.round(Math.random()*1000);
                        data.addRows([[{
                            v:code,
                            f:name
                        },r,'Traveled']]);    
                        chart.draw(data, options);   
                    
                     console.log("row added: "+code+" "+ name);
                    
                    }
                 
                    var flag=0;
                    angular.forEach($scope.beenTo, function(item){   
                        for(var i = 0; i < $scope.beenTo.length; i++){
                            if(item.search(name) >= 0) {
                                flag++;
                            }
                        }
                    });
                    if(flag==0){         
                        $scope.beenTo.push(name);
                    }
                
                 
                };
              
            }
        }
    })
    
    
 
    .directive('focusin', function factory() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div>A:{{control}}</div>',
            scope: {
                control: '='
            },
            link      : function (scope, element, attrs) {
                scope.control.takenTablets = 0;
                scope.control.takeTablet = function() {
                    scope.control.takenTablets += 1;  
                }
            }
        };
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


