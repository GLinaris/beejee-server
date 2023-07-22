import logger from "server/utils/logger";

/**
 * Create user if not exists
 *
 * @param {object} User model
 * @param {string} name user name
 * @param {string} password user password (not hashed)
 * @returns {object} User model instance
 */
async function createUserIfNotExists(User, name, password) {
    try {
        const [user, created] = await User.findOrCreate({
            where: { name },
            defaults: { password }
        });

        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

/**
 * Set default table rows
 */
export default async function setDefaultTableRows(sequelize) {
    const { models: { user: User } } = sequelize;

    createUserIfNotExists(
        User,
        process.env.DEF_ADMIN,
        process.env.DEF_ADMIN_PASS
    );

    logger.info('Default table rows initialized.');
}
