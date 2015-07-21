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
        if ($func === "getNotesOnGoal")
            {
                $goalId = $_POST['id'];
                echo json_encode(getNotesOnGoal($user,$goalId));
            }
        if ($func === "getNotesOnIndustry")
            {
                $id = $_POST['id'];
                echo json_encode(getNotesOnIndustry($user,$id));
            }
        if ($func === "getNotesOnCompany")
            {
                $id = $_POST['id'];
                echo json_encode(getNotesOnCompany($user,$id));
            }
        if ($func === "getNotesOnLocation")
            {
                $id = $_POST['id'];
                echo json_encode(getNotesOnLocation($user,$id));
            }
        if ($func === "getNotesOnPosting")
            {
                $postingId = $_POST['id'];
                echo json_encode(getNotesOnPosting($user,$postingId));
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
                // should error check that all post fields are set

                $eventName = $_POST["name"];
                $description = $_POST["description"];
                $contact = $_POST["contact"];
                $start = $_POST["start"];
                $end = $_POST["end"];

                echo insertSchedule($user,$eventName,$description,$contact,$start,$end);  
            }
        if ($func === "addSchedule")
            {
                // should this use json?
                echo insertSchedule($user);
            }

        if ($func === "insertBlog")
            {
                // need to error check $_POST
                
                $title = $_POST["title"];
                $text = $_POST["text"];
 
                echo json_encode(insertBlog($user,$title,$text));
            }
        if ($func === "insertNotesPostingUser")
            {
                // insertBlog, then insertNotesPostingUser
                $title = $_POST["title"];
                $text = $_POST["text"];
                $postingId = $_POST["postingId"];
 
                $noteId = insertBlog($user,$title,$text);

                // $noteId = $_POST["noteId"];


                
                
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
        if ($func === "removeBlog")
            {
                $userNoteId = $_POST["url"];  
                // need to get noteId from userNoteId

                $noteId = getNoteIdFromUserNoteId($userNoteId);

                if ( removeNoteUser($user,$userNoteId) === true )
                    {
                        if ( removeNote( $noteId ) === true )
                            {
                                echo json_encode(true);
                            }
                        else
                            {
                                echo json_encode("Error removing from notes.");
                            }
                    }
                else
                    {
                        echo json_encode("Error removing from NoteUser.");
                    }
                    
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