<?php
/*
  "Life begins on the other side of despair."
  --- Jean Paul Sartre
*/

require_once 'butler.php';

/*
  add relationships to user_industries if they are already defined in user_companies
 */
function userCompanyToUserIndustry($user)
{
    $companies = json_decode(getCompanies($user));
    
    $companyIds = $companies->{'ids'};

    

}

/*
  $user is an int, $industry is an int
 */
function userIndustryExists($user,$industry)
{
    $query  = "select count(id) from user_industries ";
    $query .= " where industry = $industry and user = $user";
    return reset(returnStuff($query));
}


function usernameExists($username)
{
    $query = "select count(id) from users where name=\"$username\"";
    $count = reset(returnStuff($query));
    if ($count > 0)
        return true;
    return false;
}



function companyIdExists($companyName)
{
    $query  = "select count(id) from companies ";
    $query .= "where name=\"$companyName\"";
    return reset(returnStuff($query));
}



function locationExists($locationName)
{
    $query  = "select count(id) from locations where name=\"$locationName\"";
    $count = reset(returnStuff($query));
    if ( $count > 0 )
        return true;
    else
        return false;
}


function userLocationExists ($user,$locationId)
{
    $query  = "select count(id) from user_locations ";
    $query .= "where location=$locationId and user=$user";
    return reset(returnStuff($query));
}



?>