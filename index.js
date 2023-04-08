const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
var cookieParser = require('cookie-parser')

dotenv.config();

// setting up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sailikithsai:likith1434@D@cluster0.gfjb6og.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("watchstore").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
  

// additional packages
app.use(cors());
app.use(express.json());

// apis
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe")
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

//controllers
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");

// html routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/home', productController.filteredProducts);
app.get('/home/:id', productController.productDetail);
app.get('/cart', cartController.getCart);

// styles
app.use(express.static(__dirname + '/public'));

//template engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running!");
});
