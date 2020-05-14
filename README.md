# API Soscial Network
here is a social network api, my goal was to redo the facebook api with a pdf of the functional needs of the new API

### Requirements
* node 10
* npm
* git
* mongodb (please configure config.js for link mongodb with your localhost)

### Install
```npm install```

### Build
```npm start```

# API Users
## Overview
creation of a user CRUDS, which allows us to manipulate our user data
* create
* reade
* update
* update
* search

### [ POST ] Create user
Allows the creation of a single user.

* HTTP request : POST → user/create

#### Parameters :
```javascript
{
	'first_name': String, // Required
	'last_name': String, // Required
	'email': String, // Required
	'password': String, // Required
	'age': Number, // Required
	'city': String, // Required
	'city_code': String, // Required
	'street_number': String, // Required
	'street_type': String, // Required
	'street_name': String, // Required
	'phone': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	first_name: String,
	last_name: String,
	email: String,
	password: String, 
	age: Number,
	city: String,
	city_code: String,
	street_number: String,
	street_type: String,
	street_name: String,
	phone: String,
	image_profil: String
}
```
