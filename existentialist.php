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



function companyNameExists($companyName)
{
    $query  = "select count(id) from companies ";
    $query .= "where name=\"$companyName\"";

    $count = reset(returnStuff($query));

    if ( $count > 0 )
        return 1;
    return 0;
}


function companyIdExists($companyId)
{
    $query  = "select count(id) from companies where id = $companyId ";
    $count = reset(returnStuff($query));
    if ( $count > 0 )
        return 1;
    else
        return 0;
}



function userCompanyIdExists($user,$companyId)
{
    $query  = "select count(id) from user_companies ";
    $query .= "where company = $companyId";
    $query .= "and user = $user";

    $count = reset(returnStuff($query));

    if ( $count > 0 )
        return true;
    return false;
}


function locationIdExists($locationId)
{
    $query  = "select count(id) from locations where id = $locationId ";
    $count = reset(returnStuff($query));
    if ( $count > 0 )
        return true;
    else
        return false;
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
    $count =  reset(returnStuff($query));

    if ( $count > 0 )
        return true;
    else
        return false;

}

function countUsersTrackingLocationId($locationId)
{
    $query  = "select count(id) from user_locations ";
    $query .= "where location=$locationId";
    return reset(returnStuff($query));
}


function getContactIdFromValues($fname,$lname,$email,$phone,$facebook,$linkedin,$github)
{
    $query  = "select id from contacts ";
    $query .= "where fname = \"$fname\" ";
    $query .= "and lname = \"$lname\" ";
    $query .= "and email = \"$email\" ";
    $query .= "and phone = \"$phone\" ";
    $query .= "and facebook = \"$facebook\" ";
    $query .= "and linkedin = \"$linkedin\" ";
    $query .= "and github = \"$github\" ";

    return reset(returnStuff($query));
}

function contactExists($fname,$lname,$email,$phone,$facebook,$linkedin,$github)
{
    $query  = "select count(id) from contacts ";
    $query .= "where fname = \"$fname\" ";
    $query .= "and lname = \"$lname\" ";
    $query .= "and email = \"$email\" ";
    $query .= "and phone = \"$phone\" ";
    $query .= "and facebook = \"$facebook\" ";
    $query .= "and linkedin = \"$linkedin\" ";
    $query .= "and github = \"$github\" ";

    $count = reset(returnStuff($query));
    
    if ( $count > 0 )
        return true;
    return false;
}



function userContactExists($user,$contactId)
{
    $query  = "select count(id) from user_contacts ";
    $query .= "where contact=$contactId and $user=$user"; // questionable
    $count = reset(returnStuff($query));

    if ( $count > 0 )
        return true;
    return false;
}

function countUsersTrackingContactId($contactId)
{
    $query  = "select count(id) from user_contacts ";
    $query .= "where contact=$contactId";
    return reset(returnStuff($query));
}



function userScheduleExists($user,$scheduleId)
{
    $query  = "select count(id) from user_schedule ";
    $query .= "where schedule=$scheduleId and user=$user";
    $count = reset(returnStuff($query));

    if ( $count > 0 )
        return true;
    return false;
    
}

?>