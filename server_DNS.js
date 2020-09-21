const dns = require('native-dns');
const packet = require('native-dns-packet');
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./.data/block.raw')
});
const fs = require('fs').appendFileSync;

//block.raw -> all urls to be blocked {enter keywords...ex: google, youtube}
//data.raw -> all urls requests recieved
//blocked.raw -> all url requests blocked with timestamps
//allowed.raw -> all url requests allowed with timestamps

process.stdout.write("initializing DNS server...\n");
var block = false;
var urlfind = false;
var host = "";
var blockStr = "";
var myDate = new Date();
var urls = {};
const SERVFAIL = packet.consts.NAME_TO_RCODE.SERVFAIL;
var server = dns.createServer();

//read all the blocked urls from 'block.raw'
process.stdout.write("loading data...\n");
lineReader.on('line', line => {
    urls[line] = true;
});

//input 'block'/'allow' cmds on terminal -> default 'allow'
process.stdin.on('data', data => {
    if (data.toString('utf-8', 0, 5) == "block") {
        block = true;
        process.stdout.write("All the URLS will be filtered!!!\n");
    } else if (data.toString('utf-8', 0, 5) == "allow") {
        block = false;
        process.stdout.write("URL filtering is now turned off...\n");
    } else {
        process.stdout.write("INVALID ARG: " + data.toString('utf-8', 0, data.length - 2) + "\n");
    }
});

//default port is 53, change the IP in DNS.js and HTTP.js accordingly
process.stdout.write("serving on 192.168.0.102...\n");
server.serve(53, '192.168.0.102');
server.on('error', (err, buff, req, res) => process.stdout.write(err.stack + "\n"));
server.on('request', (req, res) => {
    var temp = req.header.
    host = req.question[0].name.toString();
    if (block === true) {
        //If url filtering is ON, search for url in database
        for (const [key, value] of Object.entries(urls)) {
            if (host.search(key) != -1) {
                urlfind = true;
                break;
            }
        }
    }
    //log data in 'data.raw'
    fs('./.data/data.raw', host + '\r\n');
    myDate = new Date();
    blockStr = myDate.getDate() + "-" + myDate.getMonth() + "-" + myDate.getFullYear() + "<--->";
    blockStr += myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + ":" + myDate.getMilliseconds() + "<--->";
    blockStr += host;
    //log data and block/allow the request accordingly
    if (block === true && urlfind === true) {
        fs('./.data/blocked.raw', blockStr + '\r\n');
        host = '192.168.0.102';
    } else {
        fs('./.data/allowed.raw', blockStr + '\r\n');
    }
    blockStr = "";
    urlfind = false;
    switch (host) {
        case '192.168.0.102':
            //for blocked urls, response is the IP to local HTTP server
            //server_HTTP.js is optional to show the 'site blocked' message
            res.answer.push(dns.A({
                name: req.question[0].name.toString(),
                address: '192.168.0.102',
                ttl: 30
            }));
            res.send();
            break;
        case '102.0.168.192.in-addr.arpa':
            //while using dns lookup cmd
            res.answer.push(dns.A({
                name: 'dns.localserver.com',
                address: '192.168.0.102',
                ttl: 30
            }));
            res.send();
            break;
        case '1.0.168.192.in-addr.arpa':
            //while using dns lookup cmd
            res.answer.push(dns.A({
                name: 'dns.localserver.com',
                address: '192.168.0.102',
                ttl: 30
            }));
            res.send();
            break;
        default:
            //send the response as DNS request to ISP server
            res.header.rcode = SERVFAIL;
            var innerreq = dns.Request({
                question: req.question[0],
                server: {
                    address: '202.83.30.6',
                    type: 'udp',
                    port: 53,
                },
                cache: false,
            })
            innerreq.send();
            innerreq.on('message', (err, innerRes) => {
                res.header.rcode = innerRes.header.rcode;
                res.answer = innerRes.answer;
                res.additional = innerRes.additional;
                res.authority = innerRes.authority;
            });
            innerreq.on('end', () => res.send());
            break;
    }
    host = "";
});
process.stdout.write("All URLs are allowed!!!\n");