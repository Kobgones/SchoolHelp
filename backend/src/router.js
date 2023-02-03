const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword } = require("./middlewares/auth");

// Add all controllers needed
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const clubControllers = require("./controllers/clubControllers");
const memberControllers = require("./controllers/memberControllers");

// Add all routes

// PUBLIC ROUTES
router.post("/api/club", clubControllers.createNewClub);

router.post("/register", hashPassword, userControllers.createUser);
router.post(
  "/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// USER ROUTES
router.get("/api/users", userControllers.getAllUsers);
router.get("/api/users/:id", userControllers.getUserById);
router.put("/api/user/:id", userControllers.editUser);
router.delete("/api/user/:id", userControllers.deleteUser);

// CLUB ROUTES
router.get("/api/clubs", clubControllers.getAllClubs);
router.get("/api/club/:id", clubControllers.getClubById);
router.put("/api/club/:id", clubControllers.editClub);
router.delete("/api/club/:id", clubControllers.deleteClub);

// MEMBER ROUTES
router.get("/api/members", memberControllers.getAllMembers);
router.get("/api/clubmembers/:id", memberControllers.getAllMembersFromClub);
router.get("/api/memberclubs/:id", memberControllers.getAllClubsForMember);
router.delete("/api/members/:id", memberControllers.deleteByClub);
router.delete("/api/clubmembers/:id", memberControllers.deleteByMember);

module.exports = router;
