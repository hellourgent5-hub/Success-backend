require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const apiRouter = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

connectDB();

app.get("/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));
app.use("/api", apiRouter);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
