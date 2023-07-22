import jwt from 'jsonwebtoken';
import { DataTypes } from 'sequelize';

// project imports
import { hashSync, timingSafeVerify } from 'server/utils/crypto';

/**
 * Timing safe check password
 *
 * @param {string} password
 * @returns {boolean} password is valid
 */
async function timingSafeVerifyPassword(password) {
    const isPasswordValid = await timingSafeVerify(password, this.password);
    return isPasswordValid;
}

/**
 * Generate auth token
 *
 * @returns {string} token
 */
function generateAuthToken() {
    return jwt.sign({}, process.env.AUTH_SECRET_KEY);
}

export default function (sequelize) {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: { // hashed password
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hashPassword = hashSync(value);
                this.setDataValue('password', hashPassword)
            }
        }
    });

    User.prototype.timingSafeVerifyPassword = timingSafeVerifyPassword;
    User.prototype.generateAuthToken = generateAuthToken;

    return User;
}
