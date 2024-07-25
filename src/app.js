import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const { PORT, DB_URI } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`${DB_URI}`).then(() => console.log("Database Connected!"));

app.use("/api", router);

const errorNotFound = (req, res, next) => {
	const error = new Error(`Not found`);
	error.status = 404;
	next(error);
};

const errorCommon = (err, req, res, next) => {
	return res.status(err.status || 500).json({
		message: err.message || "Loi server",
	});
};

app.use(errorNotFound,errorCommon)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
