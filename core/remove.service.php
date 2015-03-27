<?php
session_start();

  if(!isset($_SESSION['UID']) || empty($_SESSION['UID'])){
	die('{"status":"0", "msg":"Fatal error. User authenication failed"}');
  }
  
 error_reporting(E_ALL);
  ini_set('display_errors', '0');
  
  if(!isset($_POST['src']) || empty($_POST['src'])){
	 die('{"status":"0", "msg":"No function name was provided."}');
  }
  
  $fnc = $_POST['src'];
  
  $excisting = file_get_contents('../users/'.$_SESSION['UID'].'/data/console.external.json');
  $excisting = (array) json_decode($excisting);
  
  $fExists = false;
  $updated = array();
   
  foreach($excisting as $key=>$values){
	 $values = (array) $values;
	 if($key==$fnc){
		$fExists = true;
	 }
	 else{
		 $updated[$key] = array('fn'=>$values['fn'], 'help'=>$values['help'], 'src'=>$values['src'], 'ver'=>$values['ver']);
	 }
  }
  
  
  
  if($fExists==false){
	  die('{"status":"0", "msg":"The function you are looking for cannot be found. Maybe you have removed it already?"}');
  }
  else{
	
	 if(count($updated)<=0){
		 try{ 
			file_put_contents('../users/'.$_SESSION['UID'].'/data/console.external.json', "{}");
		 }
		 catch(Exception $e){
			 die('{"status":"0", "msg":"Could not remove this function. Please try again."}');
		 }
	 }
	 else{

		 try{ 
			file_put_contents('../users/'.$_SESSION['UID'].'/data/console.external.json', json_encode($updated));
		 }
		 catch(Exception $e){
			 die('{"status":"0", "msg":"Could not remove this function. Please try again."}');
		 }
	 }
	 
	 echo '{"status":"1", "msg":"<span class=\'green\'>Successfully removed!</span>"}';
	  
  }
  
?>
