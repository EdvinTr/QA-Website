# QA-Website
Final project for my Dynamic Web course. We received the project instructions a day before christmas so this was something that had to be worked on during the christmas break.
My previous knowledge of Vue was very limited as we only had 1 assignment using it (we used a cdn link for that assignment).

### The project core features in miniature that had to be implemented
The core assignment was to create a Fullstack website with SQL as database together with node/express for server and Vue JS for front end. There had to be 3 different types of account, consumers, contributors and admin.

The **consumer** would consume information and ask questions, but could not reply to other questions submitted by other consumers. The consumer can also edit/delete their questions, which in turn deleted all answers associated with that question.

The **contributor** accounts are then able to answer to questions but not create their own. They can also edit/delete their answers

The **admin** has full privilege, meaning they are able to alter answers and questions and also block users or delete contributor accounts.

Feel free to use this project for whatever you may like, just note that a lot of the things I have implemented have been very rushed as the deadline was so short. In other words, it's a bit of a mess. I might go back and refactor in the future.

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

### Individual question (not logged in)
![](https://i.gyazo.com/bdbce0d7ada96eca3aa6272eaec2b15f.png)

### Front page (logged in as consumer)
![](https://i.gyazo.com/be275882e62d0b68299e254aa363cfec.png)

### Edit question (logged in as consumer)
![](https://i.gyazo.com/e1e5c8953fd48c54e38dee65a392d39b.png)

### Create question (logged in as consumer)
![](https://i.gyazo.com/3ed560f75fdfbf4539af37dbd8f54209.png)

### Manage users (logged in as admin)
![](https://i.gyazo.com/9ed634dbf25ac9c635c22f951a258833.png)
