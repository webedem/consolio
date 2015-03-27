;TRANSLATE = {
	
	name: 'TRANSLATE',
	desc: 'Translate a text to another language',
	usage: 'translate lang_code_from lang_code_to and then your text (example: translate en el This is a test',
	author: 'Kris Leo',
	version: '0.1',
	published: '24/02/2015',
	
	init: function(params){
		if(params=='' || !params){
			$.shellError('Invalid parameters provided. Valid parameters are <strong>lang_code_from</strong>, <strong>lang_code_to</strong> and your text');
		}
		else{
			parameters = params.split(' ');
			
			var fl, tl, query;
			
			fl = parameters[0];
			tl = parameters[1];
			
			query = '';
		    for(i=2; i<parameters.length; i++){
			   query += parameters[i] + ' ';
		    }
		   
		    query = query.trim();
		    
			   var request = $.ajax({
				  url: "test.php",
				  type: "POST",
				  data: { froml: fl, tol: tl, q: query },
				  dataType: "html"
				});
				
				request.done(function(data) {
					console.log(data);
				});
				request.fail(function( jqXHR, textStatus ) {
					$.shellError(textStatus);
				}); 
			
		    //$.shellOutput(fl + ' / ' + tl + ' / ' + query);
		}
	}

}
