const axios = require('axios');
axios.defaults.baseURL = 'process.env.baseURL || http://localhost:8081/';

module.exports = axios;
