# WouldYouRatherSlack


### Future stuff 

- [ ] Add workspace percentages
- [ ] Use SQL instead of Firestore
- [ ] Create your own set of questions
- [ ] More than two answers


# How to use this?

I used to firestore database, so you will need to set up a new firebase project and a service account.
Questions are added manually, and they have to start from id 0 and should be incremented
A question has an array of two asnwers, each of them have a map with fields text(string) and count(number)

I used Bolt version 2.0.0 because 2.2.0 is giving some missing dist files errors 

After that run: 
- npm install 
- node app.js