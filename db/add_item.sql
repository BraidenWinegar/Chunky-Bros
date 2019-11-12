Insert Into item_lists (
    order_id,
    item_id,
    quantity
) Values (
    $1, 
    $2, 
    1
) returning *;

-- select * from item_lists
-- where order_id=$1 and item_id=$2;