<?php
	session_start();

	if(!isset($_POST['userid']) || empty($_POST['userid'])){
		die('Your console cannot be found. Please make sure your browser supports localStorage. To start a new instance visit <a href="index.html">index.html</a>');
	}
	
	if (ctype_alnum($_POST['userid'])) {
		$UID = $_POST['userid'];
		echo '<script>localStorage.setItem("consolioUID", "'.$UID.'");</script>';
		
		if(!file_exists("users/".$UID."/")){
			if(!mkdir("users/".$UID."/home/", 0777, true)) {
				die('Failed to create HOME folder...');
			}
			else{
				if(!mkdir("users/".$UID."/data/", 0777, true)) {
					die('Failed to create DATA folder...');
				}
				else{
					file_put_contents("users/".$UID."/data/console.external.json", "{}");					
					file_put_contents("users/".$UID."/data/.htaccess", 'Header set Access-Control-Allow-Origin "*"');
					
				}
			}
		}
		
		$_SESSION['UID'] = $UID;
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; URL=console">';

	}
	else{
		die('Invalid user id');
	}
?>
