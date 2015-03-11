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
        $user = 1;
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
                if (preparedStatement($query))
                    echo json_encode(true);
                else
                    echo json_encode(false);
                
                
            }
        if ($func === "removePosting")
            {
                // $url = urldecode($_POST["url"]);
                $url = htmlspecialchars_decode($_POST["url"]);
                // $url = mysqli_real_escape_string($_POST["url"]);
                //$url = $_POST["url"];
                // $url = mysqli_real_escape_string($_POST["url"],$url);

                $query  = "delete from postings where url = '$url' and user = $user";
                // $query  = "select url from postings where id=47";
                
                
                
                if (preparedStatement($query))
                    echo json_encode(true);
                else
                    echo json_encode(false);
                
                
                // $mysqli = connectToDB();
                // $result = mysqli_query($mysqli,$query);
                
                //echo json_encode($query);
                // echo json_encode(preparedStatement($query));
                // echo json_encode([$result]);
            }
    }
}
parseInputs();






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



?>