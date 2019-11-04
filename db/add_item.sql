Insert Into item_list (
    order_id,
    item_id,
    quantity
) Values (
    $1, 
    $2, 
    1
);

select * from item_list;