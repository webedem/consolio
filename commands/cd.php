<?php
	
	$output = array();
	
	if(!isset($_POST['directory']) || empty($_POST['directory'])){
		$dir = getcwd();
	}
	elseif($_POST['directory']=='..'){
		chdir(dirname(__DIR__));
		$dir = getcwd();
	}
	else{
		chdir($_POST['directory']);
		$dir = ($_POST['directory']);		
	}
	
	array_push($output, getcwd());
	
	echo json_encode($output);
?>