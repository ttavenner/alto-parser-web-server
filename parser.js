var xp = require('xml2js');

var host = "localhost";
var port = 3000;

var exp = require('express');
var bp = require('body-parser');

var app = exp();
app.set('views', './views');
app.set('view engine', 'jade');
app.use(bp.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/parse', function(req, res) {
    getUrl(req.body.url, function(xml) {
        if (xml == null) {
            res.render('index', {txt: "Could not get URL"});
        } else {
            parsedText = "";
            parseXML(xml, function(text) {
                parsedText += text;
            });
            res.render('index', {
                url: req.body.url,
                txt: parsedText});
        }
    });
});

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});

var getUrl = function(url, callback) {
    var request = require('request');
    request(url, function(err, res, body) {
        if (err == null && res.statusCode == 200) {
            callback(body);
        } else {
            console.dir(err);
            console.dir(res.statusCode);
            callback(null);
        }
    })
};


var parseXML = function(xml, callback) {
    var parser = new xp.Parser();
    parser.parseString(xml, function(err, result) {
        if (err) {
            console.log(err.message);
            return;
        }
        var page = result.alto.Layout[0].Page[0].PrintSpace;
        parsePage(page, function(text) {
            callback(text);
        });
    })
};


var parsePage = function(obj, callback) {
    Object.getOwnPropertyNames(obj).forEach(function(val) {
        if(val == "String") {
            for(var i = 0; i < obj[val].length; i++) {
                callback(obj[val][i]['$'].CONTENT);
                if (i < obj[val].length-1) {
                    callback(' ');
                } else {
                    callback("<br />\r\n");
                }
            }
        }
        else if(typeof(obj[val]) == "object" && val != "$") {
            parsePage(obj[val], function(res) {
                callback(res);
            });
        }
    });
};

/*
var printHelp = function() {
    var path = process.argv[1].split('/');
    var script = path[path.length-1];
    console.log('Usage:');
    console.log(process.argv[0] + ' ' + script + " -c [input file].xml [output file].txt to run from the console");
    console.log(process.argv[0] + ' ' + script + " -s to run in web server mode");
};


if (process.argv.length < 2) {printHelp();}

switch(process.argv[2]) {
    case '-c':
        if (process.argv[4].length < 4)
        {
            printHelp();
            break;
        }
        parseFile(process.argv[3], process.argv[4]);
        break;
    case '-s':
        startServer();
        break;
    default:
        printHelp();
        break;
}*/