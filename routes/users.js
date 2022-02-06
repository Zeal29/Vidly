const { User, userValidation } = require( '../models/user' );
const _ = require( 'lodash' )
const bcrypt = require( "bcrypt" )
const express = require( 'express' );
const router = express.Router();

router.get( '/', async ( req, res ) =>
{
	const users = await User.find().sort( 'name' )
	res.send( users )
} )

router.post( '/', async ( req, res ) =>
{
	const { error } = userValidation( req.body )
	if ( error ) res.status( 400 ).send( error.details[ 0 ].message )

	let user = await User.findOne( { email: req.body.email } )
	if ( user ) res.status( 400 ).send( "user already registered" )



	user = new User( _.pick( req.body, [ 'name', 'email', 'password' ] ) )

	const salt = await bcrypt.genSalt( 10 )
	user.password = await bcrypt.hash( req.body.password, salt )

	try
	{
		user = await user.save();
		res.send( _.pick( user, [ 'name', 'email' ] ) )
	} catch ( error )
	{
		res.status( 500 ).send( 'internal problem.' )
	}
} )

module.exports = router;

