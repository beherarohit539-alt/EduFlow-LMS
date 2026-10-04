const express = require("express");
const {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  getUserInfo,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/user.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.get("/get-users", isAuthenticated, authorizeRoles("admin"), getAllUsers);
userRouter.put("/update-user-role", isAuthenticated, authorizeRoles("admin"), updateUserRole);
userRouter.delete("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = userRouter;
