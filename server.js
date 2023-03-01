require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3002;
const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/v1', require("./routes/authRouter"))
mongoose.connect(process.env.DB_URL).then(() => console.log("connected!"));

app.listen(port, () => console.log(`listen on port ${port}`));
