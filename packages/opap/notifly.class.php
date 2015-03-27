<?php
/*
 * notifly.class.php
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

class notifly
{

	public static $output = array(
						"feed"=>"",
						"result"=>array()
					  );

	/**
	 * Constructor of class notifly.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}
	
	public static function error($message){
		notifly::$output['result'] = array("status"=>0, "type"=>"error", "output"=>$message);
		
	}
	
	public static function render($arr){
		notifly::$output['result'] =  array("status"=>1, "type"=>"feed", "output"=>$arr);
	}
	
	public function debug(){
		echo '<pre>';  
		print_r(notifly::$output);
		echo '</pre>';
	}
	
	public function stream($type='array'){		
		if($type=='json'){ 
			 return json_encode(notifly::$output);
		} 
		else{
			return notifly::$output;
		}	
	}

	

}
