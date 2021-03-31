const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const validateUser = jwt.verify(token, process.env.JSEC);

  if (!validateUser) {
    return res.status(401).json({ errorMessage: "Unauthorized!" });
  }

  // verify token
  try {
    req.user = validateUser.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized! Token not valid!" });
  }
}

module.exports = auth;
