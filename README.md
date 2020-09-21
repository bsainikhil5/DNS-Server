# DNS SERVER

The following project is created with the help of Node.js

The DNS server is located on LAN. The DNS IP for all the hosts on the LAN must be the private IP of the device on which the program is running.

The server can block urls and logs the dns queries recieved in "./.data/data.raw"

"./.data/block.raw" contains the urls which can be blocked

"192.168.0.102" is default private IP, need to change to the private IP of device on which the server is running

'.raw' files in '.data' folder can be opened with any text editor to see the contents


## Installation

Requires Node.js and npm package installation manager

For proper working DNS Cache must be cleared
```bash
for windows use ${ipconfig /flushdns}
for mobile devices, clear the app cache
```
the npm package manager will install the following dependencies;

```
native-dns
native-dns-packet
readline
fs
http
https
```
Run the startup.sh script file with root access
```bash
npm install
gnome-terminal -e "node server_HTTP.js"
gnome-terminal -e "node server_DNS.js"
```

## Usage

In the DNS Server terminal, $allow and $block will turn the URL filtering on/off

```bash
allow
block
```
URL filtering can be used for blocking the ADS throughout the device or even for blocking websites in a work environment

## Limitations
Everytime a host send a DNS query, the response i.e, the IP address of the URL will be valid for certain time. So everytime, the browser enters the URL, corresponding IP address query will be done only once.

So once the URL filtering is turned on, some of the responses will be cached locally in the host machine and will be valid, so the URL filtering might not work properly for some time due to the cached responses (generally for 600sec, i.e the DNS ttl for many URLs)

Clearing the DNS cache on device will resolve the issue.
