// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//source: https://www.youtube.com/watch?v=j6p-OV3MveA
app.get('/api/timestamp/:time', function(req,res){
    
    function unixToNatural(unix){
        
        var date = new Date(unix*1000);
        var months = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
        
        var theMonth = months[date.getMonth()];
        var theDay = date.getDate();
        var theYear = date.getFullYear();
        
        var result = theMonth + ' ' + theDay + ', ' + theYear;
        return result;
    }
    
    
    
    if(!isNaN(req.params.time)){
        
        var result = unixToNatural(req.params.time);
        var data = { unix: req.params.time, natural: result};
        res.json(data);
    }
    
    else{
        
        var natural = new Date(req.params.time);
        
        if(!isNaN(natural)){
            
            var unix = natural/1000;
            var data = { unix: unix, natural: req.params.time}
            res.json(data);
        }
        
            else{
                res.json({ unix:null, natual:null });
            }
        }
    
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});