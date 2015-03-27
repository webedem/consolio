<?php
	
  if(!isset($_GET['url']) || empty($_GET['url'])){
	 die('{"status":"0", "msg":"No valid package URL was provided."}');
  }
  else{
	  $json = file_get_contents($_GET['url']);
	  echo $json;
  }
?>
