	$.currVersion = '0.2.0 nightly';
	$.commands = {};
	$.performedCommands = new Array();
	
	
	
	Array.prototype.selected = 0;
	Array.prototype.last = function() {	
			if(this.selected==0){
				this.selected = (this.length-1);
			}
			else{
				this.selected = this.selected-1;
			}
			return this[this.selected];	
	}


	$(document).ready(function() {
		if(localStorage.getItem('consolioUID')){
			$.USERID = localStorage.getItem('consolioUID');
			
			// Preload the console with core commands and external ones
			$.preloadConsole();
			
			// prepare the shell
			$.initShell();
			
			$('#shell>input').focus();	
		}
		else{
			window.location.href = "error.php";
		}	
	
	});
	
	


	$(document).delegate('html', 'click', function(){		
		$('#shell>input').focus();	
	});
	

	
	$(document).delegate('#shell>input', 'keydown', function(event){
		if (!event)
			  event = window.event;
		 var code = event.keyCode;
		 if (event.charCode && code == 0)
			  code = event.charCode;
		 switch(code) {
			  case 38:
				  // Key up.
				  $('#shell>input').val($.performedCommands.last());
				  break;
			  case 13:
				  // Key down.
				  toPerform = $(this).val()
					$.shellExec(toPerform);	
					if($.performedCommands.length<5){
						$.performedCommands.push(toPerform);
					}
					else{
						$.performedCommands.shift();
						$.performedCommands.push(toPerform);
					}
				  $.performedCommands.selected = 0;	
				  $.cachePerformedCommands();
				  break;
		 }
	});
	
	
	$.preloadConsole = function(){
		
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem('commands')){
				$.commands = JSON.parse(localStorage.getItem('commands'));
			}
			else{
				$.loadFunctions();
			}	
		}
		else{
			$.loadFunctions();
		}
		
		
		
	}
	
	$.loadFunctions = function(){	
	
		$.getJSON( "core/console.commands.json", function( core ) {
			
			$.getJSON( "users/" + $.USERID + "/data/console.external.json?"+Date.now(), function( external ) {
							
				var len = $.map(external, function(n, i) { return i; }).length;
				
				// Are there any external functions loaded?
				if(len>0){
					$.commands = $.extend({}, core, external);
					//$.cacheCommands();
					
					// load the external js files
					$.loadExternalFunctions();
				}
				else{
					// Only load the core functions
					$.commands = core;
				}
				
			});	
		}).fail(function(d){
			//console.log(d);
		});	
	}
	
	$.cacheCommands = function(){
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("commands", JSON.stringify($.commands));	
		}
		else{
			console.log('No local storage support');
		}
	}

	$.loadExternalFunctions = function(){
		$.each($.commands, function(i, obj) {
			if(obj.src!='core' || !obj.src){
				// Check if the same js file is alreay loaded 
				
				if($("script[src*='"+obj.src+'?v='+obj.ver+"']").length==0){
					var script = document.createElement('script');
					script.src = obj.src+'?'+ Date.now() + '&v='+obj.ver;
					script.type = 'text/javascript';
					document.getElementsByTagName('head')[0].appendChild(script);
				}
			}
		});
		$.cachePerformedCommandsLoader();
	}
	
	
	$.shellExec = function(command){
		
		if($.feedback['status']==true){
			$.getFeedback($('#shell>input').val());
		}
		else{
			
			command_line = command.split(' ');
			new_command = command_line[0].toLowerCase();
			parameters = command.replace(new_command, '');
			parameters = parameters.trim();
			
			$('<p>>' + command +'</p>').insertBefore('#shell');
			
			if($.commands[new_command]){
				eval($.commands[new_command]['fn']);
			}
			else{
				
				// Check if it is a math calcuation or not
				var request = $.ajax({
						  url: "core/math.php",
						  type: "POST",
						  data: {  q: command },
						  dataType: "json"
						});
				request.done(function(data) {
					if(data.result){
						$.shellOutput(data.result);
					}
					else{
						$.shellError('Command not found. Type <b>help</b> for a list of available commands');
					}
				});
				
				request.fail(function( jqXHR, textStatus ) {
					$.shellError('Command not found. Type <b>help</b> for a list of available commands');;
				});
				// End of math checking
				
			}

			
		}
		
		$.shellLC();
	}
	
	$.shellError = function(error){
		$('<p class="out"><b class="red">Error:</b> '+ error+ '</p>').insertBefore('#shell');
	}
	
	$.shellDebug = function(msg){
		$('<p class="out"><b>Debug:</b><br /> '+ msg+ '</p>').insertBefore('#shell');
	}
	
	$.shellOutput = function(msg){
		$('<p class="out">'+ msg+ '</p>').insertBefore('#shell');
	}
	
	
	function ValidURL(str) {
	  var pattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
	  if(!pattern.test(str)) {
		return false;
	  } else {
		return true;
	  }
	}
	
	$.initShell = function(){
		$('<p class="green">Welcome to</p>').insertBefore('#shell');
        $.shellOutput('<pre class="cyan" id="logo"></pre>');   
        var randlogo = Math.floor((Math.random() * 7) + 1);
        $( "#logo" ).load( "assets/ascii/logo" +  randlogo +".html" );
        $.shellOutput('Type <b>help</b> for a list of available commands');
	}
	
	/* clear the command line */
	$.shellLC = function(){
		$('#shell>input').val('');
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}
	
	$.cachePerformedCommands = function(){
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("cachedCommands", JSON.stringify($.performedCommands));	
		}
		else{
			console.log('No local storage support');
		}
	}
	
	$.cachePerformedCommandsLoader = function(){
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem('cachedCommands')){
				$.performedCommands = JSON.parse(localStorage.getItem('cachedCommands'));
			}	
		}
		else{
			console.log('No local storage support');
		}
	}
	
	if(!($.feedback)){
		$.feedback = [];
		$.feedback['status'] = false;
		$.feedback['callback' ] = undefined;
		$.feedback['params'] = undefined;
	}
	
	$.setFeedback = function(callback, msg, parameters){
		$.shellOutput(msg);

		$.feedback['status'] = true;
		$.feedback['callback' ] = callback;
		$.feedback['params'] = parameters;
	}

	$.getFeedback = function(response){
		
		if(response=='y' || response=='Y' || response=='yes'){
			eval($.feedback['callback']($.feedback['params']));
		}
		else{
			$.shellOutput("Canceled last operation");
		}
		
		$.feedback['status'] = false;
		$.feedback['callback' ] = undefined;
		$.feedback['params'] = undefined;
	}
	
	
