var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element
  id: 'be.providit.F7Cordova', // App bundle ID
  name: 'Providit Planner', // App name
  view: {
    iosDynamicNavbar: false,
    xhrCache: false,
    router: true  
  },
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

        if (page.route.name === "voorsteldatepicker") {          
          datepicker();
        }
        if (page.route.name === "detailevent") {          
          datepickerDetailevent()
        }
        if (page.route.name === "voorstelrandomevent") {          
          datepicker();
        }
        if (page.route.name === "detaileventdate") {          
          datepickerdisabled();
        }
        if (page.route.name === "voorstelrandomevent") {      
          datepickerRandomEvent();

        }
        
    }
  },
});



// Eigen code
var user = firebase.auth().currentUser; // TODO: moet ook aangepast worden wanneer user inlogd en uitlogd
console.log(user);
var loggedIn = false;
console.log(loggedIn);
var userID;
var userRol;
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const loggedOutLinks = document.querySelectorAll('.loggedout');
const loggedInLinks = document.querySelectorAll('.loggedin');
const setupUI = (user) => {

  if (user){
    userID = localStorage.getItem("userID")
    // output account information
    db.collection('users').doc(user.uid).get().then(doc => {
      //myApp.dialog.alert('Welcome  ' + doc.data().username  );
    })
    app.loginScreen.close('#my-login-screen');               
    // checkLoggedIn(loggedIn);
    // toggle UI elements
    getAantalPersoneel();
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    getUserRol();

  } else {
    app.loginScreen.open('#my-login-screen');  
    app.views.current.router.navigate('/myevents/', {reloadCurrent: true});
    userRol = "";
    
    // hide account info
    //accountDetails.innerHTML = "";
    // toggle UI elements
    // loggedInLinks.forEach(item => item.style.display = 'none');
    // loggedOutLinks.forEach(item => item.style.display = 'block');
    // document.getElementById("logout").style.display = 'none';

  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function getUserRol(){
  db.collection('Users').doc(userID).get().then(function(doc) {
    if (doc.exists) {
        userRol = doc.data().Rol
        // zaakvoerderspaneel activeren of niet
        if (userRol !== "Zaakvoerder"){
          $$("#tablijstvoorstellen").hide();
        }

    } else {
      console.log("doc does not exist");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
function checkiszaakvoerder(){
  if(userRol == "Zaakvoerder"){
    return true;
  } else return false;
}




// Agenda detailEvent

var $$ = Dom7;
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
var calendarInlineDetailevent = app.calendar.create({
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
        calendarInlineDetailevent.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInlineDetailevent.nextMonth();
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
  var calendarInlineZ = app.calendar.create({
  containerEl: '#demo-calendar-inline-container-voorsteldatepicker',
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
        calendarInlineZ.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInlineZ.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});
}

function datepickerDetailevent(){
  var today = new Date();
  var weekLater = new Date().setDate(today.getDate() + 7);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
  var calendarInlineVoorsteldetailevent = app.calendar.create({
  containerEl: '#demo-calendar-inline-container-detailevent',
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
        calendarInlineVoorsteldetailevent.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInlineVoorsteldetailevent.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});
}
// kalender bij het voorstellen van een event zonder bepaald event
function datepickerRandomEvent(){
  var today = new Date();
  var weekLater = new Date().setDate(today.getDate() + 7);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
  var calendarInlineVoorstelrandomevent = app.calendar.create({
  containerEl: '#demo-calendar-inline-container-voorstelrandomevent',
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
        calendarInlineVoorstelrandomevent.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInlineVoorstelrandomevent.nextMonth();
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
      var user = firebase.auth().currentUser;
      db.collection('Events').add({
        Eventnaam: document.getElementById("addeventnaam").value,
        Duurtijd: document.getElementById("addeventduurtijd").value,
        Tijdstip: document.getElementById("addeventtijdstip").value,
        Beschrijving: document.getElementById("addeventbeschrijving").value,
        Prijspp: document.getElementById("addeventprijs").value,
        URL: document.getElementById("addeventurl").value,
        Locatie: document.getElementById("addeventlocatie").value,
        Img: downloadURL ,
        Status: "aanvraag",
        Organisator: user.uid
      });
      lijstEigenVoorstellen();
      getListAanvragen();
    });
  });
  

}






//////////////////////////////////////
/////////////MY EVENTS///////////////
//////////////////////////////////////
$$(document).on('page:init', '.page[data-name="myevents"]', function (e) {
  getListMyEvents();
    });
  
 
function getListMyEvents(){
  lijstEigenVoorstellen() ;
  lijstEigenHistory();
  console.log("check");
}


function lijstEigenVoorstellen() {    
  var tlines = "";    
  //var user = firebase.auth().currentUser;
  db.collection('Events').where("Organisator", '==', localStorage.getItem("userID")).where('Status' , '==', "aanvraag").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {    
      tlines += "<li><a href='/eventvoorstel/' class='item-link item-content eigenvoorstellink' id="+ doc.id+ "><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
      $$("#listeigenvoorstellen").html(tlines);      
  })
   
}) 
}

// list van eigen voorstellen history
function lijstEigenHistory() {  
 
  var user = firebase.auth().currentUser;  
  db.collection('Events').where('Status' , '==', "voorstelnodate").where("Organisator", '==', localStorage.getItem("userID")).get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {              
      var tlines ="";
      tlines += "<li><a href='#' class=' item-content' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>checkmark_alt_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
      $$("#eigenvoorstellenhistory").append(tlines);    
  })
}) 
db.collection('Events').where('Status' , '==', "afgekeurd").where("Organisator", '==', localStorage.getItem("userID")).get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {              
    var tlines ="";
    tlines += "<li><a href='/aanvraagafkeurenuitlegRead/' class='item-link item-content eigenafgekeurdeevents' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>multiply_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
    $$("#eigenvoorstellenhistory").append(tlines);  
})
}) 

}

