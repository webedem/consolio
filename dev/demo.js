;DEMOFUNCTION = {
	
	name: 'DEMOFUNCTION',
	desc: 'This function does this and that',
	usage: 'Type demo to run this command',
	author: 'Kris Leo',
	version: '0.1',
	published: '10/01/2015',
	
	init: function(params){
		// Output on consolio:
		$.shellOutput('This is a demo function');
		
		// Output an error on consolio
		$.shellError('Oh, oh! An error occured');
	}

}
