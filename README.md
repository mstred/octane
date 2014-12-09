octane
======

A Q&A web app made with [node](https://nodejs.org) and [geddy](http://geddyjs.org).
This is such an experiment, considering an evaluation of geddy as a full-fledged MVC framework.

### Build instructions

1. With node installed in your machine, get geddy framework through npm
``` bash
	$ npm install -g geddy
```

2. Clone octane repository
``` bash
	$ git clone https://github.com/mstred/octane.git
```

3. From the project directory, fetch all dependencies
``` bash
	$ cd octane && npm install --save
```

4. Create a secrets.json file at config directory and paste the code below, putting a custom random string for the secret field
``` bash
	$ touch config/secrets.json
```
``` json
	{
	  "passport": {
	    "successRedirect": "/",
	    "failureRedirect": "/login"
	  },
	  "secret": "<put your secret string right here>"
	}
```

4. Run the project
``` bash
	$ geddy
```