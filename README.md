# QA-Website
Final project for my Dynamic Web course. 
I had around 1½ months of experience with Vue JS at the time I finished this assigment.

## How to install
1. Open two terminal windows
2. CD into both folders (client and server)
3. Run "npm install" in both
4. In the server folder run "node app.js" or "nodemon app.js" if you have nodemon
5. In the client folder run "npm run serve"
6. You can now view the project in your browser at localhost:8080

### Technologies used in this project:

**Frontend:**
* Vue JS
* axios
* mdbvue
* vue-multiselect
* vuex-persistedstate

**Backend:**
* node
* express
* bcrypt
* body-parser
* cors
* sqlite3
* sequelize
* morgan
* joi
* jsonwebtoken
* lodash

# Images of the project

### Front page (not logged in)
![](https://i.gyazo.com/c7105b0f8d50b9d5b851e57b4409d177.png)

### Search bar
When a user searches for something it makes a GET request to the backend and will try to match WHERE the category or title of any question is LIKE the query.
The search bar is using a timeout function which gets triggered each time the user types, so after half a second or so of no more typing the GET request is executed.
![](https://i.gyazo.com/b36ebb674cdd4f1a813663e53c9dedff.png)

### Individual question (not logged in)
![](https://i.gyazo.com/1ce188d462286a501d19582da0668914.png)

### Individual question (logged in as contributor)
![](https://i.gyazo.com/8b3bad8bc234b647457c157e0e0c9ee9.png)

### Front page (logged in as consumer)
![](https://i.gyazo.com/4778f372ce28ef74331687a36a3d84e0.png)

### Edit question (logged in as consumer)
![](https://i.gyazo.com/70e06293c66d51f7800a33bb131bd37e.png)

### Create question (logged in as consumer)
![](https://i.gyazo.com/38ea405fae89b37f84dfc34ffd9b0f46.png)

### User profile (logged in as consumer)
![](https://i.gyazo.com/9e6cc75efd1fb4231bb6015c7d2f2bc8.png)

### Inbox
![](https://i.gyazo.com/8495b387ad168d66e3ee7ba3d3d8b5ce.png)

### Manage users (logged in as admin)
![](https://i.gyazo.com/5e63aacdec90c5cbd616d43489e52695.png)

### Edit user (logged in as admin)
![](https://i.gyazo.com/6b0a34d1f2cd4de7e74617adc954e9a5.png)
