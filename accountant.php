<?php
/*
  This file keeps track of users' data

  "Never call an accountant a credit to his profession; a good
  accountant is a debit to his profession". 

  Charles Lyell

 */

require_once "./existentialist.php";
require_once "./engineer.php";


function getGoals($user)
{
    $ids = [];
    $values = [];
    
    $mysqli = connectToDB();
    
    $query = "select user_goals.id,goals.value from user_goals ";
    $query .= "inner join goals on user_goals.goal = goals.id ";
    $query .= "inner join users on users.id = user_goals.user ";
    $query .= "where user=$user ";
    
    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$value);
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($values,$value);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $goals = array
        (
            "ids" => $ids,
            "values" => $values
        );
    
    return $goals;
}


function getIndustries($user)
{
    $ids = [];
    $names = [];
    
    $mysqli = connectToDB();
    
    $query = "select user_industries.id,industries.name from user_industries ";
    $query .= "inner join industries on user_industries.industry = industries.id ";
    $query .= "inner join users on users.id = user_industries.user ";
    $query .= "where user=$user ";
    
    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$name);
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($names,$name);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $industries = array
        (
            "ids" => $ids,
            "names" => $names
        );
    
    return $industries;
}


function getSchedules($user)
{

    $ids = [];
    $names = [];
    $descriptions = [];
    $locations = [];
    $contacts = [];
    $urls = [];
    $starts = [];
    $ends = [];
    
    $mysqli = connectToDB();


    $query  = "select schedule.id, schedule.name, schedule.description, schedule.location, ";
    $query .= "schedule.contact, schedule.url, schedule.start, schedule.end ";
    $query .= "from user_schedule inner join schedule on user_schedule.schedule=schedule.id ";
    $query .= "inner join users on user_schedule.user = users.id where users.id = $user";

    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result
            (
                $id,$name,$description,$location,$contact,$url,$start,$end
            );
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($names,$name);
                    array_push($descriptions,$description);
                    array_push($locations,$location);
                    array_push($contacts,$contact);
                    array_push($urls,$url);
                    array_push($starts,$start);
                    array_push($ends,$end);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $schedules = array
        (
            "ids" => $ids,
            "names" => $names,
            "descriptions" => $descriptions,
            "locations" => $locations,
            "contacts" => $contacts,
            "urls" => $urls,
            "starts" => $starts,
            "ends" => $ends,            
        );
    
    return $schedules;



}

function getLocations($user)
{
    $ids = [];
    $names = [];
    
    $mysqli = connectToDB();
    
    $query = "select user_locations.id,locations.name from user_locations ";
    $query .= "inner join locations on user_locations.location = locations.id ";
    $query .= "inner join users on users.id = user_locations.user ";
    $query .= "where user=$user ";
    
    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$name);
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($names,$name);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $locations = array
        (
            "ids" => $ids,
            "names" => $names
        );
    
    return $locations;
}


function getContacts($user)
{
    $ids = [];
    $fnames = [];
    $lnames = [];
    $emails = [];
    $phones = [];
    $facebooks = [];
    $linkedins = [];
    $githubs = [];
    
    $mysqli = connectToDB();
    
    $query  = "select user_contacts.id,contacts.fname, ";
    $query .= "contacts.lname,contacts.email,contacts.phone, ";
    $query .= "contacts.facebook,contacts.linkedin,contacts.github ";
    $query .= "from user_contacts inner join contacts ";
    $query .= "on user_contacts.contact = contacts.id ";
    $query .= "where user=$user ";
    
    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$fname,$lname,$email,$phone,$facebook,$linkedin,$github);
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($fnames,$fname);
                    array_push($lnames,$lname);
                    array_push($emails,$email);
                    array_push($phones,$phone);
                    array_push($facebooks,$facebook);
                    array_push($linkedins,$linkedin);
                    array_push($githubs,$github);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $contacts = array
        (
            "ids" => $ids,
            "fnames" => $fnames,
            "lnames" => $lnames,
            "emails" => $emails,
            "phones" => $phones,
            "facebooks" => $facebooks,
            "githubs" => $githubs,
            "linkedins" => $linkedins
        );
    
    return $contacts;
}