// show scherm waarom afgekeurd
$$(document).on('click', 'a.eigenafgekeurdeevents', function (e) {
  eventnummer = $$(this).attr("id");
  showWaaromAfgekeurd();  
});

function showWaaromAfgekeurd(){
  db.collection('Events').doc(eventnummer).get().then(function(doc) {
    if (doc.exists) {
        $$("#redenAfgekeurd").append(doc.data().RedenAfgekeurd);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}


// zodat een organisator een ingediende aanvraag kan wijzigen
$$(document).on('click', 'a.eigenvoorstellink', function (e) {
  eventnummer = $$(this).attr("id");
  showAanvraagInfo();
});

function showAanvraagInfo(){
  db.collection("Events").doc(eventnummer)
  .get()
  .then(function(doc) {        
    $$("#oInfo").html('<b>Info:</b> ' + doc.data().Beschrijving); 
    $$("#oEventnaam").html(doc.data().Eventnaam); 
    $$("#oTijdstip").html('<b>Tijdstip:</b> ' + doc.data().Tijdstip); 
    $$("#oDuur").html('<b>Duurtijd:</b> ' + doc.data().Duurtijd); 
    $$("#oLocatie").html('<b>Locatie:</b> ' + doc.data().Locatie); 
    $$("#oURL").html('<b>URL:</b> ' + doc.data().URL); 
    document.getElementById("oImg").setAttribute("src", doc.data().Img);
    document.getElementById("oURL").setAttribute("href", doc.data().URL);

  })
  .catch(function(error) {
      console.log("Error getting eventdocuments: ", error);
  });
}
// vult het formulier bij edit aanvraag in
function editAanvraagFormulierShow(){
  db.collection("Events").doc(eventnummer)
  .get()
  .then(function(doc) {        
   document.getElementById("editeventnaam").value = doc.data().Eventnaam; 
   document.getElementById("editeventbeschrijving").value = doc.data().Beschrijving; 
   document.getElementById("editeventtijdstip").value = doc.data().Tijdstip; 
   document.getElementById("editeventduurtijd").value =  doc.data().Duurtijd; 
   document.getElementById("editeventlocatie").value = doc.data().Locatie; 
   document.getElementById("editeventurl").value = doc.data().URL; 
  })
  .catch(function(error) {
      console.log("Error getting eventdocuments: ", error);
  });
}
function editAanvraag(){
// wijzigt deze informatie
var img = document.getElementById("editeventimg").files[0];
console.log(img);
if (img){
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
      // later als login werkt kan dit worden uncomment worden samen met eigenaar
      db.collection('Events').doc(eventnummer).update({
        Eventnaam: document.getElementById("editeventnaam").value,
        Duurtijd: document.getElementById("editeventduurtijd").value,
        Tijdstip: document.getElementById("editeventtijdstip").value,
        Beschrijving: document.getElementById("editeventbeschrijving").value,
        Prijspp: document.getElementById("editeventprijs").value,
        URL: document.getElementById("editeventurl").value,
        Locatie: document.getElementById("editeventlocatie").value,
        Img: downloadURL
      });
  
    });
  });
}else{
  db.collection('Events').doc(eventnummer).update({
    Eventnaam: document.getElementById("editeventnaam").value,
    Duurtijd: document.getElementById("editeventduurtijd").value,
    Tijdstip: document.getElementById("editeventtijdstip").value,
    Beschrijving: document.getElementById("editeventbeschrijving").value,
    Prijspp: document.getElementById("editeventprijs").value,
    URL: document.getElementById("editeventurl").value,
    Locatie: document.getElementById("editeventlocatie").value
  });
}



}
// zodat info steeds getoond wordt op de myevents pagina's
/* $$(document).on('click', 'a.myevents', function (e) {
  getListMyEvents();
  showAanvraagInfo();
}); */
// deze functie dient ervoor dat een organisator een aanvraag kan deleten
$$(document).on('click', '.open-confirm', function () {
  app.dialog.confirm('Zeker dat je dit wilt verwijderen?', function () {
    console.log("deleted aanvraag");
     db.collection("Events").doc(eventnummer).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  }); 
   app.views.current.router.navigate('/myevents/', {reloadCurrent: true});
  });
});


function changepw(){
 var niewpaswoord =  document.getElementById("nieuwpaswoord").value;
 var herhaalpaswoord = document.getElementById("herhaalpaswoord").value;
  if (niewpaswoord == herhaalpaswoord) {
    var user = firebase.auth().currentUser;
    
    user.updatePassword(niewpaswoord).then(function() {
    
    }).catch(function(error) {
     console.log(error);
    });
    app.dialog.alert('Wachtwoorden is aangepast');
  } else {
    app.dialog.alert('Wachtwoorden komen niet overeen');
  }

}














