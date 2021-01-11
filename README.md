# QA-Website
Final project for my Dynamic Web course. We received the project instructions a day before christmas so this was something that had to be worked on during the christmas break.
My previous knowledge of Vue was very limited as we only had 1 assignment using it (we used a cdn link for that assignment).

The core assignment was to create a Fullstack website with SQL as database together with node/express for server and Vue JS for front end. There had to be 3 different types of account, consumers, contributors and admin.

The **consumer** would consume information and ask questions, but could not reply to other questions submitted by other consumers. The consumer can also edit/delete their questions, which in turn deleted all answers associated with that question.

The **contributor** accounts are then able to answer to questions but not create their own. They can also edit/delete their answers

The **admin** has full privilege, meaning they are able to alter answers and questions and also block users or delete contributor accounts.

Feel free to use this project for whatever you may like, just note that a lot of the things I have implemented have been very rushed as the deadline was so short. In other words, it's a bit of a mess. I might go back and refactor in the future.

Technologies used in this project:

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

