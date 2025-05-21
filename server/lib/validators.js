import { body, param, validationResult } from "express-validator";
import ErrorHandler from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("username", "Username is required").notEmpty(),
  body("bio", "Bio is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const loginValidator = () => [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 2-100"),
];

const addMembersValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 2-97"),
];

const removeMembersValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("userId", "Please provide user ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
];

const chatIdValidator = () => [param("id", "Chat ID is required").notEmpty()];

const renameValidator = () => [
  param("id", "Chat ID is required").notEmpty(),
  body("name", "Please enter new name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];
const adminLoginValidator = () => [
  body("secretKey", "Please enter Secret Key").notEmpty(),
];

export {
  acceptRequestValidator,
  addMembersValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMembersValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
};
