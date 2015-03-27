;DEMOFUNCTION = {
	
	name: 'DEMOFUNCTION',
	desc: 'This function does this and that',
	usage: 'Type demo to run this command',
	author: 'Kris Leo',
	version: '0.1',
	published: '10/01/2015',
	
	init: function(params){
		/*
		   init is the default constructor. Here you can add your own code or call other functions.
		   You need to change the namespace (DEMOFUNCTION) to your own namespace (something to avoid confussions with others)
		   
		   The only two functions needed for outputing something on the console are $.shellOutput('your message') and $.shellError('your error message')
		*/
		
		// Output on consolio:
		$.shellOutput('This is a demo function');
		
		// Output an error on consolio
		$.shellError('Oh, oh! An error occured');
	}

}
