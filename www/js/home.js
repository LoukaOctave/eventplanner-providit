var $$ = Dom7;

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
    var aangemeld;
    db.collection('Events').where('Status', '==', "voorstelnodate").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
  
        // check of gebruiker is aangemeld
        db.collection('Events').doc(doc.id).collection('Deelnemers').doc(localStorage.getItem("userID")).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            aangemeld = "aangemeld";
          } else {
            aangemeld = "nog niet aangemeld";
          }
          var DeadlineToTimestamp = new Date((doc.data().Deadline).seconds*1000).toLocaleDateString();
        
        var tlines = "";
        tlines += "<div class='card demo-card-header-pic'><a class ='voorstelNoDateEventCardLinks' id ='"
        + doc.id + "' href='/detailevent/'><div style='background-image: url("
        + doc.data().Img + ")' class='card-header align-items-flex-end'>"
        + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>Aanmelden tot "
        + DeadlineToTimestamp + "</p></div><div class='card-footer'><a href='/detailevent/' class='voorstelNoDateEventCardLinks' id ='"
        + doc.id + "'>"
        + aangemeld + "</a></div></a></div>";
          
        $$("#voorstelNoDateEvent").append(tlines);
      });
  
        
      })
    })
  }
  
  // Detail voorstelnodate wanneer je op een cardlink klikt
  $$(document).on('click', 'a.voorstelNoDateEventCardLinks', function (e) {
    eventnummer = $$(this).attr("id");
    db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(localStorage.getItem("userID")).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            aangemeld = "aangemeld";
            $$("#list_whenaangemeld").show();
            $$("#detailEdit").show();
            $$("#titel_detail").hide();
            $$("#list_detail").hide();
            $$("#detailSubmit").hide();
            $$("#detailAfkeuren").hide();
            getDatesAangemeldAndNot();
          } else {
            $$("#list_whenaangemeld").hide();
            $$("#titel_detail").show();
            $$("#detailEdit").hide();
            $$("#list_detail").show();
            $$("#detailSubmit").show();
            $$("#detailAfkeuren").show();
            getDatesDetailVoorstelNoDateEvent();
          }
          
      });
    getDetailVoorstelNoDateEvent();
  });
  
  
  // wannneer iemand die al aangemeld was bij een voorstelnodate op edit klikt wordt deze functie geactiveerd om de data te laten zien
  function showEditDates(){
    $$("#list_whenaangemeld").hide();
    $$("#titel_detail").show();
    $$("#detailEdit").hide();
    $$("#list_detail").show();
    $$("#detailSubmit").show();
    $$("#detailAfkeuren").hide();
    getDatesDetailVoorstelNoDateEvent();
  
    db.collection('Events').doc(eventnummer).collection("Data").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
  
        // check of gebruiker is aangemeld
        db.collection('Events').doc(eventnummer).collection('Data').doc(doc.id).collection("Deelnemers").doc(userID).get()
        .then((doc) => {
          if (doc.data().Aanwezig == true) {
            document.getElementById(doc.data().Date).checked = true;
          } else {
            document.getElementById(doc.data().Date).checked = false;
          }
      });
  
        
      })
    })
  
  }
  
  // Details tonen van event met status "voorstelnodate"
  function getDetailVoorstelNoDateEvent() {
    db.collection('Events').doc(eventnummer).get().then(function(doc) {
      if (doc.data().Duurtijd){
        var tlines = "";
        tlines += "<div class='page-content'><div class='block-title block-title-medium'>"
        + doc.data().Eventnaam + "</div><img src='"
        + doc.data().Img + "' id='vImg'> <div class='block block-strong inset'><p><b>Duurtijd: </b>"
        + doc.data().Duurtijd + " uur</p><p><b>Moment van de dag: </b>"
        + doc.data().Tijdstip + "</p><p><b>Beschrijving: </b>"
        + doc.data().Beschrijving + "</p></div>";
      } else {
        var tlines = "";
        tlines += "<div class='page-content'><div class='block-title block-title-medium'>"
        + doc.data().Eventnaam + "</div><img src='"
        + doc.data().Img + "' id='vImg'> ";
      }
      
  
      $$("#detailVoorstelNoDateEvent").html(tlines);
      
    })
  }
  
  
  
  
  
      //  #endregion VOORSTELNODATE

          //  #region VOORSTELNOEVENT

