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

if (isset($_POST['func']))
    {
        // echo getPostings(1);
        $func = $_POST['func'];
        if ($func === "getPostings")
            {
                echo getPostings(1);
                //echo "got it";
            }
        else
            {
                echo "func = " . $_POST['func'];
            }
    }

function getPostings($user)
{
    $mysqli = connectToDB();
    $postings = []; // empty container
    $query = "select url from users inner join user_postings on user_postings.user=users.id ";
    $query .= "inner join postings on user_postings.posting=postings.id ";
    $query .= "where users.id = $user";


   if ($sql=$mysqli->prepare($query))
        {
            $sql->execute();
            // bind results
            $sql->bind_result($i);
            while($sql->fetch()) // loop over results and push into array
                array_push($postings,$i);
            // print_r($categories);
            return json_encode($postings);
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

/*
  Interface for sending a query using prepared statements.
  Returns true if the query is successful, false otherwise
 */
function preparedStatement($query){
    $mysqli = connectToDB();
    if( $sql = $mysqli->prepare($query)){
        $sql->execute();
        mysqli_close($mysqli);
        return true;
    }
    mysqli_close($mysqli);
    return false;
    
}


?>