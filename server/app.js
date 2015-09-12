var
	express = require('express'),
	cors = require('cors'),
	path = require('path'),
	bodyParser = require('body-parser'),
	app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json())
app.use(cors());

var PORT = 1337;

var data = [
	{ name: 'Capriciosa', components: ['2_4', '1_7', '3_1'] },
	{ name: 'Pepperoni', components: ['2_2', '2_3'] }
];

// /list
app.get('/list', function(req, res) {
	res.send(data);
});

app.post('/list', function(req, res) {
	console.log(req.body);
	data.push(req.body);
	res.send(data);
});

// /edit
app.post('/edit', function(req, res) {
	data[req.body.index] = req.body.data;

	res.send(data);
});

// /delete
app.post('/delete', function(req, res) {
	data.splice(req.body.index, 1);

	res.send(data);
});



app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});




app.listen(PORT, function() {

  console.log('Express server running at http://localhost:' + PORT);
});