import { privateDecrypt, publicEncrypt } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Ensure the certificate and key provided are valid and if not
// throw an easy to debug error
function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
    let encrypted;
    try {
        // publicEncrypt will throw an error with an invalid cert
        encrypted = publicEncrypt(cert, Buffer.from('test'));
    } catch (err) {
        throw new Error(
            `The certificate "${crtFile}" is invalid.\n${err.message}`
        );
    }

    try {
        // privateDecrypt will throw an error with an invalid key
        privateDecrypt(key, encrypted);
    } catch (err) {
        throw new Error(
            `The certificate key "${keyFile}" is invalid.\n${err.message}`
        );
    }
}

// Read file and throw an error if it doesn't exist
function readEnvFile(file, type) {
    if (!existsSync(file)) {
        throw new Error(
            `You specified ${type} in your env, but the file "${file}" can't be found.`
        );
    }
    return readFileSync(file);
}

// Get the https config
// Return cert files if provided in env, otherwise just true or false
function getHttpsConfig() {
    const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
    const isHttps = (HTTPS === 'true');

    if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
        const crtFile = resolve(SSL_CRT_FILE);
        const keyFile = resolve(SSL_KEY_FILE);
        const config = {
            minVersion: "TLSv1.2",
            cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
            key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
        };

        validateKeyAndCerts({ ...config, keyFile, crtFile });
        return config;
    }
    return isHttps;
}

export default getHttpsConfig;
