# API Soscial Network
here is a social network api, my goal was to create the facebook api with a pdf of the functional needs of the new API

### Requirements
* node v12.13.0
* npm
* git
* mongodb (please configure config.js for link mongodb with your localhost)

### Install
```npm install```

### Build
```npm start```

# Users
### [ POST ] Create user
* HTTP request : POST → /user/create

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

### [ GET ] Show user
* HTTP request : GET →/user/show/:id

#### Parameters :
```javascript
{
	'id': String, // Required
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

### [ GET ] Search user
* HTTP request : GET →/user/search/

#### Parameters :
```javascript
{
	'limit': Number, // Required
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
### [ DELETE ] Delete user
* HTTP request : DELETE →/user/delete/:id

#### Parameters :
```javascript
{
	'id': String, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete user'
}
```
### [ POST ] Update user
* HTTP request : POST → /user/update/:id

#### Parameters :
```javascript
{
	'first_name': String, // Optional
	'last_name': String, // Optional
	'email': String, // Optional
	'password': String, // Optional
	'age': Number, // Optional
	'city': String, // Optional
	'city_code': String, // Optional
	'street_number': String, // Optional
	'street_type': String, // Optional
	'street_name': String, // Optional
	'phone': String // Optional
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

# Event
### [ POST ] Create Event
* HTTP request : POST → /event/create/

#### Parameters :
```javascript
{
	'name': String, // Required
	'description': String, // Required
	'date_end': String, // Required
	'location': String, // Required
	'image': String, // Optional
	'administrators_ids': Array, // Required
	'moderators_ids': Array, // Optional
	'members_ids': Array, // Optional
	'groupe_ids': String, // Optional
	'conversation_id': String, // Optional
	'album_id': String // Optional
	'shopping': Boolean // Optional
	'status': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	date_start: Date,
	date_end: Date,
	location: String, 
	image: Number,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	groupe_ids: String,
	conversation_id: String,
	album_id: String,
	shopping: Boolean,
	status: String
}
```