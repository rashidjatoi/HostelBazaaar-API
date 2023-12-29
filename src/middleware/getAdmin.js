const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const getAdmin = (req, res, next) => {
    try {
        const admin = req.body.admin;
        const token = req.header("access_token");
        if (admin) {

        } else {
            res.status(4002).json({error: "Access Denied"})
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = getAdmin;