// Events met "voorstelnoevent" als status ophalen en zetten onder "Datum kiezen..."
function getListVoorstelNoEventEvents() {
    db.collection('Events').where('Status', '==', "voorstelnoevent").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        // check of gebruiker is aangemeld
        db.collection('Events').doc(doc.id).collection('Deelnemers').doc(localStorage.getItem("userID")).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            aangemeld = "aangemeld";
          } else {
            aangemeld = "nog niet aangemeld";
          }
          var DeadlineToTimestamp = new Date((doc.data().Deadline).seconds*1000).toLocaleDateString();
        
        var tlines = "";
        tlines += "<div class='card demo-card-header-pic'><a class ='voorstelNoDateEventCardLinks' id ='"
        + doc.id + "' href='/detailevent/'><div style='background-image: url("
        + doc.data().Img + ")' class='card-header align-items-flex-end'>"
        + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>Aanmelden tot "
        + DeadlineToTimestamp + "</p></div><div class='card-footer'><a href='/detailevent/' class='voorstelNoDateEventCardLinks' id ='"
        + doc.id + "'>"
        + aangemeld + "</a></div></a></div>";
        $$("#voorstelNoDateEvent").append(tlines);
      });
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
        + doc.id + "' href='/detailfinalevent/'><div style='background-image: url("
        + doc.data().Img + ")' class='card-header align-items-flex-end'>"
        + doc.data().Eventnaam + "</div><div class='card-content card-content-padding'><p class='date'>"
        + timestampToDate(doc.data().Datum) + "</p></div><div class='card-footer'><a href='/detailfinalevent/' class='geplandEventCardLinks' id ='"
        + doc.id + "'>"
        + "ok" + "</a></div></a></div>";
  
        $$("#geplandEvent").append(tlines);
        })
      })
  }

 // toggle aanwezigfinaal of niet
  function setAanwezigfinaal(){
    var toggle = app.toggle.get('.toggle');
    if(toggle.checked){
      db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(userID).update({
        AanwezigFinaal: true
      })
    }
    if(!toggle.checked){
      db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(userID).update({
        AanwezigFinaal: false
      })
    }
  }
 // toggle set aanwezig
  function toggleaanwezigset(){
    db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(userID).get().then(function(doc) {
      if (doc.data().AanwezigFinaal == true) {
        app.toggle.get('#toggle').checked = true;
    } else {
        app.toggle.get('#toggle').checked = false;
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  }
  // Wanneer er op de cardlink van een gepland event wordt geklikt, dan wordt de "detailfinalevent.html" pagina geopend met de juiste informatie
  $$(document).on('click', 'a.geplandEventCardLinks', function (e) {
    eventnummer = $$(this).attr("id");
    getDetailGeplandEvent();
    toggleaanwezigset();
  });
  
  // Toont de details van een gepland event in "detailfinalevent.html"
  function getDetailGeplandEvent() {
    db.collection('Events').doc(eventnummer).get().then(function(doc) {
      var tlines = "";
      tlines += "<div class='block-title block-title-medium'>"
      + doc.data().Eventnaam + "</div><img src='"
      + doc.data().Img + "' id='vImg'> <div class='block block-strong inset'><p><b>Datum: </b>"
      + timestampToDate(doc.data().Datum) + "</p><p><b>Startuur: </b>"
      + doc.data().Startuur + "</p><p><b>Duurtijd: </b>"
      + doc.data().Duurtijd + " uur</p><p><b>Beschrijving: </b>"
      + doc.data().Beschrijving + "</p></div> <div class='card'><div class='card-header'>Deelnemers:</div><div class='card-content'><div class='list media-list'><ul id='deelnemersDetailGeplandEvent'>"
      + getDeelnemersGeplandEvent(doc.id); + "</ul></div></div></div>"
      
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

function timestampToDate(datum){
  var ts = datum;
        var ts_ms = ts * 1000;
        var date_ob = new Date(ts_ms);
        var year = date_ob.getFullYear();
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var date = ("0" + date_ob.getDate()).slice(-2);
        fulldate = date + "/" + month;
        return fulldate;
}
function DeadlineToTimestamp(datum){
 var date = new Date(datum.seconds*1000).toLocaleDateString();
 return date;
}


  //  #region DETAILEVENT.HTML
// Datum van "voorstelnodate" tonen in checkboxes
function getDatesDetailVoorstelNoDateEvent(){
    db.collection('Events').doc(eventnummer).collection('Data').orderBy('Datum').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {  
        var tlines = "";
        tlines += "<li><label class='item-checkbox item-content'><input type='checkbox' name='checkbox-date' value='Date'id="+ doc.id +" /><i class='icon icon-checkbox'></i><div class='item-inner'><div class='item-title'>"
        + timestampToDate(doc.data().Datum) + "</div></div></label></li>";
        $$("#getDateCheckbox").append(tlines);
      })
    })
  }

  // wanneer een gebruiker zich al heeft aangemeld om de data te laten zien waarop ze zijn aangemeld en waarop niet
function getDatesAangemeldAndNot(){

  db.collection('Events').doc(eventnummer).collection('Data').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      // get aangemelde data
      db.collection('Events').doc(eventnummer).collection('Data').doc(doc.id).collection('Deelnemers').where('Id' , '==', userID).where('Aanwezig' , '==', true).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          db.collection('Events').doc(eventnummer).collection('Data').doc(doc.data().Date).get().then(function(doc) {
          var tlines = "";               
          tlines += "<li>" + timestampToDate(doc.data().Datum) + "</li>";
          $$("#dataAangemeld").append(tlines);        
        })
        })
        
      })
      // get afgemelde data
      db.collection('Events').doc(eventnummer).collection('Data').doc(doc.id).collection('Deelnemers').where('Id' , '==', userID).where('Aanwezig' , '==', false).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          db.collection('Events').doc(eventnummer).collection('Data').doc(doc.data().Date).get().then(function(doc) {  
            var tlines = "";           
            tlines += "<li>" + timestampToDate(doc.data().Datum) + "</li>";
            $$("#dataAfgemeld").append(tlines);        
          })
        })
      })

    })
  })
  
}

  // aangemelde data laten zien
