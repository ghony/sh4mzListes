var express = require('express');
var session = require('cookie-session'); // sessions
var bodyParser = require('body-parser'); // gestion params
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

//static
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({secret: 'sh4mzListe'}))

// si pas de liste, on crée en crée une sous forme d'array[] 
.use(function(req, res, next){
    if (typeof(req.session.liste) == 'undefined') {
        req.session.liste = [];
    }
    next();
})

// on affiche liste et formulaire
.get('/liste', function(req, res) { 
    res.render('liste.ejs', {liste: req.session.liste});
})




// ajoute d'item
.post('/liste/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newliste != '') {
        req.session.liste.push(req.body.newliste);
    }
    res.redirect('/liste');
})

// suppresion d'item
.get('/liste/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.liste.splice(req.params.id, 1);
    }
    res.redirect('/liste');
})



// 404 ..
.use(function(req, res, next){
    res.redirect('/liste');
})


.listen(8080);
