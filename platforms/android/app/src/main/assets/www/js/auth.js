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

    //setupGuides(snapshot.docs);
    setupUI(user);
    //getListMyEvents();
    //reloadHome();	
    if (loggedIn == false) {
    loggedIn = true;
    } else loggedIn = false;


        
    } else {
        setupUI();
        userID = localStorage.removeItem("userID");
        // om niets van output te hebben
        //setupGuides([]);
    }

});

let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
let authWorkerAuth = firebase.auth(authWorkerApp);
authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials



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
    localStorage.removeItem("userID");
}



// signup
 
function addpersoon(){
    const password = document.getElementById("Paswoord").value;
    if(password.length > 5){
        var imgprofiel = document.getElementById("imgprofiel").files[0];
        var imgprofielname = imgprofiel.name; 
        var storage = firebase.storage();
        var storageRef = firebase.storage().ref(imgprofielname);
        var uploadTask = storageRef.put(imgprofiel);
      
      
        uploadTask.on('state_changed', function (snapshot){
          var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log("upload is "+ progress+"done");
        },function(error){
          console.log(error.message);
        },function(){
      
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
            console.log(downloadURL);
            const email = document.getElementById("Emailadres").value;
            const username = document.getElementById("Naam").value;      
            const rol = document.getElementById("addrol").value;
           
            authWorkerAuth.createUserWithEmailAndPassword(email, password).then(cred => {
              // met doc() gaan we zelf een userid toewzijen aan een user ipv dat firestore dit automatisch doet 
              return db.collection('Users').doc(cred.user.uid).set({
                  Username: username,
                  Email: email,
                  Rol: rol,
                  Img: downloadURL
              })       
          }).then(() => {
                  app.dialog.alert('User geregistreerd');
     
                app.views.current.router.navigate('/myevents/', {reloadCurrent: true});
                
          })  
          
           
          });
        });
    } else {
        app.dialog.alert('het paswoord moet minstens 5 characters zijn');
    }


    }