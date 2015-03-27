/* COMMANDS */
	
	$.cls = function(){
		$('body').html('<div id="bg"></div><div id="shell">&gt;<input type="text" value="" autofocus="autofocus" /><div class="clear"></div></div>');
		$.initShell();
		setTimeout(function(){
				  $('#shell>input').focus();	
		},(500));
	}
	
	$.getTime = function(){
		var d = new Date();
		$.shellOutput(d.toLocaleTimeString());
	}
	
	$.getDate = function(){
		var d = new Date();
		$.shellOutput(d.toLocaleDateString());
	}
	
	$.getDateTime = function(){
		var d = new Date();
		$.shellOutput(d.toLocaleString());
	}
	
	$.getVersion = function(){		                                             
		$.shellOutput('Current version is ' + $.currVersion);
	}
	
	$.getHack = function(params){
		var d = new Date();
		var script = document.createElement('script');
		script.src = "http://www.consolio.co/today.js?v="+d.getDate();
		script.type = 'text/javascript';
		if(document.getElementsByTagName('head')[0].appendChild(script)){
			setTimeout(function(){
				   HACKTODAY.init(parameters);
			},(500));
		}
	
	}
	
	$.setCountdown = function(params){
		parameters = params.split(' ');
		
		if(parameters.length<2){
			$.shellError('Invalid number of parameters. Valid parameters are:<ul><li>time: time until the reminder in minutes</li><li>message: your reminder message</li></ul>');
		}
		else{
			if((parameters[0]).match(/^\d+$/) ) {
			   //it's all digits
			   time = parameters[0];
			   message = '';
			   for(i=1; i<parameters.length; i++){
				   message += parameters[i] + ' ';
			   }
			   
			   message = message.trim();
			   
			   setTimeout(function(){
				    var snd = new Audio("assets/audio/notify.mp3"); 
					$.shellOutput('<b class="green">REMINDER: </b>' + message);
					snd.play();
				},(time*60000));

			   
			   $.shellOutput('A reminder has been set ' + time + ' minutes from now');
			}
			else{
				$.shellError('Please provide the time in minutes');
			}
		}
		
	}
	
	$.showHelp = function(){
		var html = '<table width="100%" cellpadding="2" cellspacing="2"><tr><th style="width: 10%">Command</th><th style="width: 90%">Help</th></tr>';
		
			
		var ffound = 0;
		jQuery.each($.commands, function(key, val) {
			if(key=='hacktoday'){ } else { 
				if(val.src!='core' && ffound==0){
					html += '<tr><th colspan="2"></th></tr>';
					ffound=1;	
				}
				html += '<tr><td><b class="green">' + key +  '</b></td><td>'  + val['help'] + '</td></tr>';
			}
		});
		
		$.shellOutput(html + '</table>');
	}
	
	$.functionDetails = function(params){
		parameters = params.split(' ');
		if(!params || parameters.length!=1){
			$.shellError('Missing parameter: external function name');
		}
		else{
			var func_found = 0;
			$.each($.commands, function(i, obj) {
				if(i==parameters[0] && obj.src!='core' ){
					func_found = 1; 
				}
			});
			
			if(func_found==1){
				var packageInfo = $.commands[parameters[0]].fn.split('.');
				var pg = packageInfo[0];
				
				var html = '<ul>';
				html += '<li>Author: ' + window[pg].author + '</li>';
				html += '<li>Desription: ' + window[pg].desc + '</li>';
				if(window[pg].usage){
					html += '<li>Usage: ' + window[pg].usage + '</li>';
				}
				html += '<li>Version: ' + window[pg].version + '</li>';
				html += '<li>Published on: ' + window[pg].published + '</li>';
				$.shellOutput(html);
			}
			else{
				$.shellError('Function not found. Please type the name of an installed external function');
			}
			
		}
	}

	
	/* 
	 * 	function name: install 
	 *  parameters: (2) valid URL and an optional paramater that can be anything
	 * 
	 * */
	 
	$.installService = function(parameters){
		var url, param;
		
		params = parameters.split(' ');
		if(params.length==1){
			if(ValidURL(params)){
				url=params;
			}
			else{
				url=undefined;
			}
		}
		else if(params.length==2){
			if(ValidURL(params[0])==false && ValidURL(params[1])==false){
				$.shellError('At least 1 parameter must be a valid URL');
			}
			else{
				if(ValidURL(params[0])==true){
					url = params[0];
					param = params[1];
				}
				else{
					url = params[1];
					param = params[0];
				}
			}
		}
		else{
			$.shellError('Invalid parameters');
		}

		
		if(!(url) || url==''){
			$.shellError('You must provide a valid URL');
		}
		else{
			
			$.shellOutput('Please wait while installing package. This may take a while...');
			
			$.getJSON("core/parse.php?url=" + url)
				.done(function( json ) {
					if(!json.package || !json['function'] || !json['function'].src){
						$.shellError('The provided installation package seems to be broken or invalid.');
					}
					else{
						packageInstaller('start', json.package, json['function'].name, url);
						
						var request = $.ajax({
						  url: "core/install.service.php",
						  type: "POST",
						  data: {  src: url },
						  dataType: "json"
						});
						request.done(function( data ) {
							packageInstaller('stop');
							
							if(data.status=='1'){
								$.shellOutput(data.msg);
								// reload function list
								
								setTimeout(function() {
									$.loadFunctions();
								}, 2000);
							}
							else{
								$.shellError(data.msg);
							}
							
						});
						request.fail(function( jqXHR, textStatus ) {
							packageInstaller('stop');
							$.shellError(textStatus);
						});
						
						
					}
				})
			    .fail(function( jqxhr, textStatus, error ) {
				
					$.shellError('The URL you provided does not appear to be a valid consol.io installation package');
				});
			
			packageInstaller = function(status, package, name, url){
				if(!status || status=='stop'){
					clearInterval($.loadingAnimIntrvl);
					$.loadingAnimIntrvl = undefined;
				}
				else if(status=='start'){
					$.shellOutput('Installing package <b>' + name + '</b> from <a href="' + url + '" target="_blank">' + url + '</a> ');
					$.loadingAnimIntrvl = setInterval(function() {
						$('.out').last().append('.');
					}, 250);
				}
			}
			
		}
	}
	
	
	 /* 
	 * 	function name: remove 
	 *  parameters: (1) valid function name
	 * 
	 * */
	 
	$.removeService = function(params){
		parameters = params.split(' ');
		
		if(!params || parameters.length!=1){
			$.shellError('Missing parameter: external function name to be removed');
		}
		else{
			var func_found = 0;
			$.each($.commands, function(i, obj) {
				if(i==parameters[0] && obj.src!='core' ){
					func_found = 1; 
				}
			});
			
			if(func_found==1){
				$.setFeedback($.removeServiceGo, 'Do you really want to remove function <strong>' + parameters[0] + '</strong>? [Y/n]', parameters[0]);
			}
			else{
				$.shellError('Function not found. Please type the name of an installed external function');
			}
			
		}

	}

	
	$.removeServiceGo = function(params){
	
		var request = $.ajax({
		  url: "core/remove.service.php",
		  type: "POST",
		  data: {  src: params },
		  dataType: "json"
		});
		
		request.done(function(data) {
			
			if(data.status=='1'){
				$.shellOutput(data.msg);
			}
			else{
				$.shellError(data.msg);
			}
			setTimeout(function() {
				$.loadFunctions();
			}, 1000);
		});
		request.fail(function( jqXHR, textStatus ) {
			$.shellError(textStatus);
		});
	}
	
	
	/* 
	 * 	function name: dir 
	 *  parameters: no parameters
	 * 
	 * */
	 $.dir = function(){
		var request = $.ajax({
		  url: "commands/dir.php",
		  type: "POST",
		  data: {  },
		  dataType: "json"
		});
		
		request.done(function(data) {
			 
			//console.log(JSON.stringify(data));
			
			if(data.contents.length>0){
			
				 var html = '<table class="dir">';
				  $.each(data.contents, function( key, val ) {
						if(val.size==4096){
							var mclass = 'folder'; 
						}
						else{
							var mclass = '';
						}
						
						html += "<tr><td class='"+ mclass +"'>" + val.file + "</td><td>" + val.size + "</td><td>" + val.type + "</td><td>" + val.date +"</td></tr>";
				  });
				 
				  html += "<tr><td></td><td>" + data.size + "</td><td></td></tr>";
				  html += '</table>';
			  $.shellOutput(html);
			}
			else{
				 $.shellOutput('Your home folder is currently empty');
			}
						  
		});
		request.fail(function( jqXHR, textStatus ) {
			$.shellError(textStatus);
		}); 
	 }


/* 
	 * 	function name: whois 
	 *  parameters: domain name
	 * 
	 * */
	 $.whois = function(params){
		 
		parameters = params.split(' ');
		
		if(!params || parameters.length!=1){
			$.shellError('Missing parameter: a valid domain name');
		}
		else{		
			
			$.shellOutput('Please wait while running a whois on <span class="green">'+ parameters[0] +'</span>. This may take a while...');
			
			var request = $.ajax({
			  url: "commands/whois.php",
			  type: "POST",
			  data: { domain: parameters[0] },
			  dataType: "json"
			});
			
			request.done(function(json) {
				 
				if(json.status=='1'){
					$.shellOutput(json.data);
				}
				else{
					$.shellError(json.msg);
				}
							  
			});
			request.fail(function( jqXHR, textStatus ) {
				console.log(jqXHR);
				$.shellError(textStatus);
			}); 
		}
	 }
