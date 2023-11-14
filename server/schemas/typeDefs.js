const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        tasks: [Task]
    }

    type Task {
        userId: ID
        goal: String
        priority: String
        challenges: String
        rewards: String
        toDo: String
        deadline: String
    }

    type Auth {
        token: String!
        user: User
    }

    type Query {
        user(username: String!): User
        tasks(userId: String!): [Task]
        task(taskId: String!): Task
        me: User
    }

    type Mutation {
        signup(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        createTask(goal: String!, priority: String, challenges: String, rewards: String, toDo: String, deadline: String): Task
        editTask(taskId: ID!, goal: String!, priority: String, challenges: String, rewards: String, toDo: String, deadline: String): Task
        deleteTask(taskId: String!): Task

    }
`;

module.exports = typeDefs;
