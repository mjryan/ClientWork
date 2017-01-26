<?
error_reporting(0); 
$errorString = "";

function validateEmail($email)
  {
    return ereg("^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$", $email);
  }


$fname = rtrim($HTTP_POST_VARS["fname"]);
$lname = rtrim($HTTP_POST_VARS["lname"]);
$email = rtrim($HTTP_POST_VARS["email"]);
$email2 = rtrim($HTTP_POST_VARS["email2"]);
$status = "new";
$output = "";



if (strlen($fname) == 0)
{

	$errorString .= "&fnamereq=0";
}
if (strlen($lname) == 0)
{
	
	$errorString .= "&lnamereq=0";
}
if (strlen($email) == 0)
{
	
	$errorString .= "&emailreq=0";
}
if (strlen($email2) == 0)
{
	
	$errorString .= "&email2req=0";
}

if ($email != $email2)
{

	$errorString .= "&emailmatch=0";
}

if (! validateEmail($email))
{
	
	$errorString .= "&emailvalid=0";
}

if (strlen($errorString) > 0)
{
	$url = "sweetspot_signup.php?fname=" . $fname . "&lname=" . $lname . "&email=" . $email . "&allvalid=0" .$errorString;
	//Header('Location:' . $url);
}

else
{
	
	
	include("dbconn.php");
	
	
	
	//$strQuery = "insert  into signups (fname,lname,email,status) values('" .$fname . "','" . $lname . "','" . $email . "','" . $status . "');";
	
	
	//$result = mysql_query($strQuery);
	if (strlen(mysql_error($link)) > 0)
	{
		//Header('Location:error.php?type=d');
		echo mysql_error($link);
	}
	
	
	$strQuery = "select * from signups";
	
	
	$result = mysql_query($strQuery);


	//display the records
	while ($row = mysql_fetch_row ($result)) 	
	{
	
		
		$output .= ($row[0]). " ";
		$output .= ($row[1]). "<br>";
		$output .= ($row[2]). "<br>";
		$output .= ($row[3]). "<br>";
		$datetimestamp =  substr($row[4],4,2) . "/" . substr($row[4],6,2) . "/" . substr($row[4],0,4) . " " . substr($row[4],8,2) . ":" . substr($row[4],10,2) . ":" . substr($row[4],12,2);
		$output .= $datetimestamp . "<br><br>";
	}
}
	
 ?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Confirmation Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
I signed you up as<br>
<?
echo "<strong>" . $fname ." ".$lname . " </strong><br>" . $email; 
?>
<? echo "<br><br><br>Test<br>" . $output ?>
<body>
</body>
</html>
