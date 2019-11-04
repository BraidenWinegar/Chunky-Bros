Update item_id 
Set quantity=$3
Where order_id =$1, item_id=$2;

select * from item_list
where order_id=$1 and item_id=$2;