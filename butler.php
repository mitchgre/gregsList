<?php
/*
  This file acts as a middle man between the browser (javascript) and gregsList's mysql database
 */


// get requests

// test requests
/*
$a = $_POST['a'];
$b = $_POST['b'];
$c = $_POST['c'];
$d = $_POST['d'];
*/

function parseInputs()
{
if (isset($_POST['func']))
    {
        $user = 2;
        $func = $_POST['func'];

        if ($func === "getPostings")
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
        if ($func === "updatePosting")
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
        if ($func === "getCompanies")
            {

                $query  = "select companies.name from companies ";
                $query .= "inner join user_companies on user_companies.company = companies.id ";
                $query .= "inner join users on user_companies.user = users.id ";
                $query .= "where users.id = $user";

                $companies = returnStuff($query);
                echo json_encode($companies);
            }

        if ($func === "insertPosting")
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
        if ($func === "removePosting")
            {
                // $url = htmlspecialchars_decode($_POST["url"]);
                $id = $_POST["url"];
                
                $query  = "delete from postings where id = $id and user = $user";
                
                booleanEcho($query);
                
            }
        if ($func === "insertCompany")
            {
                $url = urldecode($_POST["url"]);
                $companyName = $_POST["company"];
                insertCompany($user,$companyName);
            }
        if ($func === "removeCompany")
            {
                $companyName = $_POST["url"];  // companyName is stored here
                removeCompany($user,$companyName);
            }
    }
}
parseInputs();

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

function userLocationExists ($user,$locationId)
{
    $query  = "select count(id) from user_locations ";
    $query .= "where location=$locationId and user=$user";
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


function companyIdExists($companyName)
{
    $query  = "select count(id) from companies ";
    $query .= "where name=\"$companyName\"";
    return reset(returnStuff($query));
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


/*
  Interface for sending a query using prepared statements.
  Returns true if the query is successful, false otherwise.

  This function is used for insertions as opposed to extractions.
 */
function preparedStatement($query){
    $mysqli = connectToDB();
    $mysqli -> set_charset("utf8");
    if( $sql = $mysqli->prepare($query)){
        // return $sql;
        
        $sql->execute();
        if ($sql->affected_rows >= 1)
            {
                mysqli_close($mysqli);
                return true;
            }
        
    }
    mysqli_close($mysqli);
    return false;
    
}



/*
  This function can return a single column from mysql.  Useful for
  generalizing quick searches, but not good for building entire tables
  up from the database.
 */
function returnStuff($query)
{
    $mysqli = connectToDB();
    $container = []; // empty container

   if ($statement=$mysqli->prepare($query))
        {
            $statement->execute();
            // bind results
            $statement->bind_result($i);
            while($statement->fetch()) // loop over results and push into array
                array_push($container,$i);
            
            mysqli_close($mysqli);
            return $container;
        }
   else
       {
           mysqli_close($mysqli);
           return ["error"];
       }
}

/*
  Establish a connection to the gregsList database, and return the connection.
 */
function connectToDB(){
    require './credentials.php';  // username, hostname,password
    
    $mysqli = new mysqli($hostname, $username, $password, "gregsList");
    if ($mysqli->connect_errno)
        {
            echo "Failed to connect to MySQL: (" . 
                $mysqli->connect_errno. ") " . 
                $mysqli->connect_error;
        }
    return $mysqli;

}

// http://stackoverflow.com/questions/2280394/how-can-i-check-if-a-url-exists-via-php
function validURL($url)
{
    return strpos(@get_headers($url)[0],'200') === false ? false : true;
}


function booleanEcho($query)
{
    if (preparedStatement($query))
        {
            echo json_encode(true);
        }
    else 
        {
            echo json_encode(false);
        }
}


function booleanReturn($query)
{
    if (preparedStatement($query))
        {
            return true;
        }
    else 
        {
            return false;
        }
}




?>