const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // gurwan utga awdag
  // controlloriin omno ajildag
  if (req.path.startsWith("/auth")) return next(); // login register deer token shalgah shaardlaga bhgvi bolohoor token shalgahgvi shuud vrgeljlvvlj bga

  const auth = req.headers.authorization; //requistiin headereesee autoration aa awlaa

  const token = auth?.split(" ")[1]; // ter dotroosoo token oo salgaj awlaa

  if (!token) return res.status(401).json({ error: "Нэвтрэнэ үү!" }); // herwee token bhgvi bwal bi aldaa butsaaaj bga
  // next ajillahgvi bolohoor controller luu orohgvi butsaaj bga
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // herew token baihiin bol bi ter tokeniig zow token esehiig shalgah yostoi teriig shalgaj bga functs n verify
    // zow bhin bol deerees user gedeg dotor minii user iin medeelel payload deer orood irj bga
    req.user = user; // tegeed req.user ter medeellee hiisen

    next();
  } catch (err) {
    // deerh verify shalgalt amjiltgvi bolwol catch ruu aldaa garna
    return res.status(401).json({ error: "Нэвтрэнэ үү!" });
  }
};

module.exports = { authMiddleware };
