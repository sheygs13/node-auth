import "dotenv/config";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    res.status(401).json({ error: "Unauthorized - Header Not Set" });
  }

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "Unauthorized. please provide a token" });

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch ({ message }) {
    console.error(message);
    res.status(400).json({ error: "Invalid token" });
  }
};

export default verifyToken;
