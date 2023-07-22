import crypto from 'crypto';

/**
 * Hash password
 *
 * @param {string} password
 * @returns {Promise<string>} hash
 */
export async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex");
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'));
        });
    });
}

/**
 * Hash password sync
 *
 * @param {string} password
 * @returns {string} hash
 */
export function hashSync(password) {
    const salt = crypto.randomBytes(8).toString("hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return salt + ":" + derivedKey.toString('hex');
}

/**
 * Сheck password
 *
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>} is equal
 */
export async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        });
    });
}

/**
 * Secure password check
 *
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>} is equal
 */
export async function timingSafeVerify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const keyBuffer = Buffer.from(key, 'hex');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
        });
    });
}
