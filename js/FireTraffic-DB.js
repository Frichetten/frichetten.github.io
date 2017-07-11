function writeUserData(ip, city, country, time) {
  path = String(window.location.pathname);
  if (path == "/") { path = "home"; }
  firebase.database().ref('/'+path+'/'+String(new Date())).set({
    ip: ip,
    city: city,
    country: country,
    time: time
  });
};

$.ajax({
  url:        'http://ip-api.com/json?callback=?',
  dataType:   "json", 
  success:    function(data){
    info = JSON.stringify(data, null, 2);	
    d = JSON.parse(info);
    writeUserData(d['query'],d['city'],d['country'],String(new Date()));
  }
});
