const jwt = require("jsonwebtoken");

function auth(requiredRole) {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
      if (requiredRole && data.role !== requiredRole && data.role !== "admin") {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = auth;
