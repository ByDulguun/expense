const { readJson, saveJson } = require("../utils");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const login = async (req, res) => {
  const { email, password } = req.body; //Энэ мөр нь үйлчлүүлэгчийн илгээсэн хүсэлтийн хэсгээс имэйл болон нууц үгийг гаргаж авдаг
  const users = readJson("users.json"); //Энэ нь users.json нэртэй JSON файлаас хэрэглэгчийн өгөгдлийг уншдаг. readJson функц нь файлыг уншиж, JavaScript массив болгон задлан шинжилдэг.

  const user = users.find(
    (user) => user.email === email && user.password === password //Энэ нь өгөгдсөн имэйл болон нууц үгтэй таарч байгаа хэрэглэгчийг массиваас хайдаг.
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" }); //Энэ нь өгөгдсөн имэйл болон нууц үгтэй таарч байгаа хэрэглэгчийг массиваас хайдаг.

  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET //Хэрэв хэрэглэгч олдвол JSON Web Token (JWT) үүсгэгдэнэ. Токен нь хэрэглэгчийн нэр, имэйл, ID-г агуулдаг. Энэ нь JWT_SECRET орчны хувьсагчид хадгалагдсан нууц түлхүүрийг ашиглан гарын үсэг зурдаг
  );

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
      id: user.id,
    }, //Хариулт нь JWT токен болон хэрэглэгчийн мэдээллийг агуулдаг
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body; //Энэ мөр нь хүсэлтийн хэсгээс хэрэглэгчийн нэр, имэйл, нууц үгийг гаргаж авдаг.
  const users = readJson("users.json"); //Энэ нь users.json-оос хэрэглэгчийн өгөгдлийг уншдаг

  const user = users.find((user) => user.email === email); //Энэ нь ижил имэйлтэй байгаа хэрэглэгчийг хайдаг

  if (user) return res.status(400).json({ message: "User already exists" }); //Хэрэв ижил имэйлтэй хэрэглэгч байгаа бол функц нь 400 статусын код болон алдааны мессежээр хариу өгдөг

  const newUser = {
    id: v4(),
    username,
    email,
    password,
  }; //Хэрэв ижил имэйлтэй хэрэглэгч байгаа бол функц нь 400 статусын код болон алдааны мессежээр хариу өгдөг

  users.push(newUser);
  saveJson("users.json", users); //Шинэ хэрэглэгчийг хэрэглэгчдийн массив дээр нэмж, шинэчилсэн массивыг saveJson ашиглан users.json руу буцааж хадгална.

  res.json(newUser); //Хариулт нь шинээр үүсгэсэн хэрэглэгчийн объектыг агуулна.
};

module.exports = { login, register };
