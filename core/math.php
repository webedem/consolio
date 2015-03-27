<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");

if(!isset($_POST['q']) || empty($_POST['q'])){
	die('{"result":null}');
}
else{
	echo json_encode(array("result"=>calc($_POST['q'])));
}

function calc($equation){
    // Remove whitespaces
    $equation = preg_replace('/\s+/', '', $equation);

    $number = '((?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?|pi|π)'; // What is a number

    $functions = '(?:sinh?|cosh?|tanh?|acosh?|asinh?|atanh?|exp|log(10)?|deg2rad|rad2deg|sqrt|pow|abs|intval|ceil|floor|round)'; // Allowed PHP functions
    $operators = '[\/*\^\+-,]'; // Allowed math operators
    $regexp = '/^([+-]?('.$number.'|'.$functions.'\s*\((?1)+\)|\((?1)+\))(?:'.$operators.'(?1))?)+$/'; // Final regexp, heavily using recursive patterns

    if (preg_match($regexp, $equation))
    {
        $equation = preg_replace('!pi|π!', 'pi()', $equation); // Replace pi with pi function
        eval('$result = '.$equation.';');
    }
    else
    {
        $result = null;
    }
    return $result;
}
?>
