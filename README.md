# Consolio
##A cloud console in your Google Chrome browser

###Overview

Consolio is an open-source cloud console were you can install external functions.

JQuery based web console, with some build-in functions. 
You can create your own functions in any scripting language you want 
(check the function_development folder for details), define an installation JSON package 
and then install that function at your consolio instance.

If you are a developer, you can build your own functions in JS and any server-side scripting language you want. 

You will need a package.json file for installing your command (sample here: http://www.consolio.co/packages/sample-package.json) and your JS file which will contain the default constructor and your custom functions (sample here: http://www.consolio.co/packages/demo.js)

You can install external functions by referencing the package.json URL of that function.

You can test install a third-party function called styleme by typing (within your instance):

>install http://www.consolio.co/packages/styleme/package.json

and then to see how to run it (manual)

>info styleme

---------------------------------

changelog:

v0.1
* Initial commit

