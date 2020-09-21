DNS PROJECT

1. DNS Cache must be cleared for proper working
	ipconfig /flushdns
	clear app cache on mobile devices

2. Need npm install manager

3. npm will install the following dependencies
	native-dns
	native-dns-packet
	readline
	fs
	http
	https

4. Run startup.sh as admin
	If you are running on windows
	Don't run the shell script
	-> Open a terminal in the workspace
	-> Run "npm install"
	-> Run server_DNS.js using node.js

5. Set your router to manual DNS assignment and set the IP to private IP of the machine on which you are running the script

6. debug showing -> wireshark test
				 -> nslookup ${url} ${//DNS URL}
