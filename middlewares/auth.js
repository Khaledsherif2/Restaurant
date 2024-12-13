const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization;
    if (!fullToken)
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    const token = fullToken?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    } else if (e.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    }
    return res.status(500).send("Authentication error");
  }
};
