/* 
testlogin@gmail.com met pw testlogin
*/

// Dom7
var $$ = Dom7;

// listen for auth status changes, every time a user logs in or out
 auth.onAuthStateChanged(user => {
    if (user){

      localStorage.setItem("userID", user.uid);
        // get data // on snapshot laat data veranderen als data in de firestore veranderd
            db.collection('events').onSnapshot(snapshot => {
                //setupGuides(snapshot.docs);
                setupUI(user);


                if (loggedIn == false) {
                  loggedIn = true;
                } else loggedIn = false;
            }, err => {
                console.log(err.message);
            })
        
    } else {
        setupUI();
        // om niets van output te hebben
        //setupGuides([]);
    }

});


//login
$$('#btnLogin').on('click', function (e) {
    e.preventDefault();

    // get user info    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        
    console.log('login succesvol');
    document.querySelector('.error').innerHTML = "U bent ingelogd";  
    console.log(cred.user); 
    app.loginScreen.close('#my-login-screen');   
       
    }).catch(err => {
        document.querySelector('.error').innerHTML = err.message;
    });
  
});

//logout

// Get the button, and when the user clicks on it, execute myFunction

//
/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function logout() {   
    auth.signOut();
    loggedIn = false; 
    console.log("uitgelogd");
}

/* // login status 


// login met google
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  }); */