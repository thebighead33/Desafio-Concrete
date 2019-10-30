const express = require('express');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/', require('./src/routes'));

app.use(express.urlencoded({
	extends: true
}));

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
	console.log('Start!!!, Port: ' + app.get('port'));
});