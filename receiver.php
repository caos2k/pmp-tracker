<?php

	header("Expires: on, 01 Jan 1970 00:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	$dataSent = $_REQUEST['date'];
	$cellRow = $_REQUEST['cellRow'];
	$cellCol = $_REQUEST['cellCol'];
	$clicked = $_REQUEST['clicked'];
	echo "\n / dataSent \ \n";
	echo $dataSent;
	echo "\n / clicked \ \n";
	echo $clicked;
	$clickedIndex = $_REQUEST['index'];
	
	$contents = file_get_contents('db.json');
	$contentsDecoded = json_decode($contents, true);
	
	foreach($contentsDecoded["list"] as $day) {
		//print_r($day);
		if ($day["date"] == $dataSent) {
			if ($clicked == 1) {
				echo "\n";
				echo "TRUE";
				$contentsDecoded["list"][$clickedIndex]["todos"][$cellCol]["completed"] = 1;
			} 
			if ($clicked == 0) {
				echo "\n";
				echo "FALSE";
				$contentsDecoded["list"][$clickedIndex]["todos"][$cellCol]["completed"] = 0;
			}
	    }
	}

	$json = json_encode($contentsDecoded);
	file_put_contents('db.json', $json);
?>