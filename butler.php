<?php
/*
  This file acts as a middle manager between the browser (javascript) and gregsList's php members


  "Life is the art of drawing sufficient conclusions from insufficient premises."
  -- Samuel Butler

 */


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
        if ($func === "updatePosting")
            {
                updatePosting($user);
            }
        if ($func === "getCompanies")
            {
                echo getCompanies($user);
            }

        if ($func === "insertPosting")
            {
                insertPosting($user);
            }
        if ($func === "removePosting")
            {
                removePosting($user);
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







?>