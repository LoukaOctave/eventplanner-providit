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
let userID = localStorage.getItem("userID"); // TODO: moet ook aangepast worden wanneer user inlogd en uitlogd
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
    getAantalPersoneel();
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

    });
  });
  

}
// lists op zaakvoerderspaneel laden
$$(document).on('page:init', '.page[data-name="lijstvoorstellen"]', function (e) {
  getListHistory();
  getListAanvragen();
  getListRandomEvents();
  getListVoorstellen();
  
});

// list van voorstellen history
function getListHistory() {    
  db.collection('Events').where('Status' , '==', "voorstelnodate").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {              
      var tlines = "";          
      tlines += "<li><a href='#' class='item-link item-content' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>checkmark_alt_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
      $$("#voorstellenhistory").append(tlines);       
  })
}) 
db.collection('Events').where('Status' , '==', "afgekeurd").get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {              
    var tlines = "";          
    tlines += "<li><a href='#' class='item-link item-content' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>multiply_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
    $$("#voorstellenhistory").append(tlines);       
})
}) 

    
}
// eventvoorstellen ophalen voor zaakvoerderspaneel
function getListAanvragen() {
  var tlines = "";     
    db.collection('Events').where('Status' , '==', "aanvraag").get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
                 
        tlines += "<li><a href='/eventvoorstelzaakvoerder/' class='aanvraaglinks' id=" + doc.id + ">" + doc.data().Eventnaam + "</a></li>";       
    })
    $$("#voorstellenaanzaakvoerder").html(tlines);      
  })       
}

function getListRandomEvents(){
  db.collection('Events').where('Status' , '==', "voorstelnoevent").get()
  .then((snapshot) => {
      snapshot.docs.forEach(doc => {             
        var tlines = "";          
        tlines += "<li><a href='/voorsteldatepickershow/' class='item-link item-content randomvoorstellinks' id=" + doc.id + "><div class='item-inner'><div class='item-title' id='titelZoekenRandomEvent'>" + doc.data().Eventnaam+ "</div></div></a></li>";
        $$("#datumzoekenvooronbepaaldevent").append(tlines);                 
    }) 
});
}
function getListVoorstellen(){
  var tlines = "";     
    db.collection('Events').where('Status' , '==', "voorstelnodate").get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
                 
        tlines += "<li><a href='/eventvoorstelzaakvoerdergoedgekeurd/' class='voorstellinks' id=" + doc.id + ">" + doc.data().Eventnaam + "</a></li>";       
    })
    $$("#goedgekeurdeaanvragen").html(tlines);      
  })  
}

/* Deze functie dient om wanneer iemand op een eventvoorstel/aanvraag 
voor de zaakvoerder klikt dat 
alle gegevens van die fiets worden weergegeven
 */

$$(document).on('click', 'a.aanvraaglinks', function (e) {
  eventnummer = $$(this).attr("id");
  console.log('link clicked'); 
  showEventVoorstelZaakvoerder();  
});


