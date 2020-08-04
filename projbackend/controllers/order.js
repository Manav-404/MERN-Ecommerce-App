const {Order , ProductCart} = require("../models/order");


exports.getOrderById = (req,res,next , id)=>{
    Order.findById(id)
    .populate("products.product" , "name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                "error" : "Order not found"
            });
        }

        next();
    });
}

exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = req.body.order;
    order.save((err , order)=>{
        if(err){
            return res.status(400).json({
                "error" : "Order could not be processed"
            });
        }

        return res.json(order);
    });
}

exports.getAllOrders = (req,res)=>{
    Order.find()
    .populate("user" , "_id name")
    .exec((err ,orders)=>{
        if(err){
            return res.status(400).json({
                "error" : "No orders found"
            });
        }

        return res.json(orders);
    })
}

exports.getOrderStatus = (req,res)=>{
    return res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req,res)=>{

    Order.update(
        {_id :  req.body.order._id},
        {$set : {status : req.body.order.status} },
        (err , order)=>{
            if(err){
                return res.status(400).json({
                    "error" : "Failed to update the order."
                }); 
            }

            return res.json(order)
        }
    )


}