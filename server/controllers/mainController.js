
module.exports = {
    getMenu: async(req, res) => {
        const db = req.app.get('db')
        const menu = await db.get_menu()
        .then(data =>{
            res.status(200).send(data)
        })
    },

    getItem: async (req, res) => {
        const {item_id} = req.params;
        const db = req.app.get('db');
        let item = await db.get_item(item_id);
        item = item[0];
        res.status(200).send(item);
    },

    addOrder: async (req, res) => {
        console.log('hit addOrder')
        const {user_id} = req.params;
        const db = req.app.get('db');
        let order_id = await db.add_order(user_id)
        let order = await db.get_orders(order_id[0].order_id)
        res.status(200).send({order_id, order});
    },

    addOrderAndItem: async (req, res) => {
        const {user_id, item_id} = req.body;
        console.log(user_id, item_id)

        const db = req.app.get('db');

        console.log(db.add_order)
        let order_id = await db.add_order(user_id)
        console.log(order_id)

        const data = await db.add_item(order_id[0].order_id, item_id);
        res.status(200).send(data)
    
     },

    getOrder: async (req, res) => {
        const {order_id} = req.params;
        const db = req.app.get('db');
        let order = await db.get_orders(order_id);
        res.status(200).send(order)
    },

    addItem: async (req, res) => {
        const {order_id, item_id} = req.body;
        const db = req.app.get('db');
        console.log(order_id, item_id)
        foundItem = await db.check_item(order_id, item_id);
        console.log("foundItem", foundItem[0] )
        if(foundItem[0] === undefined){
            console.log('item is lost')
            const data = await db.add_item(order_id, item_id);
            res.status(200).send(data)
        } else {
            console.log('item found', foundItem)
            const data = await db.set_item_quantity(
                order_id, item_id, foundItem[0].quantity + 1
                );
            res.status(200).send(data)
        }
    },

    removeItem: async (req, res) => {
        const {order_id, item_id} = req.body;
        const db = req.app.get('db');
        foundItem = await db.check_item(order_id, item_id);

        if (foundItem[0].quantity === 1) {
            data = await db.remove_item(order_id, item_id)
            res.status(200).send(data)
        } else {
            data = await db.set_item_quantity(
                order_id, item_id, foundItem[0].quantity - 1 
                );
            res.status(200).send(data)
        }
    },
}