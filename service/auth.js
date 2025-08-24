const jwt = require("jsonwebtoken");
const secret = "sagar$123@$"; // ⚠️ move this to process.env.JWT_SECRET in real projects

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role, // ✅ include role
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret); // ✅ will now return { _id, email, role, iat }
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
