import multer, { FileFilterCallback } from "multer";

// Configure Multer to handle file uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5 MB
  },
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

export const uploadMiddleware = upload.single("file");