function showAangemeldedata(){

  for (i = 0; i < aangemeldedata.length; i++) {
    db.collection('Events').doc(eventnummer).collection('Data').doc(aangemeldedata[i]).get().then(function(doc) {
      var tlines = "";               
      tlines += "<li>" + timestampToDate(doc.data().Datum) + "</li>";
      $$("#dataAangemeld").append(tlines);        
    })
  }
}
    
var gechecktedata = [];
var ungechecktedata = [];
function getCheckedDates() {
  gechecktedata = [];
  var checkboxdate = document.forms[0];
  var i;
  for (i = 0; i < checkboxdate.length; i++) {
    if (checkboxdate[i].checked) {
      gechecktedata.push(checkboxdate[i].id)
    }
    if (checkboxdate[i].checked == false) {
      ungechecktedata.push(checkboxdate[i].id)
    }
  }
}
    
// zet in firebase de Datum en de id van de user 
function addDeelnemerForEvent(){

  getCheckedDates();
  for (i = 0; i < gechecktedata.length; i++) {
    db.collection('Events').doc(eventnummer).collection('Data').doc(gechecktedata[i]).collection("Deelnemers").doc(localStorage.getItem("userID")).set({
      Id: localStorage.getItem("userID"),
      Aanwezig: true,
      Date: gechecktedata[i]
    })
  }
  for (i = 0; i < ungechecktedata.length; i++) {
    db.collection('Events').doc(eventnummer).collection('Data').doc(ungechecktedata[i]).collection("Deelnemers").doc(localStorage.getItem("userID")).set({
      Id: localStorage.getItem("userID"),
      Aanwezig: false,
      Date: ungechecktedata[i]
    })
  }
  db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(localStorage.getItem("userID")).set({
    Id: localStorage.getItem("userID"),
    Aangemeld: true
  })

}
//  Niet deelnemen aan detailevent

function showNietDeelnemen(){
  
   
  db.collection('Events').doc(eventnummer).collection('Deelnemers').doc(localStorage.getItem("userID")).set({
    Id: localStorage.getItem("userID"),
    Aangemeld: true,
    Status: "niet aanwezig"
  })
  getCheckedDates();
  for (i = 0; i < ungechecktedata.length; i++) {
    db.collection('Events').doc(eventnummer).collection('Data').doc(ungechecktedata[i]).collection("Deelnemers").doc(localStorage.getItem("userID")).set({
      Id: localStorage.getItem("userID"),
      Aanwezig: false,
      Date: ungechecktedata[i]
    })
  }
  
}

//  #endregion DETAILEVENT.HTML