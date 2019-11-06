delete From item_lists
Where order_id = $1 and item_id = $2;

Select i.quantitiy, o.order_id, m.item_name
From item_lists i
Join orders o On o.order_id = i.order_id
Join menu m On m.item_id = i.item_id
Where o.order_id = $1;


