const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mysecretkey"; // you can change this

app.use(cors());
app.use(bodyParser.json());

// fake user (for demo only)
const user = {
  email: "test@example.com",
  password: "123456"
};

// login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    // create token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// protected route example
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: "Protected data accessed", user });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
