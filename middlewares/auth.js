const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.token; // ✅ declare token first
  req.user = null;

  if (!token) {
    return next(); // no token → just move on
  }

  const user = getUser(token); // ✅ safe to use now
  req.user = user;

  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    console.log("restrictTo → req.user:", req.user);

    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) {
      console.log("Forbidden: user role =", req.user.role, "Allowed =", roles);
      return res.status(403).send("Unauthorized");
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
