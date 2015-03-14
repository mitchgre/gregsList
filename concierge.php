<?php
/*
  This file will validate guests according to username and passwords.
 */

require 'engineer.php';


function getUserId($username)
{
    $query = "select id from users where name=\"$username\"";
    $userId = reset(returnStuff($query));
    return $userId;
}

function getPass($userId)
{
    $query  = "select pass.word from pass ";
    $query .= "inner join users on users.id=pass.user ";
    $query .= "where users.id=$userId";
    $pass = reset(returnStuff($query));
    return $pass;

}

function usernameExists($username)
{
    
}



?>