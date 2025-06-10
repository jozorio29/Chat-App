import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // Expira en 15 días
  sameSite: "None", // Restringe el envío de la cookie a solicitudes del mismo sitio
  httpOnly: true, // Evita acceso desde JavaScript en el navegador
  secure: true, // Solo se envía por HTTPS
};

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      dbName: "ChatApp",
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
};

const sendToken = (user, res, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chat-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => {
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    });
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to Cloudinary", err);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  cookieOptions,
  deleteFilesFromCloudinary,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
};