// event laten zien wanneer op voorstel op zaakvoerderspaneel wordt geklikt
function showEventVoorstelZaakvoerder(){
  db.collection("Events").doc(eventnummer)
    .get()
    .then(function(doc) {        
      $$("#vInfo").html('<b>Info:</b> ' + doc.data().Beschrijving); 
      $$("#vEventnaam").html(doc.data().Eventnaam); 
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
                document.getElementById("imguser").setAttribute("src", doc.data().Img);              
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
  aanvraagGoedkeuren();  
});
$$(document).on('click', 'a.aanvraagGetEventnummer', function (e) {
  aanvraagGetEventnummer();  
});

// een aanvraag voor een event van een organisator goedkeuren
var mogelijkeData = [];
var eventnummer;
function aanvraagGetEventnummer(){
eventnummer = document.querySelectorAll('.aanvraagGetEventnummer.active-state')[0].id;
}

function aanvraagGoedkeuren(){
  var DeadlineToTimestamp = firebase.firestore.Timestamp.fromDate(new Date(document.getElementById("adddeadline").value));
  mogelijkeData = app.calendar.get().value;
   db.collection("Events").doc(eventnummer).update({
      Status: "voorstelnodate",
      Deadline: DeadlineToTimestamp
    }) 

    for (i = 0; i < mogelijkeData.length; i++) {
      db.collection("Events").doc(eventnummer).collection("Data").doc().set({
        datum: mogelijkeData[i]
      })
  }
}


// make data voorstel
function firestoreAddRandomEvent(){
      
      db.collection('Events').add({
        Eventnaam: document.getElementById("addrandomeventnaam").value,
        Img: "https://firebasestorage.googleapis.com/v0/b/eventplanner-providit.appspot.com/o/randomevent.JPG?alt=media&token=8c7151a2-6a3e-4cb4-9456-44dbe463f027" ,
        Status: "voorstelnoevent"
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        eventnummer = ref.id;
        mogelijkeData = app.calendar.get().value;
        for (i = 0; i < mogelijkeData.length; i++) {
          db.collection("Events").doc(eventnummer).collection("Data").doc().set({
            datum: mogelijkeData[i]
          })
        }
    });  
}

// datepicker voor randomevent dat al is aangemaakt
function datepickerRandomEventExists(){
  var today = new Date();
  var weekLater = new Date().setDate(today.getDate() + 7);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
  var calendarInlineVoorstelrandomeventExists = app.calendar.create({
  containerEl: '#demo-calendar-inline-container-voorsteldatepickerShow',
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
        calendarInlineVoorstelrandomeventExists.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInlineVoorstelrandomeventExists.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});
calendarInlineVoorstelrandomeventExists.setValue(mogelijkeData);
}



// wanneer de zaakvoerder op een random event klikt dat al aangemaakt is wordt dit geactiveerd
$$(document).on('click', 'a.randomvoorstellinks', function (e) {
  // eventnummer = document.querySelectorAll('.randomvoorstellinks.active-state')[0].id;
  eventnummer = $$(this).attr("id");
  showRandomEventVoorstel();  
});
function showRandomEventVoorstel(){
  

db.collection('Events').doc(eventnummer).collection('Data').get()
  .then((snapshot) => {
      snapshot.docs.forEach(doc => {             
        var tlines = "";          
        tlines += "<p>" + doc.data().datum.toDate()  + "</p>";
        $$("#lijstdatarandomevent").append(tlines);                 
    }) 
  })
}

// om een event om een datum te zoeken zonder concreet event te verwijderen
function deleterandomdatumvoorstel(){
  db.collection("Events").doc(eventnummer).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}
$$(document).on('click', 'a.aanvraagAfkeurenDefinitief', function (e) {
  aanvraagAfkeuren();  
});
function aanvraagAfkeuren(){
  db.collection("Events").doc(eventnummer).update({
    Status: "afgekeurd",
    RedenAfgekeurd: document.getElementById("waaromafkeuren").value
  })

}
// zodat de zaakvoerder een eventvoorstel kan wijzigen
$$(document).on('click', 'a.voorstellinks', function (e) {
  eventnummer = $$(this).attr("id");
  showVoorstelInfo();
});
function showVoorstelInfo(){
  db.collection("Events").doc(eventnummer)
  .get()
  .then(function(doc) {        
    $$("#gInfo").html('<b>Info:</b> ' + doc.data().Beschrijving); 
    $$("#gEventnaam").html(doc.data().Eventnaam); 
    $$("#gTijdstip").html('<b>Tijdstip:</b> ' + doc.data().Tijdstip); 
    $$("#gDuur").html('<b>Duurtijd:</b> ' + doc.data().Duurtijd); 
    $$("#gLocatie").html('<b>Locatie:</b> ' + doc.data().Locatie); 
    $$("#gURL").html('<b>URL:</b> ' + doc.data().URL); 
    document.getElementById("gImg").setAttribute("src", doc.data().Img);
    document.getElementById("gURL").setAttribute("href", doc.data().URL);

  })
  .catch(function(error) {
      console.log("Error getting eventdocuments: ", error);
  });
}
function editVoorstelFormulierShow(){
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
function editVoorstel(){
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
//////////////////////////////////////
/////////////MY EVENTS///////////////
//////////////////////////////////////

// lists op myevents laden
$$(document).on('page:init', '.page[data-name="myevents"]', function (e) {
  
 });

 
function getListMyEvents(){
  lijstEigenVoorstellen() ;
  lijstEigenHistory();
}


function lijstEigenVoorstellen() {    
  //var user = firebase.auth().currentUser;
  db.collection('Events').where("Organisator", '==', localStorage.getItem("userID")).where('Status' , '==', "aanvraag").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {              
      var tlines = "";          
      tlines += "<li><a href='/eventvoorstel/' class='item-link item-content eigenvoorstellink' id="+ doc.id+ "><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
      $$("#listeigenvoorstellen").append(tlines);       
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

$$(document).on('page:init', '.page[data-name="myevents"]', function (e) {
getListMyEvents();
  });

//  #region INDEX.HTML

    //  #region ALGEMEEN

// Als de index.html pagina (data-name=home) wordt geïnitialiseerd, dan wordt de homepagina herladen
$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  reloadHome();
});

// De homepagina wordt herladen
function reloadHome() {
  getListVoorstelNoDateEvents();
  getListVoorstelNoEventEvents();
  getListGeplandEvents();
}

// Is de huidige user een deelnemer: true or false?
function isUserDeelnemerBijEvent(event) {
  db.collection('Events').doc(event).collection('Deelnemers').get().then(function(docs) {
    docs.forEach(doc => { 
      /*console.log(doc.id);
      console.log(userID);*/
      if (doc.id == userID) { /*console.log(true);*/ }
    })
  })
}

    //  #endregion ALGEMEEN

    //  #region VOORSTELNODATE

// Events met "voorstelnodate" als status ophalen en zetten onder "Datum kiezen..."
function getListVoorstelNoDateEvents() {
  db.collection('Events').where('Status', '==', "voorstelnodate").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      var tlines = "";
      tlines += "<div class='card demo-card-header-pic'><a class ='voorstelNoDateEventCardLinks' id ='"
      + doc.id + "' href='/detailevent/'><div style='background-image: url('"
      + doc.data().Img + "')' class='card-header align-items-flex-end'>"
      + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>Aanmelden tot "
      // TODO: Events een Deadline geven en deze hieronder plaatsen
      + "doc.data().Deadline" + "</p><p>"
      + doc.data().Beschrijving + "</p></div><div class='card-footer'><a href='/detailevent/' class='voorstelNoDateEventCardLinks' id ='"
      + doc.id + "'>"
      + "isUserDeelnemerBijEvent(doc.id)" + "</a></div></a></div>";
      $$("#voorstelNoDateEvent").append(tlines);
    })
  })
}

