const jwt = require("jsonwebtoken");
//You can store JWT Secret key to you DB or you can HardCodded here
//const JWT_SECRET = "********";

const fetchuser = (req, res, next) => {
  //get the user from JWT token and add id to req obj
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate with valid auth token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with valid auth token" });
  }
};

module.exports = fetchuser;
