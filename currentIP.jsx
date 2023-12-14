// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { getLocalIpAddress } from 'react-native-local-ipaddress';

// function getIPRange(start, end) {
//   const startArray = start.split('.').map(Number);
//   const endArray = end.split('.').map(Number);
//   const ipAddresses = [];

//   for (let a = startArray[0]; a <= endArray[0]; a++) {
//     for (let b = startArray[1]; b <= endArray[1]; b++) {
//       for (let c = startArray[2]; c <= endArray[2]; c++) {
//         for (let d = startArray[3]; d <= endArray[3]; d++) {
//           ipAddresses.push(`${a}.${b}.${c}.${d}`);
//         }
//       }
//     }
//   }

//   return ipAddresses;
// }

// function isPrivateIP(ip) {
//   const privateIPRanges = [
//     ...getIPRange('10.0.0.0', '10.255.255.255'),
//     ...getIPRange('172.16.0.0', '172.31.255.255'),
//     ...getIPRange('192.168.0.0', '192.168.255.255'),
//   ];

//   return privateIPRanges.includes(ip);
// }

// const currentIP = () => {
//   const [privateIPs, setPrivateIPs] = useState([]);

//   useEffect(() => {
//     const fetchPrivateIPs = async () => {
//       try {
//         const localIPs = await getLocalIpAddress();
//         setPrivateIPs(localIPs.filter(ip => isPrivateIP(ip)));
//       } catch (error) {
//         console.error('Error fetching private IP addresses:', error.message);
//       }
//     };

//     fetchPrivateIPs();
//   }, []);

//   return (
//     <View>
//       <Text>All Private IP Addresses: {JSON.stringify(privateIPs)}</Text>

//       {privateIPs.length > 1 && (
//         <View>
//           <Text>Current Private IP Address: {privateIPs[1]}</Text>
//           <Text>Is Current Private IP in Private IP Range: {String(isPrivateIP(privateIPs[1]))}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default currentIP;


import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from 'react-native-network-info';

function isPrivateIP(ip) {
  // Define your private IP ranges
  const privateIPRanges = [
    '10.0.0.0-10.255.255.255',
    '172.16.0.0-172.31.255.255',
    '192.168.0.0-192.168.255.255',
  ];

  return privateIPRanges.some(range => {
    const [start, end] = range.split('-');
    return compareIPs(ip, start) >= 0 && compareIPs(ip, end) <= 0;
  });
}

function compareIPs(ip1, ip2) {
  const ip1Parts = ip1.split('.').map(Number);
  const ip2Parts = ip2.split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if (ip1Parts[i] !== ip2Parts[i]) {
      return ip1Parts[i] - ip2Parts[i];
    }
  }

  return 0;
}

const currentIP = () => {
  const [localIP, setLocalIP] = useState(null);

  useEffect(() => {
    const fetchLocalIP = async () => {
      try {
        const ipAddress = await NetInfo.getIPAddress();
        setLocalIP(ipAddress);
      } catch (error) {
        console.error('Error fetching local IP address:', error.message);
      }
    };

    fetchLocalIP();
  }, []);

  return (
    <View>
      {localIP && (
        <View>
          <Text>Local IP Address: {localIP}</Text>
          <Text>Is Local IP in Private IP Range: {String(isPrivateIP(localIP))}</Text>
        </View>
      )}
    </View>
  );
};

export default currentIP;
