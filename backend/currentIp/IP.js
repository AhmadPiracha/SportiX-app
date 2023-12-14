import NetInfo from '@react-native-community/netinfo';

export function getIPRange(start, end) {
    const startArray = start.split('.').map(Number);
    const endArray = end.split('.').map(Number);
    const ipAddresses = [];

    for (let a = startArray[0]; a <= endArray[0]; a++) {
        for (let b = startArray[1]; b <= endArray[1]; b++) {
            for (let c = startArray[2]; c <= endArray[2]; c++) {
                for (let d = startArray[3]; d <= endArray[3]; d++) {
                    ipAddresses.push(`${a}.${b}.${c}.${d}`);
                }
            }
        }
    }

    return ipAddresses;
}

export async function getPrivateIPAddresses() {
    try {
        const netInfo = await NetInfo.fetch();
        const privateIP = netInfo.details.ipAddress || netInfo.details.subnet;

        console.log('Private IP Address:', privateIP);

        if (privateIP && privateIP !== '0.0.0.0') {
            return [privateIP];
        } else {
            console.error('Error getting valid private IP address.');
            return [];
        }
    } catch (error) {
        console.error('Error getting private IP address:', error);
        return [];
    }
}

export function isPrivateIP(ip) {
    const privateIPRanges = [
        ...getIPRange('10.0.0.0', '10.255.255.255'),
        ...getIPRange('172.16.0.0', '172.31.255.255'),
        ...getIPRange('192.168.0.0', '192.168.255.255'),
    ];

    return privateIPRanges.includes(ip);
}

export async function fetchPrivateIPs() {
    try {
        const privateIPs = await getPrivateIPAddresses();

        console.log('All Private IP Addresses:', privateIPs);

        // Assuming you want to check the first private IP address found
        const currentPrivateIP = privateIPs[0];

        console.log('Current Private IP Address:', currentPrivateIP);
        console.log('Is Current Private IP in Private IP Range:', isPrivateIP(currentPrivateIP));
    } catch (error) {
        console.error('Error fetching private IP addresses:', error);
    }
}
