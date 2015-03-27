<?php
	if(!isset($_POST['domain']) || empty($_POST['domain'])){
		die('{"status":"0", "msg":"The domain name is empty"}');
	}
	
	if(strpos($_POST['domain'],'|') ==true) {
		die('{"status":"0", "msg":"Invalid characters found in your parameters"}');
	}
	
	$response = nl2br(shell_exec(escapeshellcmd("whois ".$_POST['domain'])));
	
	$output = array("status"=>"1", "data"=>$response);
	echo json_encode($output);
	
?>
