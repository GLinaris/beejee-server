import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const Task = sequelize.define('task', {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: { // task description
            type: DataTypes.STRING,
            allowNull: false
        },
        done: { // task completed
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        edited: { // edited by admin
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Task;
}