function getPostings($user)
{
    // $postings = []; // return json object:  
    $ids = [];
    $titles = [];
    $urls = [];
    $locations = [];
    $companies = [];
    $sources = [];
    
    $mysqli = connectToDB();
    
    $query = "select id,title,url,location,company,source from postings where user=$user ";
    
    if ($statement = $mysqli->prepare($query))
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$title,$url,$locationId,$companyId,$source);
            
            while($statement->fetch())
                {
                    array_push($ids,$id);
                    array_push($titles,$title);
                    array_push($urls,$url);
                    $locationName = getLocationName($locationId);
                    array_push($locations,$locationName); 
                    $companyName = getCompanyName($companyId);
                    array_push($companies,$companyName); # will need to edit this
                    array_push($sources,$source);
                }
        }
    mysqli_close($mysqli);
    
    // associate arrays
    $postings = array
        (
            "ids" => $ids,
            "titles" => $titles,
            "urls" => $urls,
            "locations" => $locations,
            "companies" => $companies,
            "sources" => $sources
        );
    
    echo json_encode($postings);
}

function updatePosting($user)
{
    $title = $_POST["title"];
    $url = urldecode($_POST["url"]);
    $companyName = $_POST["company"];
    $locationName = $_POST["location"]; # string value needs to be converted to int
    $source = $_POST["source"];
    $id = $_POST["sid"];
    
    
    // if location doesn't exist in locations table yet, add it
    if (locationExists($locationName) != true)
        addLocation($locationName);
    
    if (companyIdExists($companyName) != true)
        addCompany($companyName);
    
    $companyId = getCompanyId($companyName);
    $locationId = getLocationId($locationName);
    
    $query  = "update postings ";
    $query .= "set title=\"$title\", ";
    $query .= "source=\"$source\", ";
    $query .= "location=$locationId, ";
    $query .= "company=$companyId, ";
    $query .= "url=\"$url\" ";
    $query .= "where id = $id ";
    
    //echo $query;
    
    
    if (booleanReturn($query))
        echo json_encode(true);
    else
        echo "failed to add posting";
    
}

function getCompanies($user)
{

    $ids = [];
    $names = [];
    // $companies = [];  // will contain ids and names

    $mysqli = connectToDB();

    $query  = "select companies.id,companies.name from companies ";
    $query .= "inner join user_companies on user_companies.company = companies.id ";
    $query .= "inner join users on user_companies.user = users.id ";
    $query .= "where users.id = $user";
    
    // can't use the generic function, gotta do this manually
    // $companies = returnStuff($query);

    if ( $statement = $mysqli->prepare($query) )
        {
            $statement->execute();
            
            // bind results
            $statement->bind_result($id,$name);

            // push results to containers in loop
            while ( $statement->fetch() )
                {
                    array_push($ids,$id);
                    array_push($names,$name);
                }
        }
    
    mysqli_close($mysqli);

    // associate arrays
    $companies = array
        (
            "ids" => $ids,
            "names" => $names
        );

    return json_encode($companies);
    
}


function insertPosting($user)
{
    $title = $_POST["title"];
    $url = urldecode($_POST["url"]);
    $companyName = $_POST["company"];
    $locationName = $_POST["location"]; # string value needs to be converted to int
    $source = $_POST["source"];
    
    /*
      $string =  "received insertPosting request with $title, ";
      $string .= "$url, $companyName, $locationName, $source, $user";
      echo json_encode($string);
    */
    
    // if location doesn't exist in locations table yet, add it
    if (locationExists($locationName) != true)
        addLocation($locationName);
    
    /*
    // if location doesn't exist in user_locations table yet, add it
    if (userLocationExists($locationName))
    {
    ; // do nothing
    }
    else
    {
    addUserLocation($user,$locationName);
    }
    */
    
    $locationId = getLocationId($locationName);
    
    
    if (companyIdExists($companyName) != true)
        addCompany($companyName);
    
    $companyId = getCompanyId($companyName);
    
    /*
      $string  =  "received insertPosting request with title = ". $title;
      $string .=  " url = " . $url;
      $string .= " companyName = " .$companyName;
      $string .= " companyId = " .$companyId;
      $string .= " locationName = " .$locationName;
      $string .= " locationExists(locationName) = " .locationExists($locationName);
      $string .= " locationId = " .$locationId;
      $string .= " source = " .$source;
      $string .= " user = " .$user;
      
      
      echo json_encode($string);
    */
    
    // check if $url is valid
    
    $query  = "insert into postings (title,url,company,location,source,user) ";
    $query .= "values(\"$title\", \"$url\", ";
    $query .= "$companyId, $locationId, \"$source\", $user)";
    if (booleanReturn($query))
        echo json_encode(true);
    else
        echo "failed to add posting";
    
}

function removePosting($user)
{
    // $url = htmlspecialchars_decode($_POST["url"]);
    $id = $_POST["url"];
    
    $query  = "delete from postings where id = $id and user = $user";
    
    booleanEcho($query);
}



/*
  location is a string
 */
