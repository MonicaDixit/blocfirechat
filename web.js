var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(express.logger('dev'));
var dir = process.cwd() + '/dist';
app.use(gzippo.staticGzip(dir));
app.listen(process.env.PORT || 5000);
