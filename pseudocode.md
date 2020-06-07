# Pseudocode

## SignUp

- Destructure `req.body` to get the required fields i.e. "name", "email", "password"
- Validate the fields
- Check if user exists from the provided `email`
  - if user exist, display a json message saying "User already exists"
- if user doesn't exist, generate a salt and `hash` the password from the generated salt.
- Insert the user fields into the database
- Generate a `jwt` token
- Send the token back to the user.



## SignIn/LogIn

- Destructure `req.body` to get the required fields i.e. "email", "password"
- Validate the fields
- Query the user from the provided `email` field.
  - if there is no user, return "Invalid Email" with a status code of `400`
- Check if the incoming password is the same as the password (hashed password) in the database.
  - If the password is invalid, display a "400" status code with a message, "Invalid Password"
- Generate the `jwt`
- Send the token back to the user.


## Authenticate/verifyToken

- Check if the header is set.
  - If it is not set, return a "401" and a message "unauthorized, header not set"
- Get the token from the header using the __Bearer__ schema.

  ```    
      Authorization: Bearer <token>    
  ```
- If there's no token, return a "401" and a message "Unauthorized. please provide a token"
- Verify the token with the secret
   - if valid, attach the verified token to the `req.user`
   - pass the middleware to the `next` processing pipeline
   - if not valid, return a "400" status code with a message, "Invalid token"