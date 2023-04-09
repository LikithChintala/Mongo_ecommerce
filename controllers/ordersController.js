const orderModel = require('../models/Order');
const cartModel = require("../models/Cart");
const productModel = require("../models/Product");

module.exports= {
    orders: async (req, res) => {

        try {
            const orders = await orderModel.find({ userId: req.cookies.user && req.cookies.user._id });
            let finalOrders = [];
            if (orders.length > 0) {
                for(let j=0; j< orders.length; j++) {
                    let products = [];
                    for (let i = 0; i < orders[j].products.length; i++) {
                        const product = await productModel.findByIdAndUpdate(
                            orders[j].products[i].productId,
                            {
                                $set: req.body,
                            },
                            {new: true}
                        );
                        if (product) {
                            products.push(product);
                        }
                    }
                    finalOrders.push({
                        "userId": orders[j].userId,
                        "amount": orders[j].amount,
                        address: orders[j].address,
                        products: products,
                        status: orders[j].status,
                    });
                }
            }
            res.render('orders.ejs', {orders: finalOrders});

          } catch (err) {
            res.status(500).json(err);
          }

    },

     createOrder: async (req, res) => {
         let userId = req.cookies.user && req.cookies.user._id;
         if (req.body.userId) {
             userId = req.body.userId;
         }
         const items = await cartModel.find({
             _id: req.body.cart
         });
         const payload = {
             "userId": userId,
             "products": items[0].products,
             "amount": 1000,
             address: {
                 "text": req.body.address,
                 "city": req.body.city,
                 "state": req.body.state,
                 "zip": req.body.zip,
             },
         }
         let  order = new orderModel(payload);
         try {
             const savedOrder = await order.save();
             await cartModel.findByIdAndDelete(req.body.cart);
             res.redirect('/orders');
         } catch (err) {
             res.status(500).json(err);
         }
    },

    // getOrders : async(req,res) =>{
    //     try {
    //         const orders = await orderModel.find({ userId: req.params.userId });
    //         res.status(200).json(orders);
    //         res.render('orders.ejs', {orders: orders});

    //       } catch (err) {
    //         res.status(500).json(err);
    //       }
    // }

// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//
// //GET PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
}



