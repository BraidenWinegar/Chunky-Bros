Select i.quantity, o.order_id, m.item_name, m.item_id, m.price
From item_lists i
Join orders o On o.order_id = i.order_id
Join menu m On m.item_id = i.item_id
Where o.order_id = $1;

