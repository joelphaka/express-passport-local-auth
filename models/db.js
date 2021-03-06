// =========================
// Connects models to the database

const settings = require("../config/settings");

// Require Knex then pass it a configuration file that connects 
// it to the proper database based on the current environment.
//
// We then pass that instance of Knex to Bookshelf which allows
// us to create models and maintain a connection to the database
const knex = require('knex')(settings.database);

const bookshelf = require('bookshelf')(knex);

// Now we enable the "registry" plugin. This will help us later
// on in our models when we need to avoid circular dependency
// errors. If you don't know what that error is or want to learn
// more check out my previous post about structuring Bookshelf 
// models which covers circular dependency errors and how to 
// avoid them using this plugin which comes with Bookshelf @ 
// http://billpatrianakos.me/blog/2015/11/30/how-to-structure-bookshelf-dot-js-models/
bookshelf.plugin('registry');

bookshelf.plugin('pagination');

// Here we export the database connection. The first time it 
// gets required by a model it will create a database connection 
// pool and keep it open and available for all other models
module.exports = bookshelf;

exports.knex = knex;
