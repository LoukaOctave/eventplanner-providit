
var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element
  id: 'be.mikadebelder.F7Cordova', // App bundle ID
  name: 'Providit Planner', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for lijstvoorstellen section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
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
          datepicker();
        }
       

    }
  },
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
  app.dialog.alert(`Username: ${username} <br>Password: ${password}`); // nog checken of de <br> hier werkt
});

// Eigen code

function showLocation(position) {
  if(app.view.current.router.url == "/locatie/") {
    // success functie    
        
    $$("#locatieResultaat").html(
      `<p>Latitude: ${position.coords.latitude}</p><p>Longitude: ${position.coords.longitude}</p><p>Accuracy: ${position.coords.accuracy}m.</p><p>Timestamp: ${new Date(position.timestamp)}</p>`
    );
  }
}

function showStad(position){
  //hier nog check doen ofdat we op de juiste pagina zijn

  //opencagedata api call doen om te zien in welke stad de user currently is
  let apikey = "152b6c7186794c429226f66af076876b"; //zouden we in de php code moeten zetten en hier doen aanroepen
  let method = "json";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.opencagedata.com/geocode/v1/${method}?q=${lat}%2C${lon}&key=${apikey}&pretty=1`; //&pretty=1 for debugging

  fetch(url)
    .then(response => response.text()) //zelfde als function(response){ return response.text()} (.text geeft een resultaat terug, terwijl .json() een Promise of ReadableStreamobject teruggeeft)
    .then(function(responseData){
      console.log("Responsedata: " + responseData);
      let json = JSON.parse(responseData);
      $$("#stadResultaat").html(
        `Je bent in ${json.results[0].formatted} ${json.results[0].annotations.flag} test` 
        //in flag zit een unicode character van de flag, op android toont het een vlag, in de browser toont het 🇧🇪
      )
    })
    .catch(function(error){
      console.log("Error: " + error);
    });
}

function positionError(error) {
  console.log('Error occurred. Error code: ' + error.code);
  // error.code can be:
  //   0: unknown error
  //   1: permission denied
  //   2: position unavailable (error response from location provider)
  //   3: timed out
  switch(error.code){
      case 0:
          // unknown error
          app.dialog.alert('Onbekend probleem bij het bepalen van je positie. Zorg er voor dat de positiebepaling van je toestel actief is.', 'Positie probleem');
      case 1:
          // permission denied
          app.dialog.alert('Het spijt me, maar ik ga je moeten blijven pesten als je geen toestemming geeft om je positie te zien. Als je wilt, kan je de pagina herladen en eventueel de geschiedenis van je browser wissen. Het laatste uur is meer dan voldoende. <b>iPhone</b> : zorg er voor dat je locatie toestemming in het algemeen EN locatie toestemming aan Safari geeft.', 'Positie toelating probleem');
      case 2:
          // position unavailable (error response from location provider)
          app.dialog.alert('Je positie is niet beschikbaar. Zorg er voor dat de positiebepaling van je toestel actief is.', 'Positie niet beschikbaar');
      case 3:
          // timed out
          app.dialog.alert('Het duurt te lang om je positie te vinden. Zit je in een tunnel? Of zit je nog in de school? Op een heel aantal toestellen kan de positie sneller bepaald worden als je ook je wifi aanzet.', 'Positie timeout');
  }
};


// ---------- uitbreiding voorbeeld stap-4 gegevens ---------------- //

var apiAddress = "https://www.kinemaschepdaal.be/dev/testdb.php?"; //probeer met webmobile.kinemaschepdaal.be
var opties = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};
  
function getList() {
  // de data opvragen van de andere server (zie les 2)

  // body data type must match "Content-Type" header
  opties.body = JSON.stringify({
    format: "json",
    table: "producten",
    bewerking: "get"
  }); 

  // test de api
  fetch(apiAddress, opties)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData){
      // de verwerking van de data
      var list = responseData.data;

      if (list.length > 0) {
        // er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
        let tlines = "";
        for (let i = 0, len = list.length; i < len; i++) {
            tlines += `<div class='row'><span class='col'>${list[i].PR_naam}</span><span class='col'>${ list[i].prijs}</span><button onClick='sendAjax(${list[i].PR_ID});' class='button button-fill button-raised button-small color-orange col'>Verwijder</button></div>`;
        }

        $$("#pList").html(tlines);
      } else {
        app.dialog.alert("Producten konden niet opgevraagd worden");
      }

    })
    .catch(function(error) {
      // verwerk de fout
      app.dialog.alert("fout : " + error);
    });

  return true;
}

function sendAjax(id) {
  // fetch request opzetten om een item te verwijderen.
  // body data type must match "Content-Type" header
  opties.body = JSON.stringify({
    format: "json",
    table: "producten",
    bewerking: "delete",
    id: id
  });

  fetch(apiAddress, opties)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData){
      // de verwerking van de data
      app.dialog.alert("Die zien we nooit meer ... terug!", "Item verwijderd");
      // refresh de lijst
      getList();

    })
    .catch(function(error) {
      // verwerk de fout
      app.dialog.alert('POST failed. :' + errorThrown, "Item toegevoegd");
    });
}

function voegToe(){
  let cat = $$('input[name=categorie]:checked').val();
  // body data type must match "Content-Type" header
  opties.body = JSON.stringify({
    format: "json",
    table: "producten",
    bewerking: "add",
    PR_naam: $$("#PR_naam").val(),
    prijs:  $$("#prijs").val(),
    PR_CT_ID: (cat == "fruit" ? 1 : 2)
  });

  fetch(apiAddress, opties)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData){
      if(responseData.status === "fail") {
        app.dialog.alert("Sorry, probeer nog een keer met meer data ...", responseData.error);
      } else {
        app.dialog.alert("ok", "Product toegevoegd");
      }
      // refresh de lijst
      getList();
    })
    .catch(function(error) {
      // verwerk de fout
      app.dialog.alert('POST failed. :' + errorThrown, "Toevoegen is niet gelukt");
    });
}


// afstand tot brussel
// functie om de afstand tussen twee punten op een bol te berekenen
function haversine(lat1, lon1, lat2, lon2){
  Number.prototype.toRad = function() {
      return this * Math.PI / 180;
  } 
  
  var R = 6371; // km 
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 
  
  return d;
}

function toonAfstand(position) {
  if(app.view.current.router.url == "/locatie/") {
    // success functie
    var resultaat = 0;
    var latBrussel = 50.8504500; // Brussel Latitude: 50.8504500
    var lonBrussel = 4.3487800; // Brussel Longitude: 4.3487800
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    resultaat = haversine(lat, lon, latBrussel, lonBrussel);

    $$("#afstandResultaat").html(
      `<p>De afstand is ${resultaat}km</p>`
    );
  }
}

function openCamera(){
  if(app.view.current.router.url == "/locatie/") {
    // success functie
    // iets doen met de foto
  }
}

function onFail(message) {
  app.dialog.alert('Failed because: ' + message);
}

// login user
let apilogin = "https://www.kinemaschepdaal.be/dev/login.php?";
/*
let opties = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};*/

function getApiGebruiker() {
  // nog checken ofdat we op de login pagina zijn, anders mag deze functie niet uitgevoerd worden


  // een ONVEILIGE manier om gebruikersgegevens te testen
  
  let url = apilogin + "m=login";
  // onze php api verwacht een paar parameters
  // we voegen deze toe aan de body van de opties
  
  // body data type must match "Content-Type" header
  opties.body = JSON.stringify({
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
    format: "json"
  }); 
  
  // test de api
  fetch(url, opties)
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData){
      // test status van de response        
      if(responseData.status < 200 || responseData.status > 299) {
        // login faalde, boodschap weergeven
        // Hier kan je ook een groter onderscheid maken tussen de verschillende vormen van login falen.
        console.log("Login mislukt : deze naam/paswoord combinatie bestaat niet");
        // return, zodat de rest van de fetch niet verder uitgevoerd wordt
        return;
      }
      
      // de verwerking van de data
      var list = responseData.data;
      console.log(list);

      if (Object.keys(list).length > 0) {
        // list bevat minstens 1 property met waarde
        list.id = parseInt(list.id);   
        // alles wat via json komt, is standaard een string of een object.
        // hier is het omzetten naar een int wel niet nodig, omdat we er niet met gaan rekenen
        console.log("Gebruikersgevens ok : ID = " + list.id);
      } else {
        console.log("Login failed : this login/password combination does not exist");
      }

    })
    .catch(function(error) {
      // verwerk de fout
      console.log("fout: " + error);
    });
}


// Agenda detailEvent

var $$ = Dom7;
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