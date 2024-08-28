const { users } = require("../database/schema.js");
const { db } = require("../database/index.js");

const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db
    .insert(users)
    .values({ id: v4(), name, email, password })
    .returning();

  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await db.query.users.findMany({});
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Nuuts vg buruu eswel email bvrtgelgvi bn" });
    }
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
