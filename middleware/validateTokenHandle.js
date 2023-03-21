const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, resp, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, decoded) => {
            if (err) {
                resp.status(400);
                throw new Error("USER IS NOT AUTHORIZED");
            }
            req.user = decoded.user;
            console.log(decoded.user);
            next();
        });
        if (!token) {
            resp.status(401);
            throw new Error("user is not authorized and token is unmatched");
        }

    }
})
module.exports = validateToken;