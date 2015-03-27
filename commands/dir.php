<?php
	session_start();
	$structure = array();
	$total_size = 0;
	$total_files = 0;
	$total_dirs = 0;
	
	$structure['contents'] = array();
	$structure['files'] = $total_files;
	$structure['dirs'] = $total_dirs;
	$structure['size'] = $total_size;		
	
	//~ if(!isset($_REQUEST['directory']) || empty($_REQUEST['directory'])){
		//~ $dir_contents = scandir(dirname(__DIR__));
	//~ }
	//~ else{
		//~ $dirname = end(explode("\/", $_REQUEST['directory']));
		//~ if($dirname==dirname(__FILE__)){
			//~ $dir_contents = scandir(dirname(__FILE__));		
		//~ }
	//~ }
	
	$dir_contents = scandir(dirname(__DIR__).'/users/'.$_SESSION['UID'].'/home/');
	$current_dir = dirname(__DIR__).'/users/'.$_SESSION['UID'].'/home/';
	
	foreach($dir_contents as $file){
		if($file=='.' || $file=='..'){ 
		} 
		else{
			array_push($structure['contents'], array(
				'date'=>date("d/m/Y H:i:s", filemtime($current_dir.$file)), 
				"type"=>(is_dir($file) ? '&lt;DIR&gt;' : (filesize($current_dir.$file)==4096 ? '&lt;DIR&gt;' : '')), 
				"size"=>(is_dir($file) ? '0' : filesize($current_dir.$file)),
				"file"=>$file
			));
			
			is_dir($file) ? $total_dirs += 1 : NULL;
			is_dir($file) ? NULL :  $total_files += 1;		
			
			$total_size += filesize($current_dir.$file);
		}
	}
	
	$structure['files'] = $total_files;
	$structure['dirs'] = $total_dirs;
	$structure['size'] = $total_size;		
	
	echo json_encode($structure);
?>
