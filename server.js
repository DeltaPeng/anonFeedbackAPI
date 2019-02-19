/*
anonymousFeedbackAPI
19/02/18 TSN - create backend API /server for anonymous feedback app
*/ 
 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
   
const cors = require('cors') 
 
 //connect to a db instead of hardcoding data.  Using knex.js (npm install knex) and then
 //  running an install based on the db you are using i.e. (npm install pg) for postgresql
 const knex = require('knex');
 
 //run a function to initialize everything
 //127.0.0.1 is localhost
 const postgresDB = knex({
   client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});
  
app.use(bodyParser.urlencoded({extended:false}));  //add to setup middleware to parse urlencoded, aka postman's form data 
app.use(bodyParser.json());  //add to setup middleware to parse json, else it'll send empty object

app.use(cors());
 
app.get('/', (req, res) => { 
	res.send('it\'s alive....IT\'S ALIIIIIVE!!!');  
})
	
//moved the logic out to it's own file.  File needed access to postgresDB and bcrypt, so passing those in as well
const fbData = require('./controllers/feedback');
app.post('/feedback', (req,res) => { 
	fbData.feedbackSubmit(req, res, postgresDB) 
})
	 

 //run the port we get from heroku, else run 3000
app.listen(process.env.PORT || 3000, ()=> { console.log(`a function to run right after app.listen, app is running on port ${process.env.PORT}`)});
 
