<?php
	header("content-type: application/json"); 
	header("access-control-allow-origin: *");
	
	if(!isset($_GET['url']) || empty($_GET['url'])){
		die("callback({'status':0, 'msg':'URL is invalid'})");
	}
	else{
		$url = urldecode($_GET['url']);
		
		$data = file_get_contents($url);
		$found_pos =  strpos($data, '#bg{');
		if($found_pos===false){
			die("callback({'status':0,'msg':'Cannot find the #bg style element in the provided URL'})");
		}
		else{
			$css = substr($data, $found_pos);
			$css = substr($css, 0, strpos($css, '}')+1);
			
			$output = array("status"=>1, "msg"=>($css));
			echo "callback(".json_encode($output).")";
		}
	
		
	}


?>
