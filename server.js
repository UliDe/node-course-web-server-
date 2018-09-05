const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper ('currentYear', () => {
  return (new Date().getFullYear());
});
app.set ('view engine', 'hbs');
app.use (express.static(__dirname + '/static'));

app.use ((req, resp, next) => {
  var _now = new Date().toLocaleString();
  var _log = `${_now}: ${req.method} - ${req.path}`;
  console.log (_log);
  fs.appendFile('server.log', _log+'\n', (err) => {
    if (err)
      console.log (`Fehler beim Schreiben des Logfiles: ${err}`)
  });
  next();
});

app.use ((req, resp, next) => {
  resp.render ('page.hbs', {
    pageTitle: 'Wartungsmodus',
    msg: `Die Seite wird gerade gewartet. Bitte versuch\'s später nochmal.`
  });
  //console.log ('1st Middleware()');
  
});


app.get ('/', (req, res) => {
  res.render('page.hbs', {
    pageTitle: 'Homepage',
    msg: 'Willkommen auf der Startseite ...'
  });
});

app.get ('/about', (req, res) => {
  res.render('page.hbs', {
    pageTitle: 'About-Page',
    msg: 'Hier könnten Infos über die Site stehen ...'
  });
});


app.listen(3000, () => {console.log ('Server ist up & listening @port 3000')});
