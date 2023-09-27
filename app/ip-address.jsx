import { useState, useEffect } from 'react';

export function useIPv4Address() {
    const [ipv4Address, setIPv4Address] = useState('');

    useEffect(() => {
        // fetch('http://localhost:5001/getIPv4') // Use the correct port number
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         setIPv4Address(data.ipv4Address);
        //         console.log(data.ipv4Address);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        fetch('https://api64.ipify.org?format=json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const ipv4Address = data.ip;
        console.log('IPv4 Address:', ipv4Address);
    })
    .catch(error => {
        console.error(error);
    });


    }, []);

    return ipv4Address;
}
