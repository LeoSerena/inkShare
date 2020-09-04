# EXPRESS NOTES

## modules

### create module

In a file, to export objects from a module, write in the module file:

```
exports.myFunc = function(){
	return ...	
}
```

### import module

To import something from a module, first *require* it:

```
var myModule = require('./myModule');
```

Then import the specific object:

```
myModule.myFunc()
```

### remove unused packages

To remove packages not present in the **package.json** file, write

```
npm prune
```



## server

### create server

To create a HTTP server using express, run:

```
var express = require('express')
var server = app.listen(8081, function(){
 var port = server.address().port;
 console.log('app listening at port ' + port)
})
```

### (req, res) parsing

To return a specific html element:

```
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('Hello World!');
```

----

To get specific attribute from query (can be several):

```
var elem = req.elem
```

For example, if we want the url that is being accessed:

```
var elem = req.url

console.log(elem)
```

When accessing with http://localhost:8080/summer, will return -- /summer --

----

To split a URL, we use built-in methods:

```
var url = require('url')
var q = url.parse(req.url, true).query;
var txt = q.year + " " + q.month;
console.log(txt)
```

Then, when accessing http://localhost:8080/?year=2017&month=July, we get -- 2017 July --

## URL module

Import with

```
var url = require('url');
```

----

url.parse example:

```
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
```

Will return

​	localhost:8080
​	/default
​	?year=2017&month=february
​	february

----

# Express notes

## NPM (Node Package Manager)

### Manage packages

There are two ways of installing packages with npm:

###### Globally

```
npm install -g <package-name>
```

###### Locally

```
npm install <package-name>
```

----

To initialize a *package.json* file, run

```
npm init
```

To install a package and write it in the *package.json*, run:

```
npm install --save <package-name>
```

This is useful because next time we want to install all the dependencies, we only will need to run

```
npm install
```

with the *package.json* and it will be done automatically.

---

## Express methods

### app.get(route, callback)

This function does the callback *calback* when the route *route* is requested. Example:

```
app.get('/', function(req, res){
   res.send("Hello world!");
});
```

As we see here, the callback function has 2 parameters: (req, res).

###### req

It contains the HTTP request and has properties for the request string, parameters, body, HTTP headers, etc.

###### res

It contains the HTTP response sent back when receiving a HTTP request

----

### app.listen(port, [host], [backlog], [callback]])

This function binds and listens for connections on the specified host and port. Port is the only required parameter here.

###### port

Number of the port to be accessed

###### host

Name of the domain, necessary when app on the cloud

###### backlog

maximum pending queued connections (def: 511)

###### callback

Asynchronous function called when server starts listening

---

### app.method

Note: The method *all* takes any type of HTTP verbs listed below:

```
GET
```

The `GET` method requests a representation of the specified resource. Requests using `GET` should only retrieve data.

```
HEAD
```

The `HEAD` method asks for a response identical to that of a `GET` request, but without the response body.

```
POST
```

The `POST` method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.

```
PUT
```

The `PUT` method replaces all current representations of the target resource with the request payload.

```
DELETE
```

The `DELETE` method deletes the specified resource.

```
CONNECT
```

The `CONNECT` method establishes a tunnel to the server identified by the target resource.

```
OPTIONS
```

The `OPTIONS` method is used to describe the communication options for the target resource.

```
TRACE
```

The `TRACE` method performs a message loop-back test along the path to the target resource.

```
PATCH
```

The `PATCH` method is used to apply partial modifications to a resource.

----

### Express.router

To make another file containing the routes of the application instead of having everything in the same file, we import the router object in another file:

```
var express = require('express');
var router = express.Router();
```

Then, we can create a route on the router:

```
var path = require('path')
//gets the index page
router.get('/index', function(req, res){
  res.sendFile(path.join(__dirname,'..', 'html', 'index.html'))
})
```

Here *__dirname* is the path of the directory where the file is. So the path here is *dirpath/../html/index.html*.

Then we export the router from the file:

```
module.exports = router;
```

