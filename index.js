const mongoose = require( 'mongoose' )
const genres = require( './routes/genres' );
const customers = require( './routes/customers' );
const movies = require( './routes/movies' );
const rentals = require( './routes/rentals' );
const users = require( './routes/users' );
const auth = require( './routes/auth' );
const express = require( 'express' );
const app = express();

mongoose.connect( 'mongodb://localhost/vidly' )
  .then( () => console.log( 'Connected to MongoDB...' ) )
  .catch( err => console.error( 'Could not connect to MongoDB...' ) );

app.use( express.json() );
app.use( '/api/genres', genres );
app.use( '/api/customers', customers );
app.use( '/api/movies', movies );
app.use( '/api/rentals', rentals );
app.use( '/api/users', users );
app.use( '/api/auth', auth );

app.listen( 3000, () =>
{
  console.log( "Server started on port 3000" )
} )