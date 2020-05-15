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
},
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

### [ POST ] Add Menbers Event
* HTTP request : POST → /event/addMembers/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'members_ids': Array, // Required
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

### [ POST ] Add Moderators Event
* HTTP request : POST → /event/addModo/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'moderators_ids': Array, // Required
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

### [ POST ] Add Administrateur Event
* HTTP request : POST → /event/addAdmin/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'administrators_ids': Array, // Required
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

### [ DELETE ] delete Menbers Event
* HTTP request : DELETE → /event/deleteMenbers/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'members_ids': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete menbers'
}
```

### [ DELETE ] delete Moderators Event
* HTTP request : DELETE → /event/deleteModerators/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'moderators_ids': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Moderators'
}
```
### [ DELETE ] delete Admin Event
* HTTP request : DELETE → /event/deleteAdmin/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'administrators_ids': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Admin'
}
```

### [ DELETE ] delete Event
* HTTP request : DELETE → /event/delete/:idevent/user/:iduser

#### Parameters :
```javascript
{
	null
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete event'
}
```

### [ GET ] Show Event
* HTTP request : GET → /event/show/

#### Parameters :
```javascript
{
	null
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
},
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

### [ PUT ] Update Event
* HTTP request : GET → /event/update/:id

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'name': String, // Optional
	'description': String, // Optional
	'date_end': String, // Optional
	'location': String, // Optional
	'image': String, // Optional
	'administrators_ids': Array, // Optional
	'moderators_ids': Array, // Optional
	'members_ids': Array, // Optional
	'groupe_ids': String, // Optional
	'conversation_id': String, // Optional
	'album_id': String // Optional
	'shopping': Boolean // Optional
	'status': String // Optional
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

# Groupe
### [ POST ] Create Groupe
* HTTP request : POST → /groupe/create/

#### Parameters :
```javascript
{
	'name': String, // Required
	'description': String, // Required
	'icone_group': String, // Optional
	'image_fond': String, // Optional
	'administrators_ids': Array, // Required
	'moderators_ids': Array, // Optional
	'members_ids': Array, // Optional
	'autorisation_members': String, // Required
	'conversation_id': String, // Optional
	'status': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ POST ] Create Event In Groupe
* HTTP request : POST → /groupe/create/event/:idgroupe

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
	'groupe_ids': String, // Required
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

### [ POST ] Add Menbers Groupe
* HTTP request : POST → /groupe/addMembers/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'members_ids': Array, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ POST ] Add Moderators Groupe
* HTTP request : POST → /groupe/addModo/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'moderators_ids': Array, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ POST ] Add Admin Groupe
* HTTP request : POST → /groupe/addAdmin/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'administrators_id': Array, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ DELETE ] delete Menbers Groupe
* HTTP request : DELETE → /groupe/deleteMenbers/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'administrators_id': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Menbers'
}
```

### [ DELETE ] delete Moderators Groupe
* HTTP request : DELETE → /groupe/deleteModerators/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'moderators_ids': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Moderators'
}
```
### [ DELETE ] delete Admin Groupe
* HTTP request : DELETE → /groupe/deleteAdmin/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'administrators_id': Array, // Required
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Admin'
}
```

### [ DELETE ] delete Groupe
* HTTP request : DELETE → /groupe/delete/:idgroup/user/:iduse

#### Parameters :
```javascript
{
	null
}
```

#### Response :
```javascript
{
	code: 201,
	message: 'Delete Groupe'
}
```

### [ GET ] Show Groupe public
* HTTP request : GET → /groupe/show/

#### Parameters :
```javascript
{
	null
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
},
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ GET ] Show Event in Groupe
* HTTP request : GET → /groupe/show/:idgroupe/event

#### Parameters :
```javascript
{
	null
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
},
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

### [ PUT ] Update Status Groupe
* HTTP request : PUT → /groupe/updateStatus/:idgroup

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'status': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ PUT ] Update Groupe
* HTTP request : PUT → /groupe/update/:id

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'name': String, // Optional
	'description': String, // Optional
	'icone_group': String, // Optional
	'image_fond': String, // Optional
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```

### [ PUT ] Update Permission Groupe
* HTTP request : PUT → /groupe/updatePermission/:id

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'autorisation_members': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	name: String,
	description: String,
	icone_group: String,
	image_fond: String,
	date_start: Date,
	administrators_ids: Array,
	moderators_ids: Array,
	members_ids: Array,
	autorisation_members: String,
	conversation_id: String
	status: String
}
```