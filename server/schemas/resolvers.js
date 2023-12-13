const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { ObjectId } = require('mongoose').Types;
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        // get a 1 user
        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate('tasks');
        },

        // get all tasks for 1 user
        tasks: async (parent, { username }, context) => {
            if (context.user){
            const tasks = await User
            .find({ username });
            return tasks;
            }
            throw new AuthenticationError('You need to be logged in');
        },

        // get a single task
        task: async (parent, { taskId }, context) => {
            if (context.user){
            const user = await User
            .findOne({ _id: context.user._id });
            const task = await user.findOne((task) => task._id.toString() === taskId);
            return task;
            }
            throw new AuthenticationError('You need to be logged in');
        },

        // get me
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id}).populate('tasks');
            }
            throw new AuthenticationError('You need to be logged in');
        }

    },

    Mutations: {
        // signup
        signup: async (parent, { username, password }) => {
            const user = await user.create({ username, password });
            const token = signToken(user);
            return { token, user };
        },

        // login
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No user with this')
            }
        },

        // create a task
        createTask: async (parent, {}, context) => {
            const task = await User.findOneAndUpdate({});
        },

        // edit a task
        editTask: async (parent, {}, context) => {
            const task = await User.findOneAndUpdate({});
        },

        // delete a task
        deleteTask: async (parent, {}, context) => {
            await User.findOneAndUpdate({});
        }

    },
}

module.exports = resolvers;
