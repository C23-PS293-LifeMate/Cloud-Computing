<h1 align="center">
  <img src="https://i.imgur.com/gtSZ6Q8.png" width="200"/><br/>
  LifeMate
  
</h1>

</h1>
<!-- 
<p align="center">Cemil is a restaurant recommendation app which can provide restaurant recommendations<br/>
to users by learning about their history and preferences.
<br/><br/>With LifeMate, users can save time and effort when checking their health.</p> -->


<br/>

# Background
<!-- > Choice overload is an adverse effect of too many available choices on our decision-making ability.
> 
> We have limited cognitive resources, so having more options to consider drains our mental energy more quickly.
> 
> Less is not always a bad idea. Cutting down the menu could increase the revenue. -->

LifeMate is your ultimate health prediction app, powered by advanced machine learning technology. We understand that maintaining a healthy lifestyle can be challenging amidst busy schedules and limited access to reliable information. That's why we created LifeMate – to simplify your journey towards better health.

With LifeMate, you can effortlessly track your health metrics and receive personalized predictions. Our app currently predicts BMI and stress levels, helping you understand your body mass index and manage stress effectively. But we don't stop there – we're continuously expanding our predictive capabilities to cover a range of diseases and conditions.


# Features
Using the api could be done by making a request to external ip of the compute engine in use and port, the list of routes that can be used is:
- /register, this route could be used to register a new user to the database
- /login, this route could be used to do a log in to an user account that has been registered and get the login token
- /protected, this route is for authentication
- /getUserById/:userId, this route could be used to get user data in database by their user ID
- /insertRecord, this route could be used to insert new record for user
- /deleteRecord/:recordId, this route could be used to delete a record by their record ID
- /getRecordById/:userId, this route could be used to get a record by their user ID
- /changePassword, this route could be used to change an account password
- /updateUser, this route could be used to update user data


For more details, you can access the postman documentation [here](https://documenter.getpostman.com/view/27565502/2s93m354qh) .

## Usage
To run the code on your computer by cloning the GitHub repository, follow these steps:
1. Clone our github repository
```bash
git clone https://github.com/C23-PS293-LifeMate/Cloud-Computing.git
```
2. Open terminal on your IDE and run
```bash
npm install
```
3. Don't forget to make .env file and edit it to
```bash
host=127.0.0.1
port=5432
database=lifemate
user=postgres
password=123
```
4. You can connect the port and database with running the index.js file using
```bash
node index.js
```

5. (optional) You can easily test our API routes with using postman with the help of our [documentation](https://documenter.getpostman.com/view/27565502/2s93m354qh)

# Some Tools and Libraries Used
- Google Cloud Compute Engine
- Postman
- JWT Authentication
- PostgreSQL
- Node.js
- TensorFlow.js

# Contact Us
Bangkit 2023 Batch 1 Product Capstone Team: **C23-PS293**
<br/>
Cloud-Computing Path:
- [Made Adhika Wiwardhana (CC) C017DSX0755](https://github.com/MadeAdhika39)
- [Joshevan (CC) C181DSX1990](https://github.com/Joshevanch)

<h1 align="center">
  Thank You!
</h1>
