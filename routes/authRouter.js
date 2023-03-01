const Users = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const authJWT = require("../utils/authJWT");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const user = Users({ name, email, password: bcrypt.hashSync(password, 8) });
  try {
    await user.save();
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(201).json({ success: true, message: "saved!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(403).json({
      success: false,
      message: "Please Check Your Password Or Your Email",
    });
    return;
  }
  const accessToken = authJWT.sign({ sub: user.id });
  try {
    await user.save();
  } catch (error) {
    res.json({ error });
  }
  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      accessToken,
    },
  });
});

router.get("/user/me", authJWT.verify, async (req, res) => {
  const user = await Users.findById(req.userId);

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
    },
  });
});

module.exports = router;
