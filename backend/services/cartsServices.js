const Cart = require('../database/Cart');

const returnItem = async (userId,title)=>{
    const item = await Cart.findOne({
        userId: userId,
        title: title
    });

    return item;
}

const updateItemQuantity = async(item)=>{
    await Cart.updateOne({title:item.title,userId: item.userId},
    {
        $set: {
            quantity: item.quantity+1,
            totalPrice: item.totalPrice+item.price
        }
    });
    return item;
}

const addNewItem = async(body)=>{
    let cartItem = new Cart({
        title:body.title,
        author:body.author,
        price:body.price,
        quantity:1,
        totalPrice:body.price,
        userId:body.userId,
        userEmail:body.userEmail
    });

    await cartItem.save();
}

const returnCartItems = async(id)=>{
    let items = await Cart.find({userId:id});
    return items;
}

const clearCart = async(id)=>{
    await Cart.deleteMany({ userId: id });
};

const clearCartModel = async()=>{
    await Cart.deleteMany({});
}

const deleteItem = async(userId,itemId)=>{
    await Cart.deleteOne({userId:userId,_id:itemId});
}

module.exports.returnItem = returnItem;
module.exports.updateItemQuantity = updateItemQuantity;
module.exports.addNewItem = addNewItem;
module.exports.returnCartItems = returnCartItems;
module.exports.clearCart = clearCart;
module.exports.clearCartModel = clearCartModel;
module.exports.deleteItem = deleteItem;