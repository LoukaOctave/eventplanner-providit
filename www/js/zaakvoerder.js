var $$ = Dom7;

// lists op zaakvoerderspaneel laden
$$(document).on('page:init', '.page[data-name="lijstvoorstellen"]', function (e) {
    getListHistory();
    getListAanvragen();
    getListRandomEvents();
    getListVoorstellen();
    getEvents();
    
  });


  // list van voorstellen history
function getListHistory() {    
    db.collection('Events').where('Status' , '==', "voorstelnodate").get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
        var tlines = "";          
        tlines += "<li><a href='#' class='item-content' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>checkmark_alt_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
        $$("#voorstellenhistory").append(tlines);       
    })
  }) 
  db.collection('Events').where('Status' , '==', "afgekeurd").get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {              
      var tlines = "";          
      tlines += "<li><a href='#' class='item-content' id=" + doc.id + "><div class='item-media'><i class='f7-icons'>multiply_circle</i></div><div class='item-inner'><div class='item-title'>" + doc.data().Eventnaam + "</div></div></a></li>";
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
  function getEvents(){
    var aantalDeelnemers;

    var tlines = ""; 
     
      db.collection('Events').where('Status' , '==', "gepland").get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {    
          tlines += "<li><a href='/eventvoorstelzaakvoerdergoedgekeurd/' class='voorstellinks' id=" + doc.id + ">" + doc.data().Eventnaam + "</a></li>";       
      })
      $$("#geplandeevents").html(tlines);  
         
    })  
  }


  /* Deze functie dient om wanneer de zaakvoerder op een eventvoorstel/aanvraag 
voor de zaakvoerder klikt dat 
alle gegevens van dit event worden weergegeven
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
      $$("#vURL").html(doc.data().URL);
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
        Datum: mogelijkeData[i]
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
            Datum: mogelijkeData[i]
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
  eventnummer = $$(this).attr("id");
  showRandomEventVoorstel();  
});
function showRandomEventVoorstel(){  
db.collection('Events').doc(eventnummer).collection('Data').get()
  .then((snapshot) => {
      snapshot.docs.forEach(doc => {    
        var alines = ""; 
        db.collection("Events").doc(eventnummer).collection("Deelnemers").get().then(snap => {
            aantalDeelnemers = snap.size;
            document.querySelector(".datumkiezenrandomevent").setAttribute("id",eventnummer);            
            alines = "Aantal aangemelden: " + aantalDeelnemers;
            $$("#aantalaangemelden").html(alines); 
         });         
        var tlines = "";          
        tlines += "<li>" + timestampToDate(doc.data().Datum) + "</li>";
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
    var aantalDeelnemers;
    
    db.collection("Events").doc(eventnummer).collection("Deelnemers").get().then(snap => {
        aantalDeelnemers = snap.size // will return the collection size
     });
  db.collection("Events").doc(eventnummer)
  .get()
  .then(function(doc) {        
    $$("#gInfo").html('<b>Info:</b> ' + doc.data().Beschrijving); 
    $$("#gEventnaam").html(doc.data().Eventnaam); 
    $$("#gTijdstip").html('<b>Tijdstip:</b> ' + doc.data().Tijdstip); 
    $$("#gDuur").html('<b>Duurtijd:</b> ' + doc.data().Duurtijd); 
    $$("#gLocatie").html('<b>Locatie:</b> ' + doc.data().Locatie); 
    $$("#gDeelnemers").html('<b>Aantal deelnemers:</b> ' + aantalDeelnemers + '/' + getAantalPersoneel()); 
    $$("#gURL").html('<b>URL:</b> ' + doc.data().URL); 
    document.getElementById("gImg").setAttribute("src", doc.data().Img);
    document.getElementById("gURL").setAttribute("href", doc.data().URL);
    document.querySelector('.datumkiezen').setAttribute("id", doc.id);

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


var aantalPersoneel = 0;
function getAantalPersoneel(){

  if (aantalPersoneel == 0) {
    db.collection('Users').get().then((snapshot)=>{
      snapshot.docs.forEach(doc => {              
      aantalPersoneel++;        
    }) 
  }
  
    )}
    return aantalPersoneel;
    
}



$$(document).on('click', 'button.datumkiezen', function (e) {
    eventnummer = $$(this).attr("id");
    async_function();
    });


var tlines = "";
var olines = "";


var aantalDeelnemersPerDate = [];
var dataid = [];
var data = [];
var datametdeelnemers = [];


//This function returns promise after 2 seconds 
var first_function = function() { 
  console.log("Entered first function"); 
  return new Promise(resolve => { 
      setTimeout(function() { 
        resolve("\t\t This is second promise");
        
// alle data krijgen en alle data id's krijgen en bijhouden in 2 arrays
db.collection('Events').doc(eventnummer).collection('Data').orderBy("Datum").get().then((snapshot)=>{
  snapshot.docs.forEach(doc1 => {              
    dataid.push(doc1.id);
    data.push(doc1.data().Datum);
    db.collection('Events').doc(eventnummer).collection('Data').doc(doc1.id).collection("Deelnemers").where("Aanwezig", "==", true).get().then(snap => {  
      var aantalDeelnemers = snap.size;
      aantalDeelnemersPerDate.push(aantalDeelnemers);  
      var deelnemersinfo = [];  
      db.collection('Events').doc(eventnummer).collection('Data').doc(doc1.id).collection("Deelnemers").where("Aanwezig", "==", true).get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
          deelnemersinfo.push(doc.id);        
          })
          datametdeelnemers.push(deelnemersinfo);
          })  
    });  
    }) 
})

      }, 500); 
  }); 
  }; 

  //This function executes returns promise after 4 seconds 
  var second_function = function() { 
    console.log("Entered second function"); 
    return new Promise(resolve => { 
        setTimeout(function() { 
          resolve("\t\t This is second promise");     
          datametdeelnemers.forEach(getsubarray);
          function getsubarray(item, index){
            datametdeelnemers[index].forEach(getsubarrayinfo);  
          }
          function getsubarrayinfo(item, index){
            datametdeelnemers.forEach(getsubarrayinfo);
            db.collection('Users').doc(datametdeelnemers[index][n]).get().then(doc => {  
              tlinesDeelnemers = "<div class='chip-media'><img src=" + doc.data().Img + "/></div><div class='chip-label'>" + doc.data().Username + "</div>";
              tlinesDeelnemersArray.push(tlinesDeelnemers); 
            }); 
          }

                           
        
        }, 500); 
    }); 
    }; 

  //This function executes returns promise after 4 seconds 
  var third_function = function() { 
  console.log("Entered third function"); 
  return new Promise(resolve => { 
      setTimeout(function() { 
        resolve("\t\t This is third promise");
        tlines = "";
        olines = "";
          dataid.forEach(addLines);       
        
        function addLines(item, index) { //  document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
        
          /* tlines += "<div class='block-title'>" + timestampToDate(data[index]) + "<br>Aantal deelnemers: " + aantalDeelnemersPerDate[index] + "</div><div class='block block-strong dateblock'><div class='chip'>" 
          + tlinesDeelnemersArray[index] + tlines4;          */  
            tlines += "<tr><td class='label-cell'>"+ timestampToDate(data[index]) +"</td><td class='numeric-cell'>"+ aantalDeelnemersPerDate[index] +" </td></tr>";
            olines += "<option value="+ dataid[index] +">" + timestampToDate(data[index]) + "</option>"            
        }
        $$("#tablebodyeventrespons").html(tlines);
        $$("#Finaledatum").html(olines);

      }, 500); 
  }); 
  }; 
  




  var async_function = async function() { 
  console.log('async function called'); 
    
  const first_promise= await first_function(); 
  console.log("After awaiting for 2 seconds," + 
  "the promise returned from first function is:"); 
  console.log(first_promise); 
    
/*   const second_promise= await second_function(); 
  console.log("After awaiting for 4 seconds, the" +  
  "promise returned from second function is:"); 
  console.log(second_promise);  */ 

  const third_promise = await third_function(); 
  console.log("After awaiting for 4 seconds, the" +  
  "promise returned from second function is:"); 
  console.log(third_promise);  
  } 
    

  function confirmfinalevent(){
    var finaledatum;
    var finaledatumid = document.getElementById("Finaledatum").value;
    var tijdstip = document.getElementById("tijdstipeventrespons").value;

    
    db.collection('Events').doc(eventnummer).collection('Data').doc(finaledatumid).update({
      Status: "final date"
    })

  db.collection('Events').doc(eventnummer).collection('Data').doc(finaledatumid).get().then(function(doc) {
    finaledatum = doc.data().Datum
    db.collection('Events').doc(eventnummer).update({      
      Datum: finaledatum,
      Status: "gepland",
      Startuur: tijdstip
    })
  })


}
$$(document).on('click', 'button.datumkiezenrandomevent', function (e) {
  eventnummer = $$(this).attr("id");
  async_function();
  });

function confirmfinalrandomevent(){
  var finaledatum;
  var finaledatumid = document.getElementById("Finaledatum").value;
  var tijdstip = document.getElementById("tijdstipeventrespons").value;

  
  db.collection('Events').doc(eventnummer).collection('Data').doc(finaledatumid).update({
    Status: "final date"
  })

db.collection('Events').doc(eventnummer).collection('Data').doc(finaledatumid).get().then(function(doc) {
  finaledatum = doc.data().Datum
  db.collection('Events').doc(eventnummer).update({      
    Datum: finaledatum,
    Startuur: tijdstip
  })
})



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
      db.collection('Events').doc(eventnummer).update({
        Eventnaam: document.getElementById("addeventnaam").value,
        Duurtijd: document.getElementById("addeventduurtijd").value,
        Beschrijving: document.getElementById("addeventbeschrijving").value,
        URL: document.getElementById("addeventurl").value,
        Locatie: document.getElementById("addeventlocatie").value,
        Img: downloadURL ,
        Status: "gepland",
        Organisator: user.uid
      });
      getListRandomEvents();
      getEvents();
      reloadHome();
    });
  });
  
}