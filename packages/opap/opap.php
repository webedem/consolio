<?php
	header("content-type: application/json"); 
	include_once 'opap.class.php';
	
	$feed = new notifly\opap();
	
	if(!isset($_GET['src']) || empty($_GET['src'])){
		$feed->getJoker();
	}
	elseif($_GET['src']=='lotto'){
		$feed->getLotto();	
	}
	else{
		$feed->getJoker();
	}
	
	
	$t = $feed->stream('json');
	echo "callback(".$t.")";
	
	
	
?>
