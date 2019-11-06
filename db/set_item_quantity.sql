Update item_lists
Set quantity=$3
Where order_id =$1 and item_id=$2;

select * from item_lists
where order_id=$1 and item_id=$2;