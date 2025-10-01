import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config({});
const app = express();

const _dirname=path.resolve()

//middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

const corsOptions = {
  origin: "https://job-portal-3-w2ra.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/Frontend/vite-project/dist")))
app.get(/(.*)/,(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","vite-project","dist","index.html"))
})

// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/update/profile"

app.listen(PORT, () => {
  connectdb();
  console.log(`server is running ${PORT}`);
});
