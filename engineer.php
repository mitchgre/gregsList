<?php
/*
  This file contains some utility functions to simplify queries and database connections. 


 */

//require_once "./credentials.php";


/*
  Interface for sending a query using prepared statements.
  Returns true if the query is successful, false otherwise.

  This function is used for insertions as opposed to extractions.
 */
function preparedStatement($query)
{
    $mysqli = connectToDB();
    $mysqli -> set_charset("utf8");
<<<<<<< HEAD
    if( $sql = $mysqli->prepare($query))
        {
            $sql->execute();
            if ($sql->affected_rows >= 1)
                {
                    mysqli_close($mysqli);
                    return true;
                }
            return false;
        }
=======
    if( $sql = $mysqli->prepare($query)){
        // return $sql;
        
        $sql->execute();
        if ($sql->affected_rows >= 1)
            {
                mysqli_close($mysqli);
                return true;
            }
        return false;
        
    }
>>>>>>> 63274baafeae9446915cc2eb7cdec1be5efac672
    // mysqli_close($mysqli);
    return false;
    
}



/*
  This function can return a single column from mysql.  Useful for"  generalizing quick searches, but not good for building entire tables
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
function connectToDB()
{
    $config = parse_ini_file('config.ini');

<<<<<<< HEAD
=======
    // $mysqli = new mysqli("localhost", "root", 'KdPNpynAeC', "gregsList");
    //$mysqli = new mysqli("localhost", "root", 'Ovukvlt4734', "gregsList");
    // $mysqli = new mysqli($sqlhostname, $sqlusername, $sqlpassword, "gregsList");
>>>>>>> 63274baafeae9446915cc2eb7cdec1be5efac672
    $mysqli = new mysqli($config['sqlhostname'], $config['sqlusername'], $config['sqlpassword'], "gregsList");


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