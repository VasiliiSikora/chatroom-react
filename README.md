# chatroom-react
React App Using Socket.io and typescript deployed to Heroku

Required Installations:
- NodeJS
- MongoDB
- MongoDB Atlas (for deploying to Heroku)

Recommended Installations/Accounts:
- MonogDB Compass for Personal Machine
- MongoDB Atlas for web deployment

To start project:
- Clone repository
- Code for both client/server folders:
``` npm install ```
- Code to start client (in ./client):
``` yarn start ```
- Code to start server (in ./):
``` npm start ```

To Deploy to Heroku:
- Set up MongoDB Atlas: https://www.mongodb.com/developer/products/atlas/use-atlas-on-heroku/
- in terminal: 
``` heroku login ```
``` cd <app root directory> ```
``` heroku create ```
``` git push heroku main ```
- In heroku (website) add your MONGODB_URI config variable

## Libraries and Technologies Used:
Languages:
- Typescript
- Javascript

Technologies and Libraries:
- NodeJS
- ReactJS
- Socket.io
- JSON Web Token (JWT)
- universal-cookie
- styled-components
- cors
- bcrypt
- axios
- nodemon
- MongoDB (mongoose)
- ExpressJS

## Future Additions:
- Chatroom addition using MongoDB to store chatrooms
- Permanent storage of messages for each room through MongoDB
- Chat UI improvements: '... is typing', emojis, picture uploads etc.

