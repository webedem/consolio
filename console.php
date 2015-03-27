<?php
header("content-type: Access-Control-Allow-Origin: *");
header("content-type: Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
session_start();
if(!isset($_SESSION['UID']) || empty($_SESSION['UID'])){
	//die('You cannot access this page directly. You need to open your console from the Chrome Extension');
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Console</title>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'>
	<link href="style.css" rel="stylesheet" type="text/css">

	<script src="core/jquery-1.11.0.min.js"></script>
	<script src="core/jquery-migrate-1.2.1.min.js"></script>
	<script src="core/commands.js"></script>
	<script src="core/app.js"></script>
	<link rel="icon" 
      type="image/png" 
      href="icon.png">
</head>

<body>
	<div id="bg"></div>
	<div id="shell">&gt;<input type="text" value="" autofocus="autofocus" /><div class="clear"></div></div>
</body>
</html>

