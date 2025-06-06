const Hoot = require("../models/hoot");

module.exports = {
  index,
  create,
  show,
  update,
  deleteHoot,
};

async function index(req, res) {
  try {
    const hoots = await Hoot.find({}).populate("author");
    res.json(hoots);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch hoots" });
  }
}
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create hoot" });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate("author").populate("comments.author");
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch posts" });
  }
}

async function update(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    updatedHoot._doc.author = req.user;
    res.json(updatedHoot);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
}

async function deleteHoot(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.json(deletedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}