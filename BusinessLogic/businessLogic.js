//********* JSON DATA **********

// This will load all the data from the given JSON movie data files
let questions = require('./movie-data-short.json');
let questions = require('./movie-data.json');
// This will load all the data of the exsisting users
let users = require('./users.json'); 


//********* Next IDs ********** 

// These could also be stored in a settings file. After incorporating a database, it will handle the ID assignment process for you.

//Initialize the next user ID. (starting at 1000001)
let nextUserID = 1000001; 
for (userid in users) {
    if (Number(users[userid].id) >= nextUserID) {
        nextUserID = Number(users[userid].id) + 1;
    }
}
console.log('Next userid: ' + nextUserID);


//Initialize the next movie ID. (starting at 1000001)
// This will be used when new unique movies will be added to the database 
// And when addition new unique movies will be added by the contributing users
let nextMovieID = 1000001; 
for (movieid in movies) {
    if (Number(movies[movieid].id) >=nextMovieID) {
        nextMovieID = Number(movies[movieid].id) + 1;
    }
}
console.log('Next movieid: ' + nextMovieID);


//Initialize the next actor ID. (starting at 1000001)
// This will be used when new unique actors will be added to the database 
// And when addition new unique actors will be added by the contributing users
let nextActorID = 1000001; 
for (actorid in actors) {
    if (Number(actors[actorid].id) >= nextActorID) {
        nextActorID = Number(actors[actorid].id) + 1;
    }
}
console.log('Next actorid: ' + nextActorID);


//Initialize the next director ID. (starting at 1000001)
// This will be used when new unique directors will be added to the database 
// And when addition new unique directors will be added by the contributing users
let nextDirectorID = 1000001; 
for (directorid in directors) {
    if (Number(directors[directorid].id) >= nextDirectorID) {
        nextDirectorID = Number(directors[directorid].id) + 1;
    }
}
console.log('Next directorid: ' + nextDirectorID);


//Initialize the next writer ID. (starting at 1000001)
// This will be used when new unique writers will be added to the database 
// And when addition new unique writers will be added by the contributing users
let nextWriterID = 1000001; 
for (writerid in writers) {
    if (Number(writers[writerid].id) >= nextWriterID) {
        nextWriterID = Number(writers[writerid].id) + 1;
    }
}
console.log('Next writerid: ' + nextWriterID);


//Initialize the next Reviews ID. (starting at 1000001)
// This will be used when new unique reviews will be added to the database 
// And when addition new unique reviews will be added by the contributing users
let nextReviewID = 1000001; 
for (reviewid in reviews) {
    if (Number(reviews[reviewid].id) >= nextReviewID) {
        nextReviewID = Number(reviews[reviewid].id) + 1;
    }
}
console.log('Next reviewid: ' + nextReviewID);

//********* Helper Functions ********** 

//Helper function to verify a user object exists, has a unique username and that a user with that username exists
function isValidUser(userObj) {
    if (!userObj) {
        return false;
    }
    if (!userObj.username || !users.hasOwnProperty(userObj.username)) {
        return false;
    }
    return true;
}

//Helper function to verify that the movie is requesting for a movie object that actually exists for which the user has requested for. 
function isValidMovie(movieObj) {
    if (!movieObj) {
        return false;
    }
    if (!movieObj.title || !movies.hasOwnProperty(movieObj.title)) {
        return false;
    }
    return true;
}

//Helper function to verify that the movie is requesting for a actor object that actually exists for which the user has requested for. 
function isValidPeople(peopleObj) {
    if (!peopleObj) {
        return false;
    }
    if (!peopleObj.name || !actor.hasOwnProperty(peopleObj.name)) {
        return false;
    }
    return true;
}

//Helper function to verify that the user who is giving the review does he actually exists(at first), is he logged in and is he a contributing user, then his review is valid. 
function isValidReview(userObj, movieObj) {
    if (userObj.userType === false || users.hasOwnProperty(userObj.userType) === false) {
        return false;
    }
    if (!movieObj.title || !title.hasOwnProperty(peopleObj.title)) {
        return false;
    }
    return true;
}


//*********  User Related Functions  ********** 

/*
CreateUser Function: assumming that we are provided with an object containing the user's desired username and password. Once this is connected to the web, this information may come from a sign up form. This also act as a Sign In function.

Inputs:
newUser - a user object with username and password and who is signing in

Outputs:
The newly created user if succesfully created, null otherwise
*/
function createUser(newUser) {
    //Check the object is valid
    //This just ensures the object has a username and password
    //You may have more complex logic for your project
    if (!newUser.username || !newUser.password) {
        return null;
    }

    if (users.hasOwnProperty(newUser.username)) {
        //There is a user with that name already
        return null;
    }

    //Set initial values for the new user
    newUser.id = nextUserID;
    newUser.userSigned = true;
    newUser.userLogged = true;
    newUser.userType = false;
    newUser.reviews = [];
    newUser.followers = [];
    newUser.followingUsers = [];
    newUser.followingPeople = [];
    newUser.recommendMovies = [];
    users[newUser.id] = newUser;

    //Hidding Sign-in & Sign-up button when Logged in
    document.getElementById("btnSign-in").style.visibility = "hidden";
    document.getElementById("btnSign-up").style.visibility = "hidden";

    //Make Log-out button and user's profile visible
    document.getElementById("btnLog-out").style.visibility = "visible";
    document.getElementById("userProfile").style.visibility = "visible";

    return users[newUser.id];
}

