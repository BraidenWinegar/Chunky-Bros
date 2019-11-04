CREATE TABLE users (
    user_id serial PRIMARY KEY NOT NULL,
    username varchar(70) NOT NULL, 
    email varchar(200), 
    password varchar(250),
    phone_number int,
    award_points int,
    last_location int
);

CREATE TABLE menu (
    item_id serial PRIMARY KEY NOT NULL,
    item_name varchar(50) NOT NULL,
    price int,
    picture_url varchar (280)
);

CREATE TABLE orders (
order_id serial PRIMARY KEY,
user_id int
);

CREATE TABLE item_lists (
order_id int,
item_id int,
quantitiy int);