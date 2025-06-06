const express = require("express");
const router = express.Router({ mergeParams: true }); // Add mergeParams: true to access parent params
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/hoots/:hootId/comments'

// Protect all defined routes
router.use(ensureLoggedIn);

// POST /api/hoots/:hootId/comments
router.post("/", commentsCtrl.create);

// GET /api/hoots/:hootId/comments/:commentId
router.get("/:commentId", commentsCtrl.show);

// PUT /api/hoots/:hootId/comments/:commentId
router.put("/:commentId", commentsCtrl.update);

// DELETE /api/hoots/:hootId/comments/:commentId
router.delete("/:commentId", commentsCtrl.deleteComment);

module.exports = router;