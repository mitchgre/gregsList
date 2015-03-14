<?php
/*
  This file will manage guests according to username and passwords.

  " What is a lobby boy? A lobby boy is completely invisible, yet always
  in sight. A lobby boy remembers what people hate. A lobby boy
  anticipates the client's needs before the needs are needed. A lobby
  boy is, above all, discreet to a fault. Our guests know that their
  deepest secrets, some of which are frankly rather unseemly, will go
  with us to our graves."
  - M. Gustave
  

 */

require_once 'engineer.php';
require_once 'existentialist.php';

/*
  Give 'em an ocular pat down. 
  https://www.youtube.com/watch?v=1SUmugkTyU8
 */
function clearUser()
{
    if ( isset($_POST['user']) && $_POST['user'] !== null && $_POST['user'] !== '' )
        {
            $username = $_POST['user']; // lookup userid from db
            
            //echo "received Username: " . $username;
            
            if ( isset($_POST['pass']) && $_POST['pass'] !== "" )
                {
                    // if user/password exists, check it, otherwise add new user
                    if ( usernameExists($username) )
                        {
                            $userId = getUserId($username);
                            $pass = getPass($userId); // get pass from db
                            
                            if ($_POST['pass'] === $pass)  // successful clearance
                                {
                                    return "user cleared.";
                                }
                            else 
                                {
                                    return "invalid combination.";
                                }
                        }
                    else
                        {
                            if ( addUser($username,$_POST['pass']) )
                                {
                                    return "user cleared.";
                                }
                            else
                                {
                                    return "error creating new user.";
                                }
                        }
                    
                }
            else
                {
                    return "password cannot be empty.";
                }
            
        }
    else
        {
            return "username cannot be empty.";
        }
}



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



function changeUsername($username)
{
    ;
}

function changePassword($username)
{
    ;
}

/*
  $username is assumed to be verified not to exist before this function is called. 

  At time of writing, this function is only called from clearUser().
 */
function addUser($username,$password)
{
    // insert into users
    $query = "insert into `users` (`name`) values (\"$username\") ";
    if ( preparedStatement($query) )
        {
            // get new user id
            $userId = getUserId($username);

            // hash password

            // insert into pass
            $query  = "insert into `pass` (`user`, `word`) ";
            $query .= "values (".$userId.",\"".$password."\")";

            // return true or false
            return booleanReturn($query);
        }
    else
        {
            // something went wrong
            // delete user name from db?
            
            return false;
        }
        
}


?>