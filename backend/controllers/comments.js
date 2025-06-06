const Hoot = require("../models/hoot");

module.exports = {
  create,
  show,
  update,
  deleteComment,
};

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();
    const newComment = hoot.comments[hoot.comments.length - 1];
    await hoot.populate("comments.author");
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate(
      "comments.author"
    );
    const comment = hoot.comments.id(req.params.commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch comment" });
  }
}

async function update(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to update this comment");
    }
    comment.text = req.body.text || comment.text;
    await hoot.save();

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update comment" });
  }
}

async function deleteComment(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to delete this comment");
    }

    comment.remove();
    await hoot.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}