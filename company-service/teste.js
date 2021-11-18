/* Teste com api de geolocalização através do IP */

var ipapi = require('ipapi.co');

var callback = function(loc){
    console.log(loc);
};

console.log(ipapi.location(callback));

navigator.geolocation.getCurrentPosition