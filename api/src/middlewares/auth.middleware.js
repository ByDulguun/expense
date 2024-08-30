const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Allow unauthenticated access to routes starting with "/auth"
  if (req.path.startsWith("/auth")) return next();

  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Нэвтрэнэ үү!" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Нэвтрэнэ үү!" });
  }

  try {
    // Verify the token using the secret key
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Нэвтрэнэ үү!" });
  }
};

module.exports = { authMiddleware };
