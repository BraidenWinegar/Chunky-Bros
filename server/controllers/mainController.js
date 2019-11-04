
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
        const {user_id} = req.params;
        const db = req.app.get('db');
        let order = await db.add_order(user_id)
        res.status(200).send(order);
    },

    getOrder: async (req, res) => {
        const {orderId} = req.params;
        const db = req.app.get('db');
        let order = await db.get_orders(orderId);
        res.status(200).send(order)
    },

    addItem: async (req, res) => {
        const {order_id, item_id} = req.body;
        const db = req.app.get('db');
        foundItem = await db.check_item(order_id, item_id);
        if(foundItem){
            const data = await db.increment_item();
            res.status(200).send(data)
        } else {
            const data = await db.add_item(
                order_id, item_id, foundItem.quantity+1
                );
            res.status(200).send(data)
        }
    },

    removeItem: async (req, res) => {
        const {order_id, item_id, quantity} = req.body;
        const db = req.app.get('db');
        if (quantity === 1) {
            data = await db.removeItem(order_id, item_id)
            res.status(200).send(data)
        } else {
            data = await db.set_item_quantity(
                order_id, item_id, quantity -1);
            res.status(200).send(data)
        }
    },

}