// Detail voorstelnodate wanneer je op een cardlink klikt
$$(document).on('click', 'a.voorstelNoDateEventCardLinks', function (e) {
  eventnummer = $$(this).attr("id");
  getDetailVoorstelNoDateEvent();
  getDatesDetailVoorstelNoDateEvent();
});

// Details tonen van event met status "voorstelnodate"
function getDetailVoorstelNoDateEvent() {
  db.collection('Events').doc(eventnummer).get().then(function(doc) {
    var tlines = "";
    tlines += "<div class='page-content'><div class='block-title block-title-medium'>"
    + doc.data().Eventnaam + "</div><img src='"
    + doc.data().Img + "' id='vImg'> <div class='block block-strong inset'><p><b>Duurtijd: </b>"
    + doc.data().Duurtijd + "</p><p><b>Moment van de dag: </b>"
    + doc.data().Tijdstip + "</p><p><b>Beschrijving: </b>"
    + doc.data().Beschrijving + "</p></div>";

    $$("#detailVoorstelNoDateEvent").append(tlines);
  })
}

// Datum van "voorstelnodate" tonen in checkboxes
function getDatesDetailVoorstelNoDateEvent(){
  db.collection('Events').doc(eventnummer).collection('Data').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      
      // TODO: Een functie maken voor het omzetten van Firestore data naar een weergeefbare datum
      var ts = doc.data().datum;
      var ts_ms = ts * 1000;
      var date_ob = new Date(ts_ms);
      var year = date_ob.getFullYear();
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var date = ("0" + date_ob.getDate()).slice(-2);
      var fulldate = date + "-" + month + "-" + date;

      var tlines = "";
      tlines += "<li><label class='item-checkbox item-content'><input type='checkbox' name='demo-checkbox' value='Date'/><i class='icon icon-checkbox'></i><div class='item-inner'><div class='item-title'>"
      + fulldate + "</div></div></label></li>";
      $$("#getDateCheckbox").append(tlines);
    })
  })
}

    //  #endregion VOORSTELNODATE

    //  #region VOORSTELNOEVENT

