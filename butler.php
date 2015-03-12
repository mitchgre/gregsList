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
                $query = "select url from postings ";
                $query .= "where user = $user";

                $postings = returnStuff($user,$query);
                echo json_encode($postings);
            }

        if ($func === "getCompanies")
            {

                $query  = "select companies.name from companies ";
                $query .= "inner join user_companies on user_companies.company = companies.id ";
                $query .= "inner join users on user_companies.user = users.id ";
                $query .= "where users.id = $user";

                $companies = returnStuff($user,$query);
                echo json_encode($companies);
            }

        if ($func === "insertPosting")
            {
                
                $url = urldecode($_POST["url"]);
                $company = $_POST["company"];
                $source = $_POST["source"];

                //echo "received insertPosting request with $url, $company, $source, $user";

                // check if $url is valid

                
                $query  = "insert into postings (url,user) values(\"$url\",$user)";
                booleanEcho($query);
                
            }
        if ($func === "removePosting")
            {
                $url = htmlspecialchars_decode($_POST["url"]);

                $query  = "delete from postings where url = '$url' and user = $user";
                
                booleanEcho($query);
                
            }
        if ($func === "insertCompany")
            {
                insertCompany($user);
            }
        if ($func === "removeCompany")
            {
                removeCompany($user);
            }
    }
}
parseInputs();

function removeCompany($user)
{
    $companyName = $_POST["url"];  // companyName is stored here
    
    // $mysqli = connectToDB();

    // get id of company name
    $query = "select id from companies where name = \"$companyName\"";
    
    // echo json_encode($query);
    $companyID = reset(returnStuff($user,$query));
    
    // echo json_encode("company id = " . $companyID);

    
    // remove link from user_companies
    $query = "delete from user_companies where company = $companyID";
    // echo json_encode($query);
    
    
    if (preparedStatement($query))
        {
            // check to see if any other users are tracking this company
            $query = "select count(user) from user_companies where user_companies.company=$companyID";
          
            $count = reset(returnStuff($user,$query));

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

function insertCompany($user)
{
    $url = urldecode($_POST["url"]);
    $companyName = $_POST["company"];
    $source = $_POST["source"];
    
    //echo "received insertPosting request with $url, $company, $source, $user";
    
    // if company already exists in companies, get it's id and tie it to $user
    // if company doesn't already exist in companies, add it and tie it to $user
    
    $query = "select count(name) from companies where name = \"$companyName\"";
    $count = reset(returnStuff($user,$query));
    
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
            
            $count = reset(returnStuff($user,$query));
            
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
function returnStuff($user,$query)
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


?>