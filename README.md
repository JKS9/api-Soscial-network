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
	'album_id': String, // Optional
	'shopping': Boolean, // Optional
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
	conversation_id: String,
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
	conversation_id: String,
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
	conversation_id: String,
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
	conversation_id: String,
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
	conversation_id: String,
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
	conversation_id: String,
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
	conversation_id: String,
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
	'image_fond': String // Optional
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
	conversation_id: String,
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
# Conversation
### [ POST ] Create Conversation
* HTTP request : POST → /conversation/create/

#### Parameters :
```javascript
{
	'status': String, // Required
	'id': String, // Required
	'idsend': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_groupe: String,
	id_event: String,
	date_start: Date
}
```

### [ POST ] Add Message
* HTTP request : POST → /conversation/messagerie/

#### Parameters :
```javascript
{
	'status': String, // Required
	'id': String, // Required
	'idsend': String, // Required
	'message': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_conversation: String,
	id_user: String,
	message: String,
	date_send: Date
}
```

### [ POST ] Add Commentaire
* HTTP request : POST → /conversation/commentaire/:idmessage

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'commentaire': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_message: String,
	id_sende: String,
	commentaire: String,
	date_send: Date
}
```

### [ GET ] Show Conversation
* HTTP request : GET → /conversation/:id/:idsend

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
	id_conversation: String,
	id_user: String,
	message: String,
	date_send: Date
},
{
	_id: Object_ID,
	id_conversation: String,
	id_user: String,
	message: String,
	date_send: Date
},
{
	_id: Object_ID,
	id_conversation: String,
	id_user: String,
	message: String,
	date_send: Date
}
```

### [ GET ] Show Commentaire
* HTTP request : GET → /conversation/commentaire/:idmessage/:idsend

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
	id_conversation: String,
	id_user: String,
	message: String,
	date_send: Date,
	commentaire: {
		{
		_id: Object_ID,
		id_message: String,
		id_sende: String,
		commentaire: String,
		date_send: Date
		},
		{
		_id: Object_ID,
		id_message: String,
		id_sende: String,
		commentaire: String,
		date_send: Date
		}
	}
},
```

### [ DELETE ] Delete Message
* HTTP request : DELETE → /conversation/message/:idmessage/:idsend

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
	message: 'Delete Message'
}
```

### [ DELETE ] Delete Commentaire
* HTTP request : DELETE → /conversation/commentaire/:idcommentaire/:idsend

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
	message: 'Delete Commentaire'
}
```

# Album
### [ POST ] Add Picture In Album
* HTTP request : POST → /album/addpicture/:idevent

#### Parameters :
```javascript
{
	'id_user': String, // Required
	'name_file': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_album: String,
	id_user: String,
	name_file: String,
	date_start: Date
}
```

### [ GET ] Show Album
* HTTP request : GET → /album/:idevent/:idsend

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
	id_album: String,
	id_user: String,
	name_file: String,
	date_start: Date
},
{
	_id: Object_ID,
	id_album: String,
	id_user: String,
	name_file: String,
	date_start: Date
}
```

### [ GET ] Show One Picture
* HTTP request : GET → /album/photo/:idphoto/:idsend

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
	id_album: String,
	id_user: String,
	name_file: String,
	date_start: Date
}
```

### [ POST ] Add Commentaire In Picture
* HTTP request : POST → /album/commentaire/:idphoto/

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'commentaire': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_message: String,
	id_sende: String,
	commentaire: String,
	date_send: Date
}
```

### [ DELETE ] Delete Commentaire
* HTTP request : DELETE → /album/commentaire/:idcommentaire/:idsend

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
	message: 'Delete Commentaire'
}
```

### [ DELETE ] Delete Commentaire
* HTTP request : DELETE → /album/photo/:idphoto/:idsend

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
	message: 'Delete Picture'
}
```

# Sondage
### [ POST ] Create Sondage
* HTTP request : POST → /sondage/create/:idevent

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'question': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
}
```

### [ POST ] Create Sondage Reponse
* HTTP request : POST → /sondage/create/reponse/:idsondage

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'reponse': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_sondage: String,
	reponse: String,
	date_start: Date
}
```

### [ POST ] Add Reponse User In Sondage
* HTTP request : POST → /sondage/reponse/user/:idsondage

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'id_reponse': String, // Required
	'id_user': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_sondage: String,
	reponse: String,
	date_start: Date
}
```
### [ DELETE ] Delete Sondage
* HTTP request : DELETE → /sondage/delete/:idsondage/:idsend

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
	message: 'Delete Sondage'
}
```