And import it in the main application (before the *app.listen*):

```
app.use('/routes', routes)
```

Now, when accessing *localhost:3000/routes/* we get the html we defined in the routes.js file

---

### Dynamic routes

We want routes that allow us to pass **parameters** and process based on them.

example:

```
var express = require('express');
var app = express();

app.get('/things/:name/:id', function(req, res) {
   console.log(req.params.id)
   console.log(req.params.name)
});
app.listen(3000);
```

When accessing *http://localhost:3000/myName/123* we get -- 123 -- & -- myName --

##### Pattern matched routes

It is possible to use **regex** to parse string. Example:

```
app.get('/:id([0-9]{5})', function(req, res){
	...
});
```

This will **GET** only if the id is a 5 digit string.

---

### REGEX

Usual regular expressions

| expression              |           regex           |   example    |
| :---------------------- | :-----------------------: | :----------: |
| line selection          |         /^ ... $/         |              |
| allowed in the string   |     /^[a-z 0-9 _ -]$/     | fu13ub41_--  |
| length of string        |        /^{3, 5}$/         |     3423     |
| specific element        |           /^#$/           |      #       |
| choice between elements | /^#([a-z]{3}\|[0-9]{3})$/ | #374 or #grt |
| at least once           |          /^#+$/           | #, ## not _  |
| at most once            |          /^#?$/           | _, #, not ## |
| any number              |          /^#*$/           | _,#,##, ...  |

---

## Middlewares

#### Usage

Middlewares are functions that are executed when a request is received. They have the form:

```
var middleware = function(req, res, next){
	...
	next();
}
```

The application can use it like a routing:

```
app.use('/routes', middleware)
```

Note that in the following code, the middleware will be executed **before** the router:

```
app.use('/router', middleware)
app.use('/router', router)
```

middlewares can thus be executed **before** and **after** a routing execution

---

### 3rd party middlewares

#### body-parser

This parses the request body that have payloads attached to them.

Install with:

```
npm install --save body-parser
```

Then in a file:

```
var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())
```

#### cookie-parser

It parses *Cookie* header and populate req.cookies with an object keyed by cookie names.

Install with:

```
npm install --save cookie-parser
```

Then in a file:

```
var cookieParser = require('cookie-parser');
app.use(cookieParser())
```

#### express-session

It creates a session middleware with the given options

---

## Templating

Templating are used to remove the cluttering for our server code with HTML, **concatenating string to existing HTML templates**. Features: **filters includes inheritance interpolation**

### Pug

Install with:

```
npm install --save pug
```

To use it, write:

```
app.set('view engine', 'pug')
app.set('views', './views')
```

And then create a *views* folder

Pug creates HTML files in a simple way. Example:

```
doctype html
html
   head
      title = "Hello Pug"
   body
      p.greetings#people Hello World!
```

gets converted into

```
<!DOCTYPE html>
<html>
   <head>
      <title>Hello Pug</title>
   </head>
   
   <body>
      <p class = "greetings" id = "people">Hello World!</p>
   </body>
</html>
```

#### Pug features

###### Attributes definition

```
div.container.column.main#division(width = "100", height = "100")
```

corresponds to:

```
<div class = "container column main" id = "division" width = "100" height = "100"></div>
```

###### Dynamic rendering

Suppose we want to change a specific thing in the page **dynamic.pug** when rendering it, here the **url** and the **name**:

```
html
   head
      title #{name}
   body
      a(href = myURL) URL
```

We can write directly in the router:

```
router.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});
```

###### Conditionals

If we want some elements to change according to some others, we add conditions to our template.

Here, for example, we want the user name if the user already connected and the login button if it didn't:

```
html
   head
      title Simple template
   body
      if(user)
         h1 Hi, #{user.name}
      else
         a(href = "/sign_up") Sign Up
```

And in the rendering:

```
res.render('/dynamic',{
   user: {name: "Ayush", age: "20"}
});
```

###### Include and components

We can use the **include** feature to make a ressourse more general to every template. For example, suppose we have in a header.pug file:

```
div.header.
	I'm the header for this website.
```

Then, in another template we can write:

```
html
   head
      title Simple template
   body
      include ./header.pug
```

And this will automatically load the header in the template

Note that include can also be user to include **css**, **plaintext** or **javascript**

---

## Forms

Forms are used to submit or fetch data. We use body-parser(for parsing Json) and multer(for parsing multipart/form data):

```
npm install --save body-parser multer
```

Then, to use the parsers, we write:

```
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
...
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
```

When filling a form in a file form.pug:

```
   ...
   body
      form(action = "/test", method = "POST")
         div
            label(for = "say") Say:
            input(name = "say" value = "Hi")
         br
         div
            label(for = "to") To:
            input(name = "to" value = "Express forms")
         br
         button(type = "submit") Send my greetings
     ...
```

We can retrieve the form with the following:

```
app.post('/test', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
```

The req.body will contain -- { say: 'Hi', to: 'Express forms' } --.

Note that to be applied, the app.use of the bodyparser must be **before** the app.user of the routes in the file.

---

## Mongoose

To use mongoose, first insall it:

```
npm install --save mongoose
```

Then use it as:

```
var mongoose = require('mongoose')
```

---

### Connect to the database

First, create a cluster on the mongoDB website, add your ip address to the whitelist of the cluster as well as a user. Then find the connection string corresponding to your user with password. Should look like this;

```
mongodb+srv://<user>:<password>@cluster0-1mcyu.mongodb.net/test?retryWrites=true&w=majority
```

Where **<user>** and **<password>** should be replaced accordingly.

To connect, simply write:

```
var mongoose = require('mongoose');

mongoose.connect(
    str,
    { useNewUrlParser : true,
     useUnifiedTopology: true },
    ()=> console.log('connected to db')
)
```

Where str is the above connection string. This should output -- conected to db --.

---

### Create DB models

Suppose we want to create a user model for our database. We write in a **User.js** file:

```
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        min: 6,
        max : 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)
```

Note that we firstly define what the attributes of the users are gonna be as well as the constraints these attributes will have to fulfill.

Now, when we run the connection code, we establish a permanent connection with the DB. To now push a user, we first connect, then create a user:

```
var User = require('../models/User.js')
const user = new User({
    name : 'Bernard Minet',
    email : 'bernard.minet@yahoo.fr',
    password : 'clubDo'
})
```

And then simply save is in the database:

```
var postUser = async function(){
    try{
        const savedUser = await user.save()
        console.log(savedUser)
    }catch(err){
        console.log(err)
    }
}
postUser()
```

The asynchronous function is required since the push of the data on the server is asynchronous and could take a various amount of time. (quick note: never store passwords in plaintext).

---

### Save an object to the DB

To save a user to the DB for example, we simply run:

```
        var user = new User({
            'name' : body.name,
            'email' : body.email,
            'password' : body.password
        })
        try{
            var savedUser = await user.save()
            res.send(savedUser)
        }catch(err){
            res.status(400).send(err)
        }
```

### Verify existing object in DB

To verify that a value already has been stored or not in the database, we use the findOne function of mongoDB. For example, to verify if an email already exists, run:

```
const emailExists = await User.findOne({email : req.body.email})
```

This will look up in the user object in the database and tell if the email exists.

To look up several attributes at a time, for example email and username, run:

```
const user = await User.findOne({
	//can either give username or email
	$or: [
		{ email : req.body.credentials},
		{ username : req.body.credentials}
	]
})
```

This will return a user that has either the email or the username given.

---

## Cookies

To use cookies, first install cookie-parser:

```
npm install --save cookie-parser
```

Then, import and use it:

```
var cookieParser = rrequire('cookie-parser')
app.use(cookieParser())
```

---

#### Create a cookie

Now, suppose we want to send a cookie named express to our user. We write:

```
app.get('/cookie', function(req, res){
	res.cookie('name', 'express', {maxAge : 15000}).send('cookie set')
})
```

Here we see we can send a cookie (here it will last 15000 miliseconds or 15 seconds) as well as as webpage to the client. To verify it works, when on the cookie page of the server open the web console (ctrl + shift + i on chrome) and type:

```
console.log(document.cookie)
```

It should return -- name=express -- and your page should contain -- cookie set --.

---

#### Retrieve a cookie

To retrieve the cookies, simply get the cookies attribute of req:

```
app.get('/cookieget', function(req, res){
    console.log('cookie : ', req.cookies)
})
```

This will output -- cookie :  { name: 'express' } --.

---

#### Delete a cookie

To clear a cookie, use the clearCookie function:

```
app.get('/clearCookie', function(){
	res.clearCookie('express')
})
```

---

## Session management

to install it, write:

```
npm install --save express-session
```

As the cookie-parser, we use it like this:

```
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));
```

Now suppose we want to keep track of how many times a user visited the **/session** route. We write:

