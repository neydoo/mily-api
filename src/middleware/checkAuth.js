const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.owner = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized", error });
    }
};

module.exports = auth;