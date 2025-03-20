const jwt = require("jsonwebtoken");

const Authorization = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp",
    (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      } else {
        req.body.objectId = decoded.payload.objectId;
        req.body.role = decoded.payload.role;
        next();
      }
    }
  );
};

module.exports = Authorization;
