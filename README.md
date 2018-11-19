# Back End Repository for Lambda Notes

This repository will have the backend code for the Lambda Notes project including models and endpoints for the Note and User schema, as well as authentication logic.

## Technologies used
- Node
- Express
- mLabs
- Passport

## API Documentation

### Note Routes

GET `notes` - Retrieve all notes in the database

GET `notes/:id` - Retrieve a specific note using by ID

POST `notes` - Create a new note

PUT `notes/:id` - Edit an existing note by ID

DELETE `notes/:id` - Delete a note by ID

### User Routes

GET `users` - Retrieve all users in the database

GET `users/:id` - Retrieve a specific user by ID

POST `users/register` - Registers a new user

POST `users/login` - Logs in a user and generates a token

PUT `users/:id` - Edit a user's information by ID

DELETE `users/:id` - Delete a user's information by ID



