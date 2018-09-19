# Project Three

Project Three is an Exercise Prescription Website. Here providers can prescribe
tailored exercises for their clients, using videos and instructional guides.
Originally designed to be utilized by physical therapists, it can be also fill
the needs of personal trainers, yoga instructors, martial arts teachers, and
more!

# Wiki

This README covers installation and basic usage of the site. For further
information, please refer to
[backend-pt](https://github.com/AFresnedo/backend-pt/wiki).

## Installation

Create a local folder with this repo with cmd ($ signifies terminal cmd):

```
$ git clone git@github.com:AFresnedo/backend-pt.git
```

This back end requires [NodeJS](https://nodejs.org/en/download/)
to run. After installation, you may install prerquisite modules.

To install prerequisites, navigate to the top folder in the repo and type:

```
$ npm install
```

This app uses MongoDB for the database. Refer to
[MongoDB's installation instructions](https://docs.mongodb.com/manual/installation/),
if you do not have it already installed.

You will need to create a .env file, at the top level, with the following:

```
JWT_SECRET='set_your_secret_key_here_developer'
MONGODB_URI='your_mongodb_database_path_for_this_app_here_developer'
PORT=set_your_preferred_port_number_here_developer
```

> JWT_SECRET should be a strong and unique key of your choosing.
> <br />
> Please give the address of the database you wish to use by entering it as the
> value for MONGODB_URI. It does not need to already exist.
> <br />
> If you skip adding the "PORT" line it will use a default of 3000.

## Basic Usage

We recommend using [nodemon](https://github.com/remy/nodemon) to run
the server. Refer to nodemon's instructions, if you are going to use it.

If you do not wish to use nodemon, you can fire up the server using:

```
$ node index.js
```

### Testing

Tests are run using [Mocha](https://mochajs.org/) and are written using
[Chai](https://www.chaijs.com/) with the
[expect](https://www.chaijs.com/guide/styles/#expect) BDD style.

To run all the tests,

```
$ npm test
```

> Please refer to Mocha's documentation for selecting individual test suites.

## Credits

Developed by [Andres](#), [Jon](#), and [Justin](#).
