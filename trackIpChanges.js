const fs = require('fs');
const path = require('path');
const fetchIpAddress = require('./utils/getIpAddress');

const ipFilePath = path.join(__dirname, '../ip.txt');

const trackIpChanges = async() => {
    const currentIp = await fetchIpAddress();
    if (!currentIp) return;

    try {
        const previousIp = fs.readFileSync(ipFilePath, 'utf8');

        if (currentIp !== previousIp) {
            fs.writeFileSync(ipFilePath, currentIp);
            console.log('IP address changed. Updated in file.');
        }
    } catch (error) {
        fs.writeFileSync(ipFilePath, currentIp);
        console.log('IP address saved to file for the first time.');
    }
};

setInterval(trackIpChanges, 60000); // Check every minute