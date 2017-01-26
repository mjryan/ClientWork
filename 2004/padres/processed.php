<?
//error_reporting(0); 
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
	$url = "signup.php?fname=" . $fname . "&lname=" . $lname . "&email=" . $email . "&allvalid=0" .$errorString;
	Header('Location:' . $url);

}

else
{
	
	include("dbconn.php");
	
	
	$strQuery = "insert  into signups (fname,lname,email,status) values('" .$fname . "','" . $lname . "','" . $email . "','" . $status . "');";
	
	$result = mysql_query($strQuery);
	if (strlen(mysql_error($link)) > 0)
	{
		Header('Location:error.php?type=d');
		
	}
	
	
	$strQuery = "select * from signups";
	
	
	$result = mysql_query($strQuery);

	//display the records
/*	while ($row = mysql_fetch_row ($result)) 	
	{
	
		
		$output .= ($row[0]). " ";
		$output .= ($row[1]). "<br>";
		$output .= ($row[2]). "<br>";
		$output .= ($row[3]). "<br>";
		$datetimestamp =  substr($row[4],4,2) . "/" . substr($row[4],6,2) . "/" . substr($row[4],0,4) . " " . substr($row[4],8,2) . ":" . substr($row[4],10,2) . ":" . substr($row[4],12,2);
		$output .= $datetimestamp . "<br><br>";
	}
	*/
}
	
 ?><!doctype html public  "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <html>
<head>
<title>Confirmation Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" type="text/css" href="shared/style.css">
</head>

<body>
<div align="center">
<table border="0" cellspacing="0" cellpadding="0" width="336" height="340">
	<tr>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
		<td width="28"><img src="/shared/images/spacer.gif" width="28" height="1" border="0"></td>
		<td width="39"><img src="/shared/images/spacer.gif" width="39" height="1" border="0"></td>
		<td width="85"><img src="/shared/images/spacer.gif" width="85" height="1" border="0"></td>
		<td width="115"><img src="/shared/images/spacer.gif" width="115" height="1" border="0"></td>
		<td width="47"><img src="/shared/images/spacer.gif" width="47" height="1" border="0"></td>
		<td width="20"><img src="/shared/images/spacer.gif" width="20" height="1" border="0"></td>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
	</tr>
	
	<!-- Padres Logo TOP -->

	<tr valign="bottom" align="center">
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
		<td colspan="6"><img src="images/logo_padres_top.gif" alt="" width="133" height="47" border="0"><br></td>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>	
	</tr>
	<tr valign="top">
		<td width="1" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
		<td align="left" colspan="2" background="images/bk_blue.gif" height="36"><br></td>
		<td align="center" colspan="2" background="images/bk_blue.gif"><img src="images/logo_padres_mid.gif" alt="" width="133" height="36" border="0"><br></td>
		<td align="right" colspan="2" background="images/bk_blue.gif"><a href="javascript:window.close();"><img src="images/close.gif" alt="Close" width="63" height="28" border="0"></a><br></td>
		<td width="1" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>	
	</tr>
	
	<tr valign="top">
		<td width="1" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
		<td align="center" colspan="6"><img src="images/logo_padres_btm.gif" alt="" width="133" height="25" border="0"><br></td>
		<td width="1" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>	
	</tr>
	
	
	<tr valign="top" align="center">
		<td width="1" bgcolor="#000000" rowspan="2"><img src="/shared/images/spacer.gif" width="1" height="275" border="0"></td>
		<td><br></td>
		<td colspan="4"><br>
		<img src="images/processed/thankyou.gif" 
		alt="Thanks For Your Interest! You will receive an e-mail when THE SWEET SPOT is available for pre-ordering. We look forward to providing you with more exciting details on the making of this revolutionary ballpark!" 
		width="285" height="217" border="0"></td>
		<td><br></td>
		<td width="1" bgcolor="#000000" rowspan="2"><img src="/shared/images/spacer.gif" width="1" height="275" border="0"></td>
	</tr>
	


	<!-- Spacer Row -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td colspan="6"><img src="/shared/images/spacer.gif" width="1" height="10" border="0"></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Spacer Row -->
		
	
	<!-- Bottom Row -->
	<tr valign="top" align="left">
		<td colspan="8" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
	</tr>
	<!-- Bottom Row -->
	
</table>
</div>
</body>
</html>
