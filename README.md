# Real Time Chat
> In this app I am working to create a real time chatroom utilizing web sockets.

I am still working on updating this readme, there are more currently completed features than what have been listed here.

## Features

### Authentication
[X] Users should be able to create accounts and login with their created accounts
[X] User Login data should be stored in a database
[X] Passwords should be hashed with salt 
(This feature was Implemented utilizing bcrypt: https://www.npmjs.com/package/bcrypt)
[X] The app should utilize local storage to authenticate users 
(This feature was Implemented utilizing Json Web Tokens : https://www.npmjs.com/package/jsonwebtoken)
[X] New users signing up should be prevented from and alerted when trying to sign up  with an already existing username or when password confirmation is failed

### Server
[X] Users should be able to have a real time connection with the server where they are instantly updated when a new user joins the lobby and new messages are sent.




