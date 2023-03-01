const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const expires_in = process.env.EXPIERS_IN;

exports.sign = (payload) => jwt.sign(payload, secret_key);

exports.verify = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    const payload = jwt.verify(token, secret_key);
    req.userId = payload.sub;
    next();
  } catch (error) {
    res.json(error);
  }
};
