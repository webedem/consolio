<?php
  session_start();
  
  if(!isset($_SESSION['UID']) || empty($_SESSION['UID'])){
	die('{"status":"0", "msg":"Fatal error. User authenication failed"}');
  }
  
  //error_reporting(E_ALL);
  ini_set('display_errors', '0');
  
  $src = $_POST['src'][0];
 
  $package = file_get_contents($src);
  $package = (array) json_decode($package);
  
  $packageName = $package['function']->name;
  
  
  $excisting = file_get_contents('../users/'.$_SESSION['UID'].'/data/console.external.json');
  $excisting = (array) json_decode($excisting);
  
  $fExists = false;
  
  foreach($excisting as $key=>$values){
	 if($key==$packageName){
		$fExists = true;
	 }
  }
  
  
  $reserved = file_get_contents('../users/'.$_SESSION['UID'].'/data/reserved.external.json');
  $reserved = (array) json_decode($reserved);
  
  foreach($reserved as $key=>$values){
	 if($key==$packageName){
		$fExists = true;
	 }
  }
  
  if($fExists==true){
	  die('{"status":"0", "msg":"Another function with the same name is already installed or reserved by the system for future use. You can only have 1 instance of each function installed."}');
  }
  else{
	    
	 $excisting[$package['function']->name] =  array(
		'fn'=>$package['package'].".init(parameters)",
	    'help'=>$package['function']->help,
		'src'=>$package['function']->src,
		'ver'=>$package['version']
	 );
	  
	 try{ 
		file_put_contents('../users/'.$_SESSION['UID'].'/data/console.external.json', json_encode($excisting));
	 }
	 catch(Exception $e){
		 die('{"status":"0", "msg":"Fatal error on installation."}');
	 }
	 
	 echo '{"status":"1", "msg":"<span class=\'green\'>Successfully installed!</span>"}';
	  
  }
  
  
  
?>
