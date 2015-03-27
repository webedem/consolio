$(document).ready(function() {
        var randlogo = Math.floor((Math.random() * 7) + 1);
        $( "#logo" ).load( "assets/ascii/logo" +  randlogo +".html" );
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
	
			  case 13:
				  // Key down.
				  toPerform = $(this).val()
				  if(toPerform=='github'){
					  $('<p>>' + toPerform +'</p>').insertBefore('#shell');
					  $.shellOutput("Connecting to GitHub...");
					  window.location.href = "https://github.com/webedem/consolio";
				  }
				  else if(toPerform=='get consolio'){
					  $('<p>>' + toPerform +'</p>').insertBefore('#shell');
					  $.shellOutput("Connecting to Google Chrome Webstore...");
					  window.location.href= "https://chrome.google.com/webstore/detail/consolio/khbaacdhddbfokkijhdhkbkjiddhcjmo";
				  }
				  else if(toPerform=='about'){
					  $('<p>>' + toPerform +'</p>').insertBefore('#shell');
					  $.shellOutput("<b>Consolio</b> is a fun weekend project by <b>Kris Leo</b>");
				  }
				  else if(toPerform=='help'){
					  $('<p>>' + toPerform +'</p>').insertBefore('#shell');
					  $.shellOutput("You need to download the <b>Chrome Extension</b> to access your own <b>consolio</b> instance. For information on how to build your own functions, visit the <b>Github</b> page");
				  }
				  else{
					  $('<p>>' + toPerform +'</p>').insertBefore('#shell');
					  $.shellError("Uknown function. Valid functions are: github or wget consolio");
				  }
				  
				  $.shellLC();
				  
				  break;
		 }
	});
	
	$.shellError = function(error){
		$('<p class="out"><b class="red">Error:</b> '+ error+ '</p>').insertBefore('#shell');
	}
	
	
	
	$.shellOutput = function(msg){
		$('<p class="out">'+ msg+ '</p>').insertBefore('#shell');
	}
	
	/* clear the command line */
	$.shellLC = function(){
		$('#shell>input').val('');
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}
