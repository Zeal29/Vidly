const Joi = require( 'joi' );
const mongoose = require( 'mongoose' );


const User = mongoose.model( 'Users', new mongoose.Schema( {
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	}
} ) )


function userValidation ( user )
{
	const schema = {
		name: Joi.string().min( 3 ).max( 50 ).required(),
		email: Joi.string().required().email(),
		password: Joi.string().min( 5 ).max( 50 ).required(),
	}
	return Joi.validate( user, schema )
}

exports.User = User;
exports.userValidation = userValidation;