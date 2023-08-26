// src/apiConfig.js
import fs from 'fs';
import path from 'path';

const ipFilePath = path.join(__dirname, '../ip.txt');
const savedIp = fs.readFileSync(ipFilePath, 'utf8').trim();

export const apiUrl = `http://${savedIp}:5001`; // Use the saved IP address

// ...

// Use the apiUrl in your Axios requests
const response = await axios.get(`${apiUrl}/teamSchedule?date=${pktDate.toISO()}`);