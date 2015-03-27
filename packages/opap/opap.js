;OPAP = {
	
	name: 'OPAP',
	desc: 'Shows the latest LOTTO and JOKER results from OPAP',
	author: 'Kris Leo',
	version: '0.11',
	published: '15/01/2015',
	
	init: function(params){
		if(params=='' || !params){
			$.shellError('Invalid parameters provided. Valid parameters are <strong>joker</strong> and <strong>lotto</strong>');
		}
		else if(params=='joker'){

			$.ajax({
				url: 'http://www.consolio.co/packages/opap/opap.php?src=joker',
				dataType: 'JSONP',
				jsonpCallback: 'callback',
				type: 'GET',
				jsonp: 'jsonp',
				success: function (json) {
					if(json.result.status=='1'){
						$.shellOutput('Lotto results for <b class="green">' + json.result.output.timestamp + '</b>');
						var html = '';
						$.each(json.result.output.numbers, function(i, obj) {
							html += '<b class="green">' + obj + '</b>, ';
						});
						$.shellOutput('Numbers: ' + html.slice(0, -2) + ' joker: <b class="green">' + json.result.output.joker + '</b>');
					}
					else{
						$.shellError('Could not fetch the latest JOKER results from OPAP. Please try again later.');
					}
				},
				error: function(xhr){
					$.shellError('Could not fetch the latest JOKER results from OPAP. Please try again later.');
				}
			});

		}
		else if(params=='lotto'){
			$.ajax({
				url: 'http://www.consolio.co/packages/opap/opap.php?src=lotto',
				dataType: 'JSONP',
				jsonpCallback: 'callback',
				type: 'GET',
				jsonp: 'jsonp',
				success: function (json) {
					if(json.result.status=='1'){
						$.shellOutput('Lotto results for <b class="green">' + json.result.output.timestamp + '</b>');
						var html = '';
						$.each(json.result.output.numbers, function(i, obj) {
							html += '<b class="green">' + obj + '</b>, ';
						});
						$.shellOutput('Numbers: ' + html.slice(0, -2));
					}
					else{
						$.shellError('Could not fetch the latest LOTTO results from OPAP. Please try again later.');
					}
				},
				error: function(xhr){
					$.shellError('Could not fetch the latest LOTTO results from OPAP. Please try again later.');
				}
			});
		}
		else{
			$.shellError('Invalid parameters provided. Valid parameters are <strong>joker</strong> and <strong>lotto</strong>');
		}	
	}

}
