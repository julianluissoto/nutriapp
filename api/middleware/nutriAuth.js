export const isAuthenticated = (req, res, next) => {
  if (req.session.nutritionistId) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated, redirect or respond with an error
    res.status(401).json({ error: "Unauthorized" });
  }
};
