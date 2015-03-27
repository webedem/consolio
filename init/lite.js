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
			window.location.href = "http://www.consolio.co/console";
		}
		
		
		// Preload the console with core commands and external ones
		$.preloadConsole();
		
		// prepare the shell
		$.initShell();
		
		$('#shell>input').focus();

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
		
		$.loadFunctions();
	
	}
	
	$.loadFunctions = function(){	
	
		$.getJSON( "init/console.commands.json", function( core ) {
			
			$.commands = core;
			
			
		}).fail(function(d){
			//console.log(d);
		});	
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
	
	
	
	
	$.initShell = function(){
		$('<p class="green">Welcome to</p>').insertBefore('#shell');
        $.shellOutput('<pre class="cyan" id="logo"></pre>');   
        var randlogo = Math.floor((Math.random() * 7) + 1);
        $( "#logo" ).load( "assets/ascii/logo" +  randlogo +".html" );
        $.shellOutput('<span class="cyan">Consolio</span> is an open-source, cloud console where you can create your own functions in any scripting language you want or install functions from others');
        $.shellOutput('<span class="red">Note:</span> This is the limited version. To get your own instance with all the core functions and ability to install new, type <b>newuser</b>');
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
	
	function getRandomToken() {
		// E.g. 8 * 32 = 256 bits token
		var randomPool = new Uint8Array(32);
		crypto.getRandomValues(randomPool);
		var hex = '';
		for (var i = 0; i < randomPool.length; ++i) {
			hex += randomPool[i].toString(16);
		}
	   
		return hex;
	}
	
	
