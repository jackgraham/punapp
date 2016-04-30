var express = require('express');
var mongo = require('mongodb' );
var mongoose = require('mongoose' );
mongoose.connect ('mongodb://localhost/hackdb');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET about page. */ 
router.get('/about', function(req, res,next) { 
     res.render('about', { title: 'Express' }); 
});

router.get('/add', function(req, res ) { 
     res.render('addProduct.ejs'); 
});

var productSchema = new mongoose.Schema({
prdId: String,
Name: { type: String},
Price: Number
});

var Product = mongoose.model('Product',productSchema);

router.post('/new', function(req, res){
  new Product({    
	prdId : req.body.ProductId,    
	Name  : req.body.ProductName,    
	Price   : req.body.ProductPrice
  }).save(function(err, prd){
      if(err) res.json(err);   
      else    res.send("Product Successfully Added !"); 
 });
});

router.get('/viewall', function(req,res) {
    Product.find({}, function(err, prds) {
    console.log("\nProducts !");
    console.log(prds); 
    renderResult(res, prds, "Product List from MongoDB :");
});});

function renderResult(res, prds, msg) {  res.render('display.ejs', {message:msg, products:prds},    function(err, result) {    
  if (!err) {res.end(result);}     
 else {res.end('Oops ! An error occurred.');        console.log(err);}
});}


module.exports = router;
