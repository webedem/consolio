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
	
	$.github = function(){
		 $.shellOutput("Connecting to GitHub...");
		 window.location.href = "https://github.com/webedem/consolio";
	}
	
	
	$.about = function(){
		 $.shellOutput("<b>Consolio</b> is an insomnia project by <b>Kris Leo</b>");
	}
	
	$.register = function(){
		if(localStorage.getItem('consolioUID')){
			window.location.href = "http://www.consolio.co/console";
		}
		else{
			var userid = getRandomToken();	
			$.shellOutput('Preparing your instance...');
			$('#init').append('<form action="http://www.consolio.co/init.php" id="initform" method="post"><input type="hidden" id="userid" name="userid" value="' + userid + '" /></form>');
			
			setTimeout(function(){
				  $('#initform').submit();	
			},(1000));
		}
	}
	

