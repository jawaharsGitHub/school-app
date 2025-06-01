import express from "express";
import swaggerUi from 'swagger-ui-express';
import { remultApi } from 'remult/remult-express';
import { api } from "./api";
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // For file system operations (saving the photo)
//import { StudentPhotoController } from "../shared/Controller/StudentController";
import session from 'cookie-session';
import { authRouter } from "./auth";
import { uploadRouter } from "../shared/Controller/upload.controller";



const app = express();
app.use(session({
  secret: 'my_secret'
}));



app.use(express.json()); // To parse JSON request bodies
app.use(api);
app.use(authRouter); // Use the auth router for authentication endpoints
const openApiDocument = api.openApiDoc({ title: "remult-react-todo" });
app.get("/api/openApi.json", (req, res) => {res.json(openApiDocument)});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// const studentPhotoController = new StudentPhotoController();
// app.use('/api/students/:id/photo', studentPhotoController.router);

//app.use('/api/uploadStudentPhoto', StudentPhotoController); 
//const PORT = process.env.PORT || 3000;
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

app.get("/api", (req, res) => {
  res.send("Welcome to Uthavu School App API");
});

app.use('/api', uploadRouter)


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/student-photos'); // Adjust your upload directory
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

app.post('/api/students/:id/photo', multer({ storage }).single('studentPhoto'), async (req, res) => {
  res.send(req.file);
});



