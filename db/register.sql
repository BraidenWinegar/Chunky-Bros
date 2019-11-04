Insert Into users (
    username, 
    email, 
    password, 
    phone_number,
    award_points, 
    last_location
) values (
    $1, 
    $2, 
    $3, 
    $4,
    0, 
    null
) returning *;
