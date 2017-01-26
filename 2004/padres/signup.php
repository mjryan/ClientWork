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
	$generalError = "An ERROR occurred in your submission.";
}

	$fname = $HTTP_GET_VARS["fname"];
	$lname = $HTTP_GET_VARS["lname"];
	$email = $HTTP_GET_VARS["email"];
		
	if ($HTTP_GET_VARS["fnamereq"] == "0")
		{
			$fnameError .= "Your first name is required.";
		}
	if ($HTTP_GET_VARS["lnamereq"] == "0")
		{
			$lnameError .= "Your last name is required.";
		}
		if ($HTTP_GET_VARS["emailvalid"] == "0")
		{
			$emailError .= "Your e-mail address is not valid.<br>";
		}
	if ($HTTP_GET_VARS["email2req"] == "0")
		{
			$email2Error .= "Your repeat e-mail address is required.";
		}
	if ($HTTP_GET_VARS["emailmatch"] == "0")
		{
			$emailError .= "Your e-mail address does not match.";
		}
		if ($HTTP_GET_VARS["emailreq"] == "0")
		{
			$emailError = "Your e-mail address is required.<br>";
		}



?><!doctype html public  "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Entry Form Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" type="text/css" href="shared/style.css">

<script language="JAVASCRIPT">
<!--
		browsVer3 = false;
		b_name = navigator.appName;
		b_ver = parseInt(navigator.appVersion);
		if ((b_name == "Netscape" && b_ver >= 3) || 
		(b_name == "Microsoft Internet Explorer" && b_ver >= 4))
		browsVer3 = true;
		if(browsVer3)
		parent.self.focus();
		
     function gotoOpenerLink(url){ 
          if (parent.opener && ! parent.opener.closed){ 
               parent.opener.location = url; 
          } 
          else { 
               window.open(url, 'nw'); 
          } 
     } 
		// -->
	</script>
</head>

<body>
<div align="center">
<form action="processed.php" method="post" enctype="multipart/form-data">
<table border="0" cellspacing="0" cellpadding="0" width="336" height="320">
	<tr>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0" alt=""></td>
		<td width="28"><img src="/shared/images/spacer.gif" width="28" height="1" border="0" alt=""></td>
		<td width="39"><img src="/shared/images/spacer.gif" width="39" height="1" border="0" alt=""></td>
		<td width="85"><img src="/shared/images/spacer.gif" width="85" height="1" border="0" alt=""></td>
		<td width="115"><img src="/shared/images/spacer.gif" width="115" height="1" border="0" alt=""></td>
		<td width="47"><img src="/shared/images/spacer.gif" width="47" height="1" border="0" alt=""></td>
		<td width="20"><img src="/shared/images/spacer.gif" width="20" height="1" border="0" alt=""></td>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0" alt=""></td>
	</tr>
	
	<!-- Padres Logo TOP -->

	<tr valign="bottom" align="center">
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0" alt=""></td>
		<td colspan="6"><img src="images/logo_padres_top.gif" alt="" width="133" height="47" border="0" alt=""><br></td>
		<td width="1"><img src="/shared/images/spacer.gif" width="1" height="1" border="0" alt=""></td>	
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
		<td width="1" bgcolor="#000000" rowspan="12"><img src="/shared/images/spacer.gif" width="1" height="255" border="0"></td>
		<td><br></td>
		<td colspan="4" height="37"><br>
			<img src="images/signup/hdr_enter_address.gif" 
			alt="Enter your e-mail address to be notified when more information is available on THE SWEET SPOT" width="285" height="37" border="0"><br></td>
		<td><br></td>
		<td width="1" bgcolor="#000000" rowspan="12"><img src="/shared/images/spacer.gif" width="1" height="255" border="0"></td>	
	</tr>
	
	
	
	<!-- General Error Message -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="4" height="20" class="error"><? echo $generalError ?></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- General Error Message -->
	
	
	
	
	<!-- First Name Row -->
	<tr valign="middle" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="2">First Name:</td>
		<td colspan="2"><input type="text" name="fname" value="<? echo $fname ?>" id="fname" maxlength="100" size="18"></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- First Name Row -->
	
	<!-- First Name Error Message -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="4" height="20" class="error"><? echo $fnameError ?></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- First Name Error Message -->
	
	
	
	
	<!-- Last Name Row -->
	<tr valign="middle" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="2">Last Name:</td>
		<td colspan="2"><input type="text" name="lname" value="<? echo $lname ?>" id="lname" maxlength="100" size="18"></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Last Name Row -->
	
	<!-- Last Name Error Message -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="4" height="20" class="error"><? echo $lnameError ?></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Last Name Error Message -->
	
	
	
	
	<!-- E-mail Address Row -->
	<tr valign="middle" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="2">E-mail Address:</td>
		<td colspan="3"><input type="text" name="email" value="<? echo $email ?>" id="email" maxlength="100" size="23"></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- E-mail Address Row -->
	
	<!-- E-mail Address Error Message -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="4" height="20" class="error"><? echo $emailError ?></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- E-mail Address Error Message -->
	
	
	
	
	
	<!-- Confirm E-mail Address Row -->
	<tr valign="middle" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="2">Repeat E-mail Address:</td>
		<td colspan="3"><input type="text" name="email2" value="<? echo $email2 ?>" id="email2" maxlength="100" size="23"></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Confirm E-mail Address Row -->
	
	<!-- Confirm E-mail Address Message -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="4" height="20" class="error"><? echo $email2Error ?></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Confirm E-mail Address Message -->
	
	
	
	
	
	<!--Privacy Policy Links and Submit Button Row -->
	<tr valign="middle" align="left">
		<!-- this row spanned from above -->
		<td><br></td>
		<td colspan="3" class="ten">Please review our <a href="javascript:gotoOpenerLink('privacy/index.htm')">Privacy Policy &amp; Terms of Use</a></td>
		<td align="right"><input name="submit" type="image" src="images/signup/btn_enter.gif" border="0" value="Enter"></td>
		<td><br></td>
		<!-- this row spanned from above -->
	</tr>
	<!--Privacy Policy Links and Submit Button Row -->
	
	
	<!-- Spacer Row -->
	<tr valign="top" align="left">
		<!-- this row spanned from above -->
		<td colspan="6"><img src="/shared/images/spacer.gif" width="1" height="5" border="0"></td>
		<!-- this row spanned from above -->
	</tr>
	<!-- Spacer Row -->
		
	
	<!-- Bottom Row -->
	<tr valign="top" align="left">
		<td colspan="8" bgcolor="#000000"><img src="/shared/images/spacer.gif" width="1" height="1" border="0"></td>
	</tr>
	<!-- Bottom Row -->
	
</table>
</form>
</div>
</body>
</html>
