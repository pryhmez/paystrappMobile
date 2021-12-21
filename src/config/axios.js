import axios from 'axios';

export const apiConfig = {
    // baseUrl: 'http://192.168.0.115:8080/api/',
    payStackSecret: 'sk_test_222ff2eadeb3d44232508a0a1937d3d3fe341600',

    baseUrl: 'https://paystrapp.com/api/',
    // should end with a slash
    clientId: '1',
    clientSecret: 'xc34jamesDevV41XwKbWhrsGgHvR3hjwG8',
};

export const client = axios.create({
    // baseURL: 'http://192.168.0.115:8080/api/',
    baseURL: 'https://paystrapp/.com/api/',

    headers: {
        Accept: 'application/json',
    },
    data: {
        // client_id: apiConfig.clientId,
        // client_secret: apiConfig.clientSecret,
        id: 'password',
        scope: '*',
    },
});
