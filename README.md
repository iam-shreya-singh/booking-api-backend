# booking-api-backend

The signup API allows users to sign up with a valid email and password. An optional username can also be used. The signup API returns a proper, encoded JWT for the new user. The login API allows users to login with the username and password that they used when signing up. The login API also returns a JWT token, which is needed for the protected areas of the API.

**Implemented below and tested:**
1. Working user signup API 
2. Working user login API 
3. Proper JWT tokens generation 
4. Tested API's with Postman 

**JWt-Auth end-to-end :**
* /api/user/signup - registers a new user
* /api/user/login - returns accessToken and refreshToken
* /api/user/me - validates the token and gives back user info

pages/api :  route entry points
src/modules, src/lib : logic

