const Cart = require('../database/Cart');

const addToCart = async(req,res)=>{
    let cartItem;

    try {
        const item = await Cart.findOne({title:req.body.title});
        if(item){
            // increase the quantity by the quantity of req.body.quantity
                await Cart.updateOne({title:item.title},
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
                totalPrice: req.body.price
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
        items = await Cart.find();
    } catch (err) {
        console.log(err);
    }

    if(!items){
        return res.status(400).json({message:"No cart items"});
    }

    return res.status(200).json({items});
}

// const getTotalPrice = async(req,res)=>{
//     "total" : {
//             $sum : "$quantity"
//         }
// }

module.exports.addToCart = addToCart;
module.exports.getCartItems = getCartItems;