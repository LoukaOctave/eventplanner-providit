
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  {
    path: '/lijstvoorstellen/',
    componentUrl: './pages/lijstvoorstellen.html',
  },
  {
    path: '/product/:id/',
    componentUrl: './pages/product.html',
  },
  {
    path: '/eventvoorstel/',
    url: './pages/eventvoorstel.html',
  },
  {
    path: '/eventvoorstelzaakvoerder/',
    url: './pages/eventvoorstelzaakvoerder.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  {
    path: '/voorsteldatepicker/',
    url: './pages/voorsteldatepicker.html',
    name: 'voorsteldatepicker'
  },
  {
    path: '/createEvent/',
    url: './pages/createEvent.html',
    name: 'createEvent'
  },
  {
    path: '/myevents/',
    url: './pages/myevents.html',
    name: 'myevents'
  },
  {
    path: '/detailevent/',
    url: './pages/detailevent.html',
    name: 'detailevent'
  },
  {
    path: '/detailfinalevent/',
    url: './pages/detailfinalevent.html',
    name: 'detailfinalevent'
  },
  {
    path: '/editevent/',
    url: './pages/editevent.html',
    name: 'editevent'
  },
  {
    path: '/eventvoorstelwithdate/',
    url: './pages/eventvoorstelwithdate.html',
    name: 'eventvoorstelwithdate'
  },
  {
    path: '/eventrespons/',
    url: './pages/eventrespons.html',
    name: 'eventrespons'
  },
  {
    path: '/detaileventdate/',
    url: './pages/detaileventdate.html',
    name: 'detaileventdate'
  },
  {
    path: '/voorstelrandomevent/',
    url: './pages/voorstelrandomevent.html',
    name: 'voorstelrandomevent'
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/dynamic-route.html',
  },
  
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '/locatie/',
    componentUrl: './pages/locatie.html',
  },
  {
    path: '/gegevens/',
    componentUrl: './pages/gegevens.html',
  },
  {
    path: '/login/',
    componentUrl: './pages/login.html',
  },
  //{
    //path: '/gegevens/:id/',
    //componentUrl: './pages/product.html',
  //},
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