function addLocation($locationName)
{
    $query  = "insert into locations (name) ";
    $query .= "values (\"$locationName\")";
    
    return booleanReturn($query);
}

/*
  user is an int, location is a string
 */
function addUserLocation($user,$locationName)
{
    // check if location already exists in locations
    $query = "select count(name) from locations where name=\"$locationName\"";
    $count = reset(returnStuff($query));
    
    if ($count < 1) // locationName is not in locations table yet, so add it
        addLocation($locationName);
    
    $locationID = getLocationId($user,$locationName);

    $query  = "insert into user_locations (user,location) ";
    $query .= "values ($user,$locationID)";

    return booleanReturn($query);        
}


function getLocationId($locationName)
{
    $query = "select id from locations where name=\"$locationName\"";
    $locationID = reset(returnStuff($query));
    return $locationID;
    
}

function getLocationName($locationId)
{
    $query = "select name from locations where id=$locationId";
    $locationName = reset(returnStuff($query));
    return $locationName;
    
}



function getCompanyID($companyName)
{
    $query = "select id from companies where name = \"$companyName\"";
    $companyID = reset(returnStuff($query));
    return $companyID;
}


function getCompanyName($companyId)
{
    $query = "select name from companies where id = $companyId";
    $companyName = reset(returnStuff($query));
    return $companyName;
}


function addCompany($companyName)
{
    $query  = "insert into companies (name) ";
    $query .= "values (\"$companyName\") "; 
    return booleanReturn($query);
}


function removeCompany($user,$companyName)
{
    
    // $mysqli = connectToDB();

    // get id of company name
    $companyID = getCompanyID($companyName);
    
    // echo json_encode("company id = " . $companyID);

    
    // remove link from user_companies
    $query = "delete from user_companies where company = $companyID";
    // echo json_encode($query);
    
    
    if (preparedStatement($query))
        {
            // check to see if any other users are tracking this company
            $query = "select count(user) from user_companies where user_companies.company=$companyID";
          
            $count = reset(returnStuff($query));

            // echo json_encode("There are " . $count . " users tracking this company.");

            
            // if no users are tracking company, delete it from companies table and return true
            // otherwise just return true
            if ($count < 1)
                {
                    $query = "delete from companies where id=$companyID";
                    booleanEcho($query);
                }
            else // other people are tracking the company, so leave it alone
                {
                    echo json_encode(true);
                }
            
        }
    else // prepared statement did not succeed
        {
            echo json_encode(false);
        }
    
    
    // if no one else is tracking the company, remove it from companies table
    
   
}

function insertCompany($user,$companyName)
{
   
    //echo "received insertPosting request with $url, $company, $source, $user";
    
    // if company already exists in companies, get it's id and tie it to $user
    // if company doesn't already exist in companies, add it and tie it to $user
    
    $query = "select count(name) from companies where name = \"$companyName\"";
    $count = reset(returnStuff($query));
    
    //echo json_encode(["Company has $count references"]);

    
    if ($count > 0)
        {
            // company already exists in companies.
            // if company doesn't exist in user_companies add connection
            // otherwise return error code: "company already exists"
            $query = "select count(name) from companies ";
            $query .= "inner join user_companies on companies.id=user_companies.company ";
            // $query .= "inner join users on user_companies.user=$user ";
            $query .= "where companies.name = \"$companyName\" ";
            $query .= "and user_companies.user = $user";

            // echo json_encode($query);
            
            $count = reset(returnStuff($query));
            
            // echo json_encode(["Company exists in companies, user has $count references"]);
            
            if ($count > 0) // user already has a reference to company
                {
                    mysqli_close($mysqli);
                    echo json_encode(["ERROR: User $user is already tracking $companyName"]);
                }
            else // link user to company in user_companies
                { 
                    $query = "insert into user_companies ";
                    $query .= "(user,company) ";
                    $query .= "values ($user, ";
                    $query .= "(select companies.id from companies ";
                    $query .= "where name = \"$companyName\") ) ";
                    
                                   
                    booleanEcho($query);
                }
            
        }
    
    else  // company doesn't exist in companies, so add it and link to user_companies
        {
            //echo json_encode(["Company not in companies, user has $count references"]);
            $query = "insert into companies (name) values (\"$companyName\")";
            if (preparedStatement($query))
                {
                    $query = "insert into user_companies ";
                    $query .= "(user,company) ";
                    $query .= "values ($user, (select companies.id from companies where name = \"$companyName\") ) ";
                    
                    booleanEcho($query);
                }
            else
                {

                    echo json_encode(false);
                }
        }
    
}




?>