//********Logged In/Out Functions********

/*Logged In function is to verify a user object exists, has a unique username and that user's password also exists and then check if he was logged out before or never signed in. Then system logs him in.

Inputs:
userObj - the object representing the user making the request to log-in
*/
function isLoggedIn(userObj) {
    if (!isValidUser()) {
        return false;
    }
    if (!userObj.password || !users.hasOwnProperty(userObj.password)) {
        return false;
    }
    // If user has a correct username and password, and if the user was first logged out then change userLogged property: true
    if (userObj.userLogged === false || users.hasOwnProperty(userObj.userLogged) === false) {
        userObj.userLogged = true;
    }
    else if (userObj.userLogged === true || users.hasOwnProperty(userObj.userLogged) === true) {
        console.log("\nError: the user was already log-in.\n");
        return false;
    }

    //Hidding Sign-in & Sign-up button when Logged in
    document.getElementById("btnSign-in").style.visibility = "hidden";
    document.getElementById("btnSign-up").style.visibility = "hidden";

    //Make Log-out button and user's profile visible
    document.getElementById("btnLog-out").style.visibility = "visible";
    document.getElementById("userProfile").style.visibility = "visible";

    return true;
}    

/*
Logged out function to verify a user object exists, has a unique username and that user's password also exists and then check if he was logged in before. Then system logs him out

Inputs:
userObj - the object representing the user making the request to log-out
*/
function isLoggedOut(userObj) {
    if (!isValidUser()) {
        return false;
    }
    // If user has a correct username and password, and if the user was first logged out then change userLogged property: true
    if (userObj.userLogged === true || users.hasOwnProperty(userObj.userLogged) === true) {
        userObj.userLogged = false;
    }
    else if (userObj.userLogged === false || users.hasOwnProperty(userObj.userLogged) === false) {
        console.log("\nError: the user was already log-out.\n");
        return false;
    }

    //Hide Log-out button and user's profile
    document.getElementById("btnLog-out").style.visibility = "hidden";
    document.getElementById("userProfile").style.visibility = "hidden";

    //Make Sign-in & Sign-up button visible again
    document.getElementById("btnSign-in").style.visibility = "visible";
    document.getElementById("btnSign-up").style.visibility = "visible";
    
    return true;
}    


/*
Assumption is that the request provides the user name of the user it is trying to access. We will also require a user to be logged in, so we will have access to the requestingUser. We may have rules that specify who can access what users. In this case, we will say a user can access themselves and any of their friends.

Inputs:
requestingUser - the object representing the user making the request (we use this to decide whether the request should be successful or not)
username - the name of the user they are trying to access

Outputs:
The user with the given name if the request is authorized and the user is found, null otherwise
*/
function getUser(requestingUser, username) {
    //If the requesting user is invalid (e.g., is not logged in, is missing username, anything else expected is invalid), disallow
    if (requestingUser.userLogged === false) {
        return null;
    }

    //If the requested username exists and the requesting user is allowed to access it, return the user
    else if (users.hasOwnProperty(username)) {
        if (requestingUser.username === username || requestingUser.friends.includes(username)) {

             //If the user of that username has signed up into the system ever.
            if( users[userID].userSigned === true)
            return users[userID];
        }
    }

    return null;
}



//*********Contributing & Non-contbuting Functions********

/*
Contributing user function to verify a user object exists, has a unique username and that a user with that username is logged in. Then system makes him a contributing user, which allows him to add information of reviews, people, movies.

Inputs:
userObj - the object representing the user making the request to become a contributor
*/
function isContributingUser(userObj) {
    if (!isLoggedIn()) {
        return false;
    }
    // If user is logged in and if the user was first not a contributing user then change userLogged property: true
    if (userObj.userType === false || users.hasOwnProperty(userObj.userType) === false) {
        userObj.userType = true;
    }
    else if (userObj.userType === true || users.hasOwnProperty(userObj.userType) === true) {
        console.log("\nError: the user was already a contrbuting user.\n");
        return false;
    }

    return true;
}    

/*
Not contributing user function to verify a user object exists, has a unique username and that a user with that username is logged in. Then system makes him back into a not contributing user, which doesn't allows him to add information of reviews, people, movies.

Inputs:
userObj - the object representing the user making the request to become a contributor
*/
function notContributingUser(userObj) {
    if (!isLoggedUser()) {
        return false;
    }
    // If user is logged in and if the user was first not a contributing user then change userLogged property: true
    if (!userObj.userType === true || !users.hasOwnProperty(userObj.userType) === true) {
        userObj.userType = false;
    }
    else if (userObj.userType === false || users.hasOwnProperty(userObj.userType) === false) {
        console.log("\nError: the user was already not a contrbuting user.\n");
        return false;
    }

    return true;
}    