```
app.get('/session', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
```

Note that we also need the cookie-parser for this to work since it saves the sessions through the use of a cookie.

---

## Data validation with @hapi/joi

To validate an object before storing in the DB, first install @hapi/joi:

```
npm install --save @hapi/joi
```

Then, based on the previously defined user model, we will create a validation schema for a registering user:

```
const Joi = require('@hapi/joi')

//User validation
const userSchema = Joi.object({
    user : Joi.string()
        .min(5)
        .max(255)
        .alphanum()
        .required(),
    email : Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
    passwordConfirm : Joi.ref('password')
})
```

It also is possible to let two different possibilities for an attribute. For example, suppose we want a user to log in with either its username or email, then we write:

```
const loginSchema = Joi.object({
    credentials : [
        //username
        Joi.string()
            .min(5)
            .max(255)
            .alphanum()
            .required(),
        //or email
        Joi.string()
            .required()
            .email()
    ],
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
})
```

Then to use is, we simply give the Json body to the validate function of the userSchema:

```
test_routes.post('/submit', async function(req, res){
	const { error } = await userSchema.validate(req.body)
	...
}
```

If there is an error with the form, we can end it back to the user like this:

```
res.status(400).send(error.details[0].message)
```

and otherwise, save the user.

---

## Bcryptjs

Bcryptjs is a module for hashing password and avoid storing them in plaintext.

To take a password and salt and hash it, run:

```
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt)
```

Where the request body contains the password.

Then, when a user wants to log in, compare what is stored with the hashing and salting of the logging in password. The method **compare** will come in handy:

```
const isValid = await bcrypt.compare(req.body.password, user.password)
```

isValid will be a boolean saying if the password was valid.

---

## Jason Web Token

A JWT is used to give the user a proof that it has connected previously. It encrypts specific data on the user with a secret and share it to the identified user. To use it, install:

```
npm install --save jasonwebtoken
```

Then, when redering a page after authentication of the user, we send a header containing the JWT (here it is sent as a cookie) :

```
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.cookie('auth-token', token, {maxAge : 1000000}).render('loginSuccessful')
```

When the user will access a resource, it will then be verified. This can be implemented as a middleware:

```
var authenticate = function(req, res, next){
    const cookies = req.cookies;
    token = cookies['auth-token']
    if(!token) return res.status(400).send('access denied without identification')
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = verified
    }catch(err){
        res.status(400).send('The given token is invalid')
    }
    next()
}
```

As it can be seen, the existence of the token is first verified and then the  correctness, and we can recover all the attributes in the token (here the id).

---

## Error handling

Error handling is a special case of middleware, it is one with four arguments

```
function(err, req, res, next){}
```

This permits to separate the error handling to the route management.

By writing next(err) in a route handler, where err is a defined error, we make the function jump to the middleware responsible for the error handling:

```
app.get('/', function(req, res){
   var err = new Error("Something went wrong");
   next(err);
});

app.use(function(err, req, res, next) {
   res.status(500);
   res.send("Oops, something went wrong.")
});
```

## 