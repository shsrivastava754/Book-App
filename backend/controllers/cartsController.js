const Cart = require('../database/Cart');
const cartsServices = require('../services/cartsServices');

const addToCart = async(req,res)=>{
    let cartItem;
    try {
        const item = await cartsServices.returnItem(req.body.userId,req.body.title)
        if(item){
                cartItem = cartsServices.updateItemQuantity(item);
        } else {
            await cartsServices.addNewItem(req.body);
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
        items = await cartsServices.returnCartItems(req.body.id);
    } catch (err) {
        console.log(err);
    }

    if(!items){
        return res.status(400).json({message:"No cart items"});
    }

    return res.status(200).json({items});
}

const clearCart = async(req,res)=>{
    await cartsServices.clearCart(req.body.userId);
    return res.status(400).json({message:"Deleted cart items"});
};

const clearCartModel = async(req,res)=>{
    await cartsServices.clearCartModel();
    return res.status(201).json({message:"Deleted cart model items"});
}

const deleteItem = async (req,res)=>{
    try {
        await cartsServices.deleteItem(req.params.userId,req.params.itemId);
        return res.status(201).json({message:"Deleted cart model item"});
    } catch (error) {
        console.log(error);
    }
}

module.exports.addToCart = addToCart;
module.exports.getCartItems = getCartItems;
module.exports.clearCart = clearCart;
module.exports.clearCartModel = clearCartModel;
module.exports.deleteItem = deleteItem;