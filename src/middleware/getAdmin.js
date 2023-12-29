const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const getAdmin = (req, res, next) => {
    try {
        jwt.verify(req.header("access_token"), JWT_SECRET, (err, data) => {
            if (data.user.admin) {
                req.user = data.user;
                next();
            } else {
                res.status(401).json({ error: "Access Denied" });
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error akslfjlsdjf;" })
    }
}

module.exports = getAdmin;