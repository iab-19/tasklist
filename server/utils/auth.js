// Import JWT, a library to handle JSON web token
const jwt = require('jsonwebtoken');

// Validate email address
function isValidEmail (email) {
    const emailRegex = /.+@.+\..+/;
    return emailRegext.test(email);
}

module.exports = {
    authMiddleware: function ({ req}) {
        try {// Allow the token to be sent via request query parameters, request body, or headers
            let token = req.body.token || req.query.token || req.headers.authorization;

            // If token is included in the authorization header, extract it
            if (req.headers.authorization) {
                token = token.split(" ")
                .pop()
                .trim();
            }

            // if there is no token, return the original request object
            if (!token) {
                return req
            }

            // Verify the token and extract user data
            try {
                const { data } = jwt.verify(token, process.env.SECRET_KEY);
                req.user = data;
            } catch (error) {
                console.error('Invalid token: ', error);
            }

            return req;
            } catch (error) {
                console.error('Error in authMiddleware: ', error);
                return req;
            }
    },

    // Sign a jwt with user data
    signToken: function ({ username, _id }) {
        try {
            if (!isValidEmail(email)) {
                throw new Error('Invalid email address');
            }

            // create a payload containing user data
            const payload = { username, _id};

            return jwt.sign({ data: payload }. process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION_TIME });
        } catch (error) {
            console.error('Error in signing the token: ', error);
            return null;
        }
    },
};
