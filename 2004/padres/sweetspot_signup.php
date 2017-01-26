<?
error_reporting(0);
$fname = "";
$lname = "";
$email = "";
$email2 = "";
$fnameError = "";
$lnameError = "";
$emailError = "";
$email2Error = "";
$generalError = "";

if ($HTTP_GET_VARS["allvalid"] == "0")
{
	$generalError = "You Messed Up<br>";
}

	$fname = $HTTP_GET_VARS["fname"];
	$lname = $HTTP_GET_VARS["lname"];
	$email = $HTTP_GET_VARS["email"];
		
	if ($HTTP_GET_VARS["fnamereq"] == "0")
		{
			$fnameError .= "<br>Your first name is required";
		}
	if ($HTTP_GET_VARS["lnamereq"] == "0")
		{
			$lnameError .= "<br>Your last name is required";
		}
	if ($HTTP_GET_VARS["emailreq"] == "0")
		{
			$emailError .= "<br>Your email address is required";
		}
	if ($HTTP_GET_VARS["email2req"] == "0")
		{
			$email2Error .= "<br>You are required to repeat your email address";
		}
	if ($HTTP_GET_VARS["emailmatch"] == "0")
		{
			$emailError .= "<br>Your email addresses do not match";
		}
	if ($HTTP_GET_VARS["emailvalid"] == "0")
		{
			$emailError .= "<br>Your email address is not valid";
		}


?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Form Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body>
<? echo $generalError ?>
<form action="sweetspot_process.php" method="post" enctype="multipart/form-data">
First Name <input type="text" name="fname" value="<? echo $fname ?>" id="fname" maxlength="100" size="40">
<? echo $fnameError ?>
<br><br>
Last Name <input type="text" name="lname" value="<? echo $lname ?>" id="lname" maxlength="100" size="40">
<? echo $lnameError ?>
<br><br>
Email <input type="text" name="email" value="<? echo $email ?>" id="email" maxlength="100" size="40">
<? echo $emailError ?>
<br><br>
Repeat Email<input type="text" name="email2" value="<? echo $email2 ?>" id="email2" maxlength="100" size="40">
<? echo $email2Error ?>
<br><br>
<input name="submit" type="submit" value="Sign Up">
</form>
</body>
</html>
