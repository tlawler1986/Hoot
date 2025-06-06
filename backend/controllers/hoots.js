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
    const hoots = await Hoot.find({});
    // Below would return all hoots for just the logged in user
    // const hoots = await Hoot.find({author: req.user._id});
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
    // Below would return all hoots for just the logged in user
    // const hoots = await Hoot.find({author: req.user._id});
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create hoot" });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate("author");
    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch posts" });
  }
}

async function update(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    // Check permissions:
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );
    // Append req.user to the author property:
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