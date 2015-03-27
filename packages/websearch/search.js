;WEBSEARCH = {
	
	name: 'WEBSEARCH',
	desc: 'This function performs a web search in Google, Yahoo, DuckDuckGo and Bing',
	usage: 'Type search followed by -g (for google) or -b (for bing) or -d (for duck duck go) or -y (for Yahoo) and then your keywords',
	author: 'Kris Leo',
	version: '1.0',
	published: '24/02/2015',
	
	init: function(params){
		var parameters, engine;
		parameters = params.split(' ');
		
		if(parameters.length<=1){
			$.shellError('Search term cannot be blank. For help type "info search"');
		}
		else{
			
			var search_term = '';
			for(i=1; i<=parameters.length; i++){
				if(parameters[i]!='' && parameters[i]!=null){
					search_term += parameters[i] + ' ';
				}
			}
			
			search_term = search_term.trim();
			
			
			if(parameters[0]=='-g'){
				engine = 'https://www.google.com/search?q=' + encodeURIComponent(search_term);	
				WEBSEARCH.gosearch(engine);
			}
			
			else if(parameters[0]=='-b'){
				engine = 'http://www.bing.com/search?q=' + encodeURIComponent(search_term);	
				WEBSEARCH.gosearch(engine);
			}
			else if(parameters[0]=='-y'){
				engine = 'https://search.yahoo.com/search?p=' + encodeURIComponent(search_term);	
				WEBSEARCH.gosearch(engine);
			}
			
			else if(parameters[0]=='-d'){
				engine = 'https://duckduckgo.com/?q=' + encodeURIComponent(search_term);	
				WEBSEARCH.gosearch(engine);
			}
			else{
				$.shellError('Invalid parameter. Type "info search" for help');
			}
		}
		
	},
	gosearch: function(url){
		var win = window.open(url, '_blank');
		if(win){
			win.focus();
		}else{
			$.shellError('Web search popup has been blocked by your browser');
		}
	}

}
