
var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element
  id: 'be.mikadebelder.F7Cordova', // App bundle ID
  name: 'Providit Planner', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes (routes.js)
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      
    },
    pageInit: function (page) {

      // bij het toevoegen van een fiets wordt het toegevoegd in de lijst in de homepagina
        //if (page.route.name === "addbike") {
            //$$('#btnaddbike').on('click', function () {
               // voegToe();
         // });
        //}
        if (page.route.name === "voorsteldatepicker") {          
          datepicker();
        }
        if (page.route.name === "detailevent") {          
          datepickerdisabled();
        }
        if (page.route.name === "voorstelrandomevent") {          
          datepicker();
        }
        if (page.route.name === "detaileventdate") {          
          datepickerdisabled();
        }
        if (page.route.name === "lijstvoorstellen") {          
          getListVoorstellen();
        }
        
    }
  },
});



// Eigen code
var user = firebase.auth().currentUser;
console.log(user);
var loggedIn = false;
console.log(loggedIn);
let userID = localStorage.getItem("userID");
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const loggedOutLinks = document.querySelectorAll('.loggedout');
const loggedInLinks = document.querySelectorAll('.loggedin');
const setupUI = (user) => {

  if (user){
    // output account information
    db.collection('users').doc(user.uid).get().then(doc => {
      //myApp.dialog.alert('Welcome  ' + doc.data().username  );
    })
    app.loginScreen.close('#my-login-screen');               
    // checkLoggedIn(loggedIn);
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

  } else {
    // hide account info
    //accountDetails.innerHTML = "";
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');

  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!






// Agenda detailEvent

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
var calendarInline = app.calendar.create({
  containerEl: '#demo-calendar-inline-container',
  multiple: true,
  weekHeader: false,
  renderToolbar: function () {
    return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
      '<div class="toolbar-inner">' +
        '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
  },
  on: {
    init: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
      $$('.calendar-custom-toolbar .left .link').on('click', function () {
        calendarInline.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInline.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});



///////////////////////////////////////////////////////////////////////////////////////////////////
//PROVIDIT//
///////////////////////////////////////////////////////////////////////////////////////////////////
function datepicker() {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
  var calendarInline = app.calendar.create({
  containerEl: '#demo-calendar-inline-container',
  multiple: true,
  weekHeader: false,
  renderToolbar: function () {
    return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
      '<div class="toolbar-inner">' +
        '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
  },
  on: {
    init: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
      $$('.calendar-custom-toolbar .left .link').on('click', function () {
        calendarInline.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInline.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});

}
function datepickerdisabled() {
  var today = new Date();
  var weekLater = new Date().setDate(today.getDate() + 7);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
  var calendarInline = app.calendar.create({
  containerEl: '#demo-calendar-inline-container',
  multiple: true,
  weekHeader: false,
  disabled: {
    from: new Date(2020, 4, 4),
    to: new Date(2020, 4, 7),
},
  renderToolbar: function () {
    return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
      '<div class="toolbar-inner">' +
        '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
  },
  on: {
    init: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
      $$('.calendar-custom-toolbar .left .link').on('click', function () {
        calendarInline.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInline.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});

}


// make event voorstel
function firestoreAddVoorstel(){
  console.log("testclick");
  var img = document.getElementById("img").files[0];
  var imgname = img.name;
 
  var storage = firebase.storage();

  var storageRef = firebase.storage().ref(imgname);

  var uploadTask = storageRef.put(img);

  uploadTask.on('state_changed', function (snapshot){
    var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log("upload is "+ progress+" done");
  },function(error){
    console.log(error.message);
  },function(){

    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
      console.log(downloadURL);
      // later als login werkt kan dit worden uncomment worden samen met eigenaar
      //var user = firebase.auth().currentUser;
      db.collection('Events').add({
        Eventnaam: document.getElementById("addeventnaam").value,
        Beschrijving: document.getElementById("addeventbeschrijving").value,
        Prijspp: document.getElementById("addeventprijs").value,
        URL: document.getElementById("addeventurl").value,
        Img: downloadURL ,
        Status: "voorstel"
        //eigenaar: user.uid
      });

    });
  });
  

}

// eventvoorstellen ophalen voor zaakvoerderspaneel
function getListVoorstellen() {

    
    db.collection('Events').where('Status' , '==', "aanvraag").get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
        var tlines = "";          
        tlines += "<li><a href='/eventvoorstelzaakvoerder/' class='voorstellinks' id=" + doc.id + ">" + doc.data().Eventnaam + "</a></li>";
        $$("#voorstellenaanzaakvoerder").html(tlines);                 
    
  
    })
  }) 

      
}
/* Deze functie dient om wanneer iemand op een eventvoorstel/aanvraag 
voor de zaakvoerder klikt dat 
alle gegevens van die fiets worden weergegeven
 */

$$(document).on('click', 'a.voorstellinks', function (e) {
  console.log('link clicked'); 
  showEventVoorstelZaakvoerder();  
});


// event laten zien wanneer op voorstel op zaakvoerderspaneel wordt geklikt
function showEventVoorstelZaakvoerder(){
  var eventnummer = document.querySelectorAll('.voorstellinks')[0].id;
  db.collection("Events").doc(eventnummer)
    .get()
    .then(function(doc) {        
      $$("#vInfo").html('<b>Info:</b> ' + doc.data().Beschrijving); 
      $$("#vTijdstip").html('<b>Tijdstip:</b> ' + doc.data().Tijdstip); 
      $$("#vDuur").html('<b>Duurtijd:</b> ' + doc.data().Duurtijd); 
      $$("#vLocatie").html('<b>Locatie:</b> ' + doc.data().Locatie); 
      $$("#vURL").html('<b>URL:</b> ' + doc.data().URL); 
      document.getElementById("vImg").setAttribute("src", doc.data().Img);
      document.getElementById("vURL").setAttribute("href", doc.data().URL);
      document.getElementById("vGoedkeuren").setAttribute("id", doc.id);
      document.getElementById("vAfkeuren").setAttribute("id", doc.id);
            organisatorID = doc.data().Organisator;
              db.collection("Users").doc(organisatorID)
            .get()
            .then(function(doc) {        
                var organisatornaaam = doc.data().Username;
                $$("#vOrganisator").html(organisatornaaam);              
            })
            .catch(function(error) {
                console.log("Error getting userdocuments: ", error);
            });
      
    })
    .catch(function(error) {
        console.log("Error getting eventdocuments: ", error);
    });

}



$$(document).on('click', 'a.aanvraagGoedkeuren', function (e) {
  console.log('link clicked'); 
  //aanvraagGoedkeuren();  
});
// een aanvraag voor een event van een organisator goedkeuren
function aanvraagGoedkeuren(){
  var eventnummer = document.querySelectorAll('.aanvraagGoedkeuren')[0].id;
  db.collection("Events").doc(eventnummer)
    .update({
      Status: "aanvraag"
    })
}


