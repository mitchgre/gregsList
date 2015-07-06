<?php
/*
  This file acts as a middle manager between the browser (javascript) and gregsList's php members:

  engineer.php contains utility functions 
  concierge.php contains guest tracking functions
  accountant.php contains functions to add/remove data from the database 


  "Life is the art of drawing sufficient conclusions from insufficient premises."
  -- Samuel Butler

 */

//require "./credentials.php";
require "./engineer.php"; // utitlity functions
require "./concierge.php"; // guest registry functions
require "./accountant.php"; // guest record functions


/*
  Clear everything with the concierge before proceeding. 
 */
conciergeStatus();
function conciergeStatus()
{
    $status = clearUser();

    if ($status === "user cleared.")
        {
            $userId = getUserId($_POST["user"]);
            parseInputs($userId);
        }
    else 
        echo $status;
}



/*
  Interface with the accountant.php file
 */
function parseInputs($user)
{
    

if (isset($_POST['func']))
    {
        $func = $_POST['func'];
        
        // getters ===============================
        if ($func === "getGoals")
            {
                echo json_encode(getGoals($user));
            }
        if ($func === "getIndustries")
            {
                echo json_encode(getIndustries($user));
            }
        if ($func === "getLocations")
            {
                echo json_encode(getLocations($user));
            }
        if ($func === "getPostings")
            {
                getPostings($user);
            }
        if ($func === "getContacts")
            {
                echo json_encode(getContacts($user));
            }
        if ($func === "getSchedules")
            {
                echo json_encode(getSchedules($user));
            }
        if ($func === "getCompanies")
            {
                echo getCompanies($user);
            }
        if ($func === "getBlogId")
            {                
                echo json_encode(
                    getBlogId(
                        $user,
                        $_POST['title'],
                        $_POST['text']
                    ));
            }
        if ($func === "getBlog")
            {
                echo json_encode(getBlog($user));
            }
        // inserters ===============================
        if ($func === "insertGoal")
            {
                if ( isset($_POST["goal"]) && $_POST["goal"] !== '')
                    echo json_encode(insertGoal($user,$_POST["goal"]));
            }
        if ($func === "insertIndustry")
            {
                if ( isset($_POST["industry"]) && $_POST["industry"] !== '')
                    echo json_encode(insertIndustry($user,$_POST["industry"]));
            }
        if ($func === "insertCompany")
            {
                $url = urldecode($_POST["url"]);
                $companyName = $_POST["company"];
                insertCompany($user,$companyName);
            }
        if ($func === "insertLocation")
            {
                if ( isset($_POST["location"]) && $_POST["location"] !== '')
                    echo json_encode(insertLocation($user,$_POST["location"]));
            }
        if ($func === "insertPosting")
            {
                echo json_encode(insertPosting($user));
            }
        if ($func === "insertContact")
            {
                // more complex.  will be responsible for getting $_POST
                echo json_encode(insertContact($user));  
            }
        if ($func === "insertSchedule")
            {
                // more complex.  will be responsible for getting $_POST
                // echo json_encode(insertSchedule($user));  

                echo insertSchedule($user);  
            }
        if ($func === "addSchedule")
            {
                // more complex.  will be responsible for getting $_POST
                // echo json_encode(insertSchedule($user));  
                // echo "adding ZSchecdule";

                $name = $_POST["name"];
                $description = $_POST["description"];
                $contact = $_POST["contact"];
                $start = $_POST["start"];
                $end = $_POST["end"];

                // addSchedule($name,$description,$contact,$start,$end)
                if (addSchedule($name,$description,$contact,$start,$end) )
                    {
                        $scheduleId = getScheduleId(
                            $name,
                            $description,$contact,
                            $start,$end);  

                        if ( $scheduleId > 0 )
                            {
                                // echo $scheduleId;
                                // insert schedule id and user id to user_schedule

                                $query  = "insert into user_schedule ";
                                $query .= "(user,schedule) ";
                                $query .= "values ( $user, ";
                                $query .= "$scheduleId ) ";
                                
                                //return $query;
                                echo booleanEcho($query);

                            }
                        else
                            echo "error getting schedule id.";

                    }
                else
                    echo "error inserting schedule.";
            }

        if ($func === "insertBlog")
            {
                echo json_encode(insertBlog($user));
            }
        if ($func === "insertNotesPostingUser")
            {
                $noteId = $_POST["noteId"];
                $postingId = $_POST["postingId"];
                
                echo json_encode(
                    insertNotesPostingUser($noteId,$postingId,$user));
            }

        // removers ===============================
        if ($func === "removeGoal")
            {
                // url is the id for user_goals
                if ( isset($_POST["url"]) && $_POST["url"] !== '')
                    echo json_encode(removeGoal($user,$_POST["url"]));
            }
        if ($func === "removeIndustry")
            {
                // url is the id for user_industries
                if ( isset($_POST["url"]) && $_POST["url"] !== '')
                    echo json_encode(removeIndustry($user,$_POST["url"]));
            }
        if ($func === "removeLocation")
            {
                // url is the id for locations
                if ( isset($_POST["url"]) && $_POST["url"] !== '')
                    echo json_encode(removeLocation($user,$_POST["url"]));
            }
        if ($func === "removeContact")
            {
                // url is the id for user_contacts
                if ( isset($_POST["url"]) && $_POST["url"] !== '')
                    echo json_encode(removeUserContact($user,$_POST["url"]));
            }
        if ($func === "removePosting")
            {
                if ( isset($_POST["url"]) && $_POST["url"] !== '')
                    removePosting($user,$_POST["url"]);
            }
        if ($func === "removeCompany")
            {
                $companyId = $_POST["url"];  // companyID is stored here
                removeCompany($user,$companyId);
            }
        if ($func === "removeSchedule")
            {
                $scheduleId = $_POST["url"];  // scheduleID is stored here
                echo json_encode(removeSchedule($user,$scheduleId));
            }

        // updaters ===============================
        if ($func === "updateGoal")
            {
                echo json_encode(updateGoal($user));
            }
        if ($func === "updateIndustry")
            {
                echo json_encode(updateIndustry($user));
            }
        if ($func === "updatePosting")
            {
                updatePosting($user);  // returns on its own
            }
        if ($func === "updateContact")
            {
                echo json_encode(updateContact($user));  
            }

    }
}







?>