# QA-Website
Final project for my Dynamic Web course. We received the project instructions a day before christmas so this was something that had to be worked on during the christmas break.
My previous knowledge of Vue was very limited as we only had 1 assignment using it (we used a cdn link for that assignment).

### The project core features in miniature that had to be implemented
The core assignment was to create a Fullstack website with SQL as database together with node/express for server and Vue JS for front end. There had to be 3 different types of accounts: consumers, contributors and admin.

The **consumer** can consume information and ask questions, but cannot reply to other questions submitted by other consumers. The consumer can also edit/delete their questions, which in turn deletes all answers associated with that question.

The **contributor** accounts are able to answer to questions but not create their own. They can also edit/delete their answers.

The **admin** has full privilege, meaning they are able to alter answers and questions as well as block users or delete contributor accounts.

Feel free to use this project for whatever you may like, just note that a lot of the things that I have implemented have been very rushed as the deadline was so short. In other words, it's a bit of a mess. I might go back and refactor things in the future.

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

# Images of the project

### Front page (not logged in)
![](https://i.gyazo.com/42a7a30a0582df2fe917750ae39651e3.png)

### Search bar
When a user searches for something it makes a GET request to the backend and will try to match WHERE the category or title of any question is LIKE the query.
The search bar is using a timeout function which gets triggered each time the user types, so after half a second or so of no more typing the GET request is executed.
![](https://i.gyazo.com/e083865c9d9ee00e63d9baf3453afd3a.png)

### Individual question (not logged in)
![](https://i.gyazo.com/6f502d888507913b559f2fdba3ba43c4.png)

### Individual question (logged in as contributor)
![](https://i.gyazo.com/f0b0cbb7aa31bb9d6c08282531cc883a.png)

### Front page (logged in as consumer)
![](https://i.gyazo.com/be275882e62d0b68299e254aa363cfec.png)

### Edit question (logged in as consumer)
![](https://i.gyazo.com/e1e5c8953fd48c54e38dee65a392d39b.png)

### Create question (logged in as consumer)
![](https://i.gyazo.com/3ed560f75fdfbf4539af37dbd8f54209.png)

### Manage users (logged in as admin)
![](https://i.gyazo.com/9ed634dbf25ac9c635c22f951a258833.png)