### [ DELETE ] Delete Sondage Reponse
* HTTP request : DELETE → /sondage/delete/reponse/:idreponse/:idsend

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
	message: 'Delete Sondage'
}
```

### [ DELETE ] Delete Sondage Reponse User
* HTTP request : DELETE → /sondage/delete/reponseUser/:idreponseUser/:idsend

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
	message: 'Delete Reponse User In Sondage'
}
```

## [ GET ] Show Sondage
* HTTP request : GET → /sondage/:idevent/:idsend

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
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
},
{
	_id: Object_ID,
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
},
{
	_id: Object_ID,
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
}
```

## [ GET ] Show One Sondage
* HTTP request : GET → /sondage/one/:idsondage/:idsend

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
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
}
```

### [ PUT ] Update Sondage
* HTTP request : PUT → /sondage/update/:idsondage/:idsend

#### Parameters :
```javascript
{
	'question': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
}
```

### [ PUT ] Update Sondage Reponse
* HTTP request : PUT → /sondage/update/reponse/:idreponse/:idsend

#### Parameters :
```javascript
{
	'reponse': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	question: String,
	id_user_creator: String,
	date_start: Date
}
```

# Ticket
### [ POST ] Create Ticket
* HTTP request : POST → /billet/create/:idevent

#### Parameters :
```javascript
{
	'id_user_creator': String, // Required
	'name': String, // Required
	'price': String, // Required 
	'nb_quantity': String, // Required
	'date_create': String // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_user_creator: String,
	name: String,
	price: String,
	nb_quantity: Number,
	date_create: Date
}
```

### [ POST ] Create Ticket buy
* HTTP request : POST → /billet/buy/:idbillet

#### Parameters :
```javascript
{
	'idsend': String, // Required
	'quantity': String, // Required
	'city': String, // Required 
	'city_code': String, // Required
	'street_number': String, // Required
	'street_type': String, // Required
	'street_name': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	quantity: String,
	prix_Unitaire: String,
	prix_total: Number,
	id_user_buy: String,
	city: String,
	street_number: String,
	street_name: String,
	street_type: String,
}
```

### [ DELETE ] Delete Ticket
* HTTP request : DELETE → /billet/delete/:idbillet/:idsend

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
	message: 'Delete Ticket'
}
```

### [ PUT ] Update Ticket
* HTTP request : PUT → /billet/update/:idbillet/:idsend

#### Parameters :
```javascript
{
	'name': String, // Required
	'price': String, // Required
	'nb_quantity': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_user_creator: String,
	name: String,
	price: String,
	nb_quantity: Number,
	date_create: Date
}
```

### [ GET ] Show Ticket
* HTTP request : GET → /billet/:idevent/:idsend

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
	id_user_creator: String,
	name: String,
	price: String,
	nb_quantity: Number,
	date_create: Date
},
{
	_id: Object_ID,
	id_user_creator: String,
	name: String,
	price: String,
	nb_quantity: Number
	date_create: Date
}
```

### [ GET ] Show Ticket Buy
* HTTP request : GET → /billet/buy/:idevent/:idsend

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
	id_event: String,
	quantity: String,
	prix_Unitaire: String,
	prix_total: Number,
	id_user_buy: String,
	city: String,
	street_number: String,
	street_name: String,
	street_type: String,
},
{
	_id: Object_ID,
	id_event: String,
	quantity: String,
	prix_Unitaire: String,
	prix_total: Number,
	id_user_buy: String,
	city: String,
	street_number: String,
	street_name: String,
	street_type: String,
}
```

# Shopping
### [ POST ] Create Shopping
* HTTP request : POST → /shopping/create/:idevent

#### Parameters :
```javascript
{
	'name': String, // Required
	'quantity': String, // Required 
	'id_user': String, // Required
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	name: String,
	quantity: String,
	id_user: Number
}
```


### [ DELETE ] Delete Shopping Item
* HTTP request : DELETE → /shopping/delete/:item/:idsend

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
	message: 'Delete Shopping Item'
}
```

### [ PUT ] Update Shopping Item
* HTTP request : GET → /shopping/update/:item/:idsend

#### Parameters :
```javascript
{
	'name': String, // Optional
	'quantity': Number, // Optional
}
```

#### Response :
```javascript
{
	_id: Object_ID,
	id_event: String,
	name: String,
	quantity: String,
	id_user: Number
}
```

### [ GET ] Show Shopping Item
* HTTP request : GET → /shopping/:idevent

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
	id_event: String,
	name: String,
	quantity: String,
	id_user: Number
},
{
	_id: Object_ID,
	id_event: String,
	name: String,
	quantity: String,
	id_user: Number
}
```