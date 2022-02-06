const jwt = require( "jsonwebtoken" )
const { User } = require( '../models/user' );
const _ = require( 'lodash' )
const bcrypt = require( "bcrypt" )
const express = require( 'express' );
const router = express.Router();
const Joi = require( 'joi' );
const jsonwebtoken = require( "jsonwebtoken" );


router.post( '/', async ( req, res ) =>
{
	const { error } = validation( req.body )
	if ( error ) res.status( 400 ).send( error.details[ 0 ].message )

	let user = await User.findOne( { email: req.body.email } )
	if ( !user ) res.status( 400 ).send( "invalid user or password" )

	const password = await bcrypt.compare( req.body.password, user.password )
	if ( !password ) res.status( 400 ).send( "invalid user or password" )

	const token = jwt.sign( { _id: user._id }, 'jwtPrivatekey' )
	res.send( token )
} )

function validation ()
{
	const schema = {
		email: Joi.string().required(),
		password: Joi.string().required().min( 5 ).max( 50 )
	}

	return Joi.validate( schema )
}

module.exports = router;

