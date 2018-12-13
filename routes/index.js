var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', {root: 'public'});
});

router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");
    
    var fs = require('fs');
    var express = require('express');
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        var jsonresult = [];
        console.log("Here is the search query we received");
        console.log(myRe);
        for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if(result != -1) {
                console.log(cities[i]);
                jsonresult.push({city:cities[i]});
            }
        }
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });
});

router.get('/definition',function(req,res,next) {
    
});

module.exports = router;
