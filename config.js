
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID === undefined ? 'SUHAS-MD=rMgB3aRA#Rzm6Kq_QhsMKGZEc9kH5BYDRLDO_n3DLF-pmKL4EmIA' : process.env.SESSION_ID, //ADD YOUR SESSION ID
    GITHUB_USER_NAME: process.env.GITHUB_USER_NAME === undefined ? 'Mohomad-Nisan' : process.env.GITHUB_USER_NAME, //ADD YOUR GITHUB USERNAME
    GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN === undefined ? 'adxPuaw6bpdAaBgn851IG82AEHsB4Q3zZGJu' : process.env.GITHUB_AUTH_TOKEN //ADD YOUR GITHUB AUTH TOKEN WITHOUT gph_ ,  example - G5OxxdvEbiBPWxm4A0xypQGlyCr4FS267ifz
};
