# ADVNTR

## PROJECT DESCRIPTION AND FEATURES
ADVNTR is a matchmaking app for aspiring players and dungeon masters of Dungeons and Dragons and other tabletop role playing games. This platform allows DMs to post campaigns, and for players to connect with DMs and other players, and find campaigns that match their interests, availability, and location.

### CORE FEATURES
- User account creation and authentication
- Searchable role-based user directory with filters for location and scheduling availability
- Campaign advertisements by dungeon masters

## TECH STACK
### FRONT END
- React/JavaScript
- HTML/CSS
### BACK END
- Node
- Express
- SQLite database
### COMMUNICATION
- RESTful APIs using HTTP requests

## SETUP AND RUN INSTRUCTIONS FOR FRONTEND AND BACKEND
### PREREQUISITES
1. Have node installed (this can be done at 
https://nodejs.org/).
2. Have npm installed (comes with node).

### INSTRUCTIONS
1. Clone the repository.
2. Open two command prompts. In the first one, navigate to your project root and run `npm install`.
3. After npm finishes setting up, in the same command prompt, run `npm run server`.
4. In the second command prompt, run `npm run dev`.
5. In that same  command prompt, click the link that says `http://localhost:5173/`. This should cause your browser to open a tab that displays and runs the project.

## API ENDPOINTS
1. Test endpoint: `/test`
This exists to test general endpoint functionality. 

Response:
`{
  "message": "Test endpoint works!"
}`

2. Login endpoint: `/login`
Receives username and password to validate login credentials.

Request:`{username: 'Tom', password: 'password'}`

Response (success): `{success: true, message: 'Login successful', user: {id: 14, username: 'Tom', role: 'DM', location: 'Seattle, WA', schedule: 'Friday evenings'}}`

Response (failure): `{"success":false,"error":"Invalid credentials"}`

3. Account creation endpoint: `/create-account`
Receives data for new account creation (username, password, role, location, and schedule).
Validates username against existing usernames and password against secure password requirements.

Request: `POST /create account Request body: {username: 'example', password: 'password', role: 'Player', location: 'Seattle, WA', schedule: 'Saturday evenings'}`

Response (success): `{success: true, message: 'Account created successfully', userId: 16, username: 'example', role: 'Player'}`

Response (failure): `{success: false, error: 'Username already exists', username: 'Tom'}`

4. Users endpoint: `/user`
Returns data from the users database in response to searches. Enables filtering by location and schedule,
as well as separate filtering for username for each role.

Request: `GET /users?role=player&location=Seattle&schedule=Weekends`

**Query Parameters**

* role - 'player' or 'dm'
* location - user location
* schedule - user availability
* username - partial username search

Response (success): `{success:true, count: 2, users:[{"id":1,"username":"psyminsays","role":"Player","location":"Seattle, Washington","schedule":"Weekends","created_at":"2025-12-15 04:51:17"},{"id":14,"username":"Tom","role":"DM","location":"Seattle, WA","schedule":"Friday evenings","created_at":"2025-12-15 08:50:01"}], timestamp:"2025-12-17T07:05:31.216Z"}`

Response (failure): `{ success: false, error: "message" }`

5. Campaigns endpoint: `/campaigns`
Still in development, this will return data regarding campaign postings and is intended
to enable searching and filtering similar to the users endpoint.

6. Debug users endpoint: `/api/debug/users`
For testing and debugging purposes, this endpoint allows all users to be viewed. To be removed for production.

Request: `GET /api/debug/users`

Response: `{{success:true, count: 2, users:[{"id":1,"username":"psyminsays","role":"Player","location":"Seattle, Washington","schedule":"Weekends","created_at":"2025-12-15 04:51:17"},{"id":14,"username":"Tom","role":"DM","location":"Seattle, WA","schedule":"Friday evenings","created_at":"2025-12-15 08:50:01"}], timestamp: 2025-12-17T07:32:29.338Z"}}`

7. Database debug endpoint: `/api/debug/db-info`
For testing and debugging purposes, this endpoint returns all databases and their associated table names.
To be removed for production.

Request: `GET /api/debug/db-info`

Response: `{success:true, tables:["users","sqlite_sequence"], database:"users.db", serverTime:"2025-12-17T07:36:26.040Z"}`

## DEMO
[Demo Video](ADVNTR_Demo.mp4)
(video is too large for github's player)

