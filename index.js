const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const auth = require("./middlewares/authmiddleware");
const DoctorRoute = require("./routes/doctor.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ mesage: "Home Page" });
});

app.use("/users", userRouter);
app.use("/doctors", auth, DoctorRoute);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected to DB at Port 8000");
  } catch (error) {
    console.log(error.message);
  }
});
