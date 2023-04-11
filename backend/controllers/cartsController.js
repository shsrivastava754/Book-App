const Cart = require('../database/Cart');

const addToCart = async(req,res)=>{
    let cartItem;

    try {

        const item = await Cart.findOne({
            userId: req.body.userId,
            title: req.body.title
        });


        if(item){
            // increase the quantity by the quantity of req.body.quantity
                await Cart.updateOne({title:item.title,userId: req.body.userId},
                {
                    $set: {
                        quantity: item.quantity+1,
                        totalPrice: item.totalPrice+item.price
                    }
                });
                cartItem = item;
        } else {
            cartItem = new Cart({
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                quantity:1,
                totalPrice: req.body.price,
                userId: req.body.userId,
                userEmail: req.body.userEmail
            });

            await cartItem.save();
        }
    } catch (error) {
        console.log(error);
    }

    if(!cartItem){
        return res.status(500).json({message:"Not added to cart"});
    }

    return res.status(201).json({cartItem});
}

const getCartItems = async (req,res)=>{
    let items;
    try {
        items = await Cart.find({userId:req.body.id});
    } catch (err) {
        console.log(err);
    }

    if(!items){
        return res.status(400).json({message:"No cart items"});
    }

    return res.status(200).json({items});
}

const clearCart = async(req,res)=>{
    await Cart.deleteMany({ userId: req.body.userId });
    return res.status(400).json({message:"Deleted cart items"});
};

const clearCartModel = async(req,res)=>{
    await Cart.deleteMany({});
    return res.status(400).json({message:"Deleted cart model items"});
}

module.exports.addToCart = addToCart;
module.exports.getCartItems = getCartItems;
module.exports.clearCart = clearCart;
module.exports.clearCartModel = clearCartModel;