// Events met "voorstelnoevent" als status ophalen en zetten onder "Datum kiezen..."
function getListVoorstelNoEventEvents() {
  db.collection('Events').where('Status', '==', "voorstelnoevent").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      var tlines = "";
      tlines += "<div class='card demo-card-header-pic'><a class ='voorstelNoEventEventCardLinks' id ='"
      + doc.id + "' href='/detaileventdate/'><div style='background-image: url('"
      + doc.data().Img + "')' class='card-header align-items-flex-end'>"
      + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>Aanmelden tot "
      // TODO: Events een Deadline geven en deze hieronder plaatsen
      + "doc.data().Deadline" + "</p><p>"
      + doc.data().Beschrijving + "</p></div><div class='card-footer'><a href='/detaileventdate/' class='voorstelNoEventEventCardLinks' id ='"
      + doc.id + "'>"
      + "isUserDeelnemerBijEvent(doc.id)" + "</a></div></a></div>";

      $$("#voorstelNoEventEvent").append(tlines);
    })
  })
}

// Wanneer er op de cardlink van een voorstelnoevent event wordt geklikt, dan wordt de "detaileventdate.html" pagina geopend met de juiste informatie
$$(document).on('click', 'a.voorstelNoEventEventCardLinks', function (e) {
  eventnummer = $$(this).attr("id");
  getDetailVoorstelNoEventEvent();
});

// TODO: Ervoor zorgen dat "detaileventdate.html" wordt geopend wanneer er op de cardlink geklikt wordt. (Probleem zit niet bij href of routes.js)
function getDetailVoorstelNoEventEvent() {
  db.collection('Events').doc(eventnummer).get().then(function(doc) {
    var tlines = "";
    tlines += "<div class='block-title block-title-medium'>"
    + doc.data().Eventnaam + "</div>";

    $$("#detailVoorstelNoEventEvent").append(tlines);
  })
}

    //  #endregion VOORSTELNOEVENT

    //  #region GEPLAND

// Events met "gepland" als status ophalen en zetten onder "Geplande events"
function getListGeplandEvents() {
  db.collection('Events').where('Status', '==', "gepland").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      var tlines = "";
      tlines += "<div class='card demo-card-header-pic'><a class ='geplandEventCardLinks' id ='"
      + doc.id + "' href='/detailfinalevent/'><div style='background-image: url('"
      + doc.data().Img + "')' class='card-header align-items-flex-end'>"
      + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>"
      // TODO: Events een Datum geven en deze op de volgende lijn plaatsen
      + "doc.data().Datum" + "</p><p>"
      + doc.data().Beschrijving + "</p></div><div class='card-footer'><a href='/detailfinalevent/' class='geplandEventCardLinks' id ='"
      + doc.id + "'>"
      + "isUserDeelnemerBijEvent(doc.id)" + "</a></div></a></div>";

      $$("#geplandEvent").append(tlines);
    })
  })
}

// Wanneer er op de cardlink van een gepland event wordt geklikt, dan wordt de "detailfinalevent.html" pagina geopend met de juiste informatie
$$(document).on('click', 'a.geplandEventCardLinks', function (e) {
  eventnummer = $$(this).attr("id");
  getDetailGeplandEvent();
});

// Toont de details van een gepland event in "detailfinalevent.html"
function getDetailGeplandEvent() {
  db.collection('Events').doc(eventnummer).get().then(function(doc) {
    var tlines = "";
    tlines += "<div class='block-title block-title-medium'>"
    + doc.data().Eventnaam + "</div><img src='"
    + doc.data().Img + "' id='vImg'> <div class='block block-strong inset'><p><b>Datum: </b>"
    // TODO: Events een Datum geven en deze op de volgende lijn plaatsen
    + "doc.data().Datum" + "</p><p><b>Moment van de dag: </b>"
    + doc.data().Tijdstip + "</p><p><b>Beschrijving: </b>"
    + doc.data().Beschrijving + "</p></div> <div class='card'><div class='card-header'>Deelnemers:</div><div class='card-content'><div class='list media-list'><ul id='deelnemersDetailGeplandEvent'>"
    + getDeelnemersGeplandEvent(doc.id); + "</ul></div></div></div>";
    
    $$("#detailGeplandEvent").append(tlines);
  })
}

// Zorgt ervoor dat alle deelnemers aan een gepland event worden opgelijst in "detailfinalevent.html"
function getDeelnemersGeplandEvent(event){
  db.collection('Events').doc(event).collection('Deelnemers').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      var tlines = "";
      tlines += "<li class='item-content'><div class='item-media'><img src='" 
      // TODO: Users een Img geven en deze als src opgeven voor <img> element
      + "https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" + "' width='44'/></div><div class='item-inner'><div class='item-title-row'><div class='item-title'>"
      + doc.data().Username + "</div></div></div></li>"

      $$("#deelnemersDetailGeplandEvent").append(tlines);
    });
  })
}

    //  #endregion GEPLAND

//  #endregion INDEX.HTML
var gecheckeddatum;
function getCheckedDate(){
  if (document.getElementById('date').checked) {
    gecheckeddatum = document.getElementById('date').value;
    return;
  }
  else{
    gecheckeddatum = "no date"
  }
}
// zet in firebase de datum en de id van de user 
function addDeelnemerForEvent(){
  getCheckedDate();
  db.collection('Events').doc(eventnummer).collection('Deelnemers').add({
    id: localStorage.getItem("UserID"),
    datum: gecheckeddatum
  });
  

}




var aantalPersoneel = 0;
function getAantalPersoneel(){

  if (aantalPersoneel == 0) {
    db.collection('Users').get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
      aantalPersoneel++;        
    }) 
    getListDatumAanduiden();
  }
  
    )}
    
}

// lijst van id's van voorstellen waar alle personeelleden data hebben aangeduidt

// datum aanduiden bij zaakvoerderspaneel lijst
function getListDatumAanduiden() {

  if (aantalPersoneel > 0) {
    db.collection('Events').where('AantalAanmeldingen' , '==', aantalPersoneel).get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
        var tlines = "";               
        db.collection('Events').get().then((snapshot)=>{
          snapshot.docs.forEach(doc => {              
           tlines += "<li><a href='/eventvoorstelwithdate/' class='item-link item-content' id=" +  doc.id + "><div class='item-inner'><div class='item-title'>"+ doc.data().Eventnaam + "</div></div></a></li>";      
    }) 
    $$("#datumaanduiden").html(tlines); 
    }
    )}
    
      )}
    )}
}
