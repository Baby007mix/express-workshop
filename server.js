var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');

app.use(express.static('public'));
app.use(formidable());
	
app.post("/create-post", function(req, res){
	console.log('/create-post');

	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
//	console.log(file);
		var parsedFile = JSON.parse(file);
		var blogText= req.fields.blogpost;
	//console.log(parsedFile);
		parsedFile[Date.now()] = blogText;
	//console.log(req.fields.blogpost);
	//console.log(parsedFile);
	//console.log(file.toString());
	var returnedBlogText = JSON.stringify(parsedFile);
		fs.writeFile(__dirname + '/data/posts.json', returnedBlogText, function (error){
		//do something!
		});
	});	
	//console.log(req.body);
	//console.log(req.fields);
});


app.get("/get-posts", function(req, res){
		console.log('/get-posts');
		
		fs.readFile(__dirname + '/data/posts.json', function(error, file){
			var parsedFile = JSON.parse(file);
			res.send(parsedFile);
		});

	});
// app.get("/chocolate", function(req, res){
// 	res.send('mmm Love Chcolate!');
// });

// app.get("/node", function(req, res){
// 	res.send('Code like it\'s 1999!');
// });

// app.get("/girls", function(req, res){
// 	res.send('Seriously better than boys');
// })

app.listen(3000, function(){
	console.log('Server is listening on port 3000. Ready to accept request!');
});
