<?php
/*
 * opap.class.php
 * 
 * Copyright 2014 Kris <kris@kris-ubuntu>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */

namespace notifly;

require_once "notifly.class.php";

class opap extends notifly
{

	/* CONFIGURATION */
	private $feedname = "opap";


	/**
	 * Constructor of class opap.
	 *
	 * @return void
	 */
	public function __construct()
	{
		notifly::$output['feed']=$this->feedname;
	}
	
	
	/* LOTTO RESULTS */
	function getLotto($date=null){
		
		if(!isset($date) || empty($date) || $date==null){
			$mode = "single";
			$url = "http://applications.opap.gr/DrawsRestServices/lotto/last.json";
		}
		else{
			$date = date("d-m-Y", strtotime($date));
			$mode = "multiple";
			$url = "http://applications.opap.gr/DrawsRestServices/lotto/drawDate/".($date).".json";
		}

		
		$lotto = file_get_contents($url);
		
		
		$return = json_decode($lotto);
		

		if($mode=='single'){
			if(!isset($return->draw)){
				notifly::error("Cannot fetch results");
			}
			else{

				$numbers  = array(
								"1"=>$return->draw->results[0], 
								"2"=>$return->draw->results[1],
								"3"=>$return->draw->results[2], 
								"4"=>$return->draw->results[3],
								"5"=>$return->draw->results[4],
								"6"=>$return->draw->results[5]
							);
				
				sort($numbers,SORT_NUMERIC);
				
				array_unshift($numbers, null);
				unset($numbers[0]);

				
				$output = array("timestamp"=>$return->draw->drawTime, 
								"draw_number"=>$return->draw->drawNo, 
								"numbers"=>$numbers
								);
				
				notifly::render($output);
			}
		}
		else{

			if(!isset($return->draws->draw[0]->drawTime)){
				notifly::error("Cannot fetch results");
			}
			else{
				$numbers  = array(
								"1"=>$return->draws->draw[0]->results[0], 
								"2"=>$return->draws->draw[0]->results[1],
								"3"=>$return->draws->draw[0]->results[2], 
								"4"=>$return->draws->draw[0]->results[3],
								"5"=>$return->draws->draw[0]->results[4]
							);
				
				sort($numbers,SORT_NUMERIC);
				
				array_unshift($numbers, null);
				unset($numbers[0]);

				
				$output = array("timestamp"=>$return->draws->draw[0]->drawTime, 
								"draw_number"=>$return->draws->draw[0]->drawNo, 
								"numbers"=>$numbers
								);
				
				notifly::render($output);
			}
			
			
		}
		
	}
	
	
	/* JOKER RESULTS */
	
	function getJoker($date=null){
		
		if(!isset($date) || empty($date) || $date==null){
			$mode = "single";
			$url = "http://applications.opap.gr/DrawsRestServices/joker/last.json";
		}
		else{
			$date = date("d-m-Y", strtotime($date));
			$mode = "multiple";
			$url = "http://applications.opap.gr/DrawsRestServices/joker/drawDate/".($date).".json";
		}

		
		$joker = file_get_contents($url);
		
		
		$return = json_decode($joker);
		

		if($mode=='single'){
			if(!isset($return->draw)){
				notifly::error("Cannot fetch results");
			}
			else{

				$numbers  = array(
								"1"=>$return->draw->results[0], 
								"2"=>$return->draw->results[1],
								"3"=>$return->draw->results[2], 
								"4"=>$return->draw->results[3],
								"5"=>$return->draw->results[4]
							);
				
				sort($numbers,SORT_NUMERIC);
				
				array_unshift($numbers, null);
				unset($numbers[0]);

				
				$output = array("timestamp"=>$return->draw->drawTime, 
								"draw_number"=>$return->draw->drawNo, 
								"numbers"=>$numbers,
								"joker"=>$return->draw->results[5]);
				
				notifly::render($output);
			}
		}
		else{

			if(!isset($return->draws->draw[0]->drawTime)){
				notifly::error("Cannot fetch results");
			}
			else{
				$numbers  = array(
								"1"=>$return->draws->draw[0]->results[0], 
								"2"=>$return->draws->draw[0]->results[1],
								"3"=>$return->draws->draw[0]->results[2], 
								"4"=>$return->draws->draw[0]->results[3],
								"5"=>$return->draws->draw[0]->results[4]
							);
				
				sort($numbers,SORT_NUMERIC);
				
				array_unshift($numbers, null);
				unset($numbers[0]);

				
				$output = array("timestamp"=>$return->draws->draw[0]->drawTime, 
								"draw_number"=>$return->draws->draw[0]->drawNo, 
								"numbers"=>$numbers,
								"joker"=>$return->draws->draw[0]->results[5]);
				
				notifly::render($output);
			}
			
			
		}
		
	}

}

?>
