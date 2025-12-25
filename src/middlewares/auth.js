import jwt from "jsonwebtoken";

const publicRoutes = ["/auth/login", "/auth/register","/users"];

export const authMiddleware = (req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  const [type, token] = req.headers.authorization?.split(" ") || [];
  if (!token || type !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = { id: decoded.userId };
  next();
};
