;STYLEME = {
	
	name: 'STYLEME',
	desc: 'Import an external CSS to style the shell\'s background (#bg div) ',
	usage: 'styleme -themes OR styleme themename OR styleme CSS_URL',
	author: 'Kris Leo',
	version: '0.1',
	published: '01/02/2015',
	
	
	
	init: function(params){
		var parameters, url;
		
		$.basePath = 'http://www.consolio.co/packages/styleme/';
		
		parameters = params.split(' ');
		
		if(parameters.length!=1){
			$.shellError('Invalid number of parameters. Valid parameter is an external CSS file containing the #bg stylesheet.');
		}
		else{
			if(ValidURL(parameters[0])){
				$.shellOutput('Importing stylesheet from ' + parameters[0]);
				
				
				STYLEME.loadCSS(parameters[0]);
				
			}
			else{
				if(parameters[0]=='-themes'){
					$.getJSON($.basePath + "themes.json", function(data) {
						  var html = '<ul>';
						  $.each(data, function( key, val ) {
							html += "<li id='" + key + "'>" + val.name + "</li>";
						  });
						 
						  html += '</ul>';
						  $.shellOutput(html);
					});
				}				
				else{
					themename = parameters[0];
					
					try{
						$.getJSON( $.basePath +  "themes.json", function(data) {
							  var found = false;
							  var css_url;
							  
							  $.each(data, function( key, val ) {
									if(val.name==themename){
										found=true;
										css_url = $.basePath + val.link;
									}
							  });
							 
							  if(found==true){
								  STYLEME.loadCSS(css_url);
							  }
							  else{
								  $.shellError('At least 1 parameter must be a valid URL pointing to a CSS file');
							  }
							  
						});
					}
					catch(err){
						$.shellError('Could not load the core styleme themes');
					}
					
				}
			}
		}
		
	},
	loadCSS: function(path){
		$.shellOutput('Importing stylesheet from ' + path);			
				
		$.ajax({
			url: $.basePath + 'process.php?url=' + encodeURIComponent(path),
			dataType: 'JSONP',
			data: { url: path },
			jsonpCallback: 'callback',
			jsonp: 'jsonp',
			success: function (json) {
				
				if(json.status=='1'){
					
					$("<style type='text/css'>" + json.msg + "</style>").appendTo("head");
					localStorage.setItem("styleme", json.msg);
				}
				else{
					$.shellError(json.msg);
				}
			},
			error: function(xhr){
				$.shellError('Could not fetch the provided CSS URL. Please try again later.');
			}
		});
	}
}

$(function() {
	var css = localStorage.getItem("styleme");
	if(css){
		$("<style type='text/css'>" + css + "</style>").appendTo("head");
	}
});


