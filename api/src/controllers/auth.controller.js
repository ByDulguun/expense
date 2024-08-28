// // import { users } from "../database/schema.js";
// const { users } = require("../database/schema.js");
// const { db } = require("../database/index.js");

// const { v4 } = require("uuid");

// // const register = async (req, res) => {
// //   const { username, email, password } = req.body; //Энэ мөр нь хүсэлтийн хэсгээс хэрэглэгчийн нэр, имэйл, нууц үгийг гаргаж авдаг.
// //   const users = readJson("users.json"); //Энэ нь users.json-оос хэрэглэгчийн өгөгдлийг уншдаг

// //   const user = users.find((user) => user.email === email); //Энэ нь ижил имэйлтэй байгаа хэрэглэгчийг хайдаг

// //   if (user) return res.status(400).json({ message: "User already exists" }); //Хэрэв ижил имэйлтэй хэрэглэгч байгаа бол функц нь 400 статусын код болон алдааны мессежээр хариу өгдөг

// //   const newUser = {
// //     id: v4(),
// //     username,
// //     email,
// //     password,
// //   }; //Хэрэв ижил имэйлтэй хэрэглэгч байгаа бол функц нь 400 статусын код болон алдааны мессежээр хариу өгдөг

// //   users.push(newUser);
// //   saveJson("users.json", users); //Шинэ хэрэглэгчийг хэрэглэгчдийн массив дээр нэмж, шинэчилсэн массивыг saveJson ашиглан users.json руу буцааж хадгална.

// //   res.json(newUser); //Хариулт нь шинээр үүсгэсэн хэрэглэгчийн объектыг агуулна.
// // };

// const login = async (req, res) => {
//   const { email, password } = req.body; //Энэ мөр нь үйлчлүүлэгчийн илгээсэн хүсэлтийн хэсгээс имэйл болон нууц үгийг гаргаж авдаг
//   const users = readJson("users.json"); //Энэ нь users.json нэртэй JSON файлаас хэрэглэгчийн өгөгдлийг уншдаг. readJson функц нь файлыг уншиж, JavaScript массив болгон задлан шинжилдэг.

//   const user = users.find(
//     (user) => user.email === email && user.password === password //Энэ нь өгөгдсөн имэйл болон нууц үгтэй таарч байгаа хэрэглэгчийг массиваас хайдаг.
//   );

//   if (!user) return res.status(401).json({ message: "Invalid credentials" }); //Энэ нь өгөгдсөн имэйл болон нууц үгтэй таарч байгаа хэрэглэгчийг массиваас хайдаг.

//   const token = jwt.sign(
//     {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//     process.env.JWT_SECRET //Хэрэв хэрэглэгч олдвол JSON Web Token (JWT) үүсгэгдэнэ. Токен нь хэрэглэгчийн нэр, имэйл, ID-г агуулдаг. Энэ нь JWT_SECRET орчны хувьсагчид хадгалагдсан нууц түлхүүрийг ашиглан гарын үсэг зурдаг
//   );

//   res.json({
//     token,
//     user: {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     }, //Хариулт нь JWT токен болон хэрэглэгчийн мэдээллийг агуулдаг
//   });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const id = v4();

//   const user = await db
//     .select()
//     .from(users)
//     .where((user) => user.email.eq(email).and(user.password.eq(password)))
//     .execute();
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign(
//     {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//     process.env.JWT_SECRET
//   );
//   res.json({
//     token,
//     user: {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//   });
// };

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await db
    .insert(users)
    .values({ id: v4(), name, email, password })
    .returning();

  res.json(user);
};
// module.exports = { register, login };

const { users } = require("../database/schema.js");
const { db } = require("../database/index.js");

const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [user] = await db.select().from(users).where({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // If the credentials are valid, return user data (or a token in a real-world app)
//     res.json({ message: "Login successful", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
        username: user.name,
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        username: user.name,
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
