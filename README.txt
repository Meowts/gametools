**********************************************
			How to make it werk
**********************************************

H'okay, so here's how to get this project running:



*********************
	Install Node
*****

Node is an incredibly compact Javascript based server. This project needs to be
accessed through a server (any kind, node is just fast and easy) in order for it 
to work, for reasons that are not really worth going into much detail further 
than "It won't work otherwise" (it's due to the game framework, Phaser).

To install, just go to:

https://nodejs.org/download/

Pick the appropriate installer as per your OS, install it and you're almost done.



*********************
	NPM
*****

NPM is a package manager (lol package manager). It's also used as a utility for
actually getting Node up and running, and Node comes with NPM pre-installed.

So now that you're here, in your favourite command line interface (cmd for PC,
terminal for Mac), cd your digital tendrils to this directory and run:

npm start

Crazy. You should get a confirmation message, and it will tell you what port
it's running on. It's set to 8080, if under some strange circumstance there's
a conflict with that (highly unsuspected but just in case), you can pick any 
port you want by editing server.js (the variable named "port").

*Note: once it's running, your CLI will look like it's frozen in time - it's not,
it's just having a great time working the process of running the server. To
interrupt its elated endeavors, type CTRL+C and the server will stop.



*********************
	Do it
*****

Upon your most decadent browser, set its URL to:

localhost:8080

Erbviously replace 8080 with whatever port you chose if chosen.



*********************
	Change Sprite
*****

*Instructions found in /states/load.js*