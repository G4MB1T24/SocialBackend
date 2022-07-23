const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Posts = require("../models/Posts");
router.get("/fetchposts", fetchuser, async (req, res) => {
  try {
    const PostsSend = await Posts.find({ user: req.user.id });
    res.json([PostsSend]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
router.post("/createpost", fetchuser, async (req, res) => {
  try {
    const { title, description, img, tags } = req.body;
    const post = new Posts({
      title,
      description,
      tags,
      img,
      user: req.user.id,
    });
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
router.put("/updatepost/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, img, tags } = req.body;
    let newnote = {};
    if (title) newnote.title = title;
    if (description) newnote.description = description;
    if (tags) newnote.tags = tags;
    if (img) newnote.img = img;

    let post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    console.log(post);
    newnote = await Posts.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { $new: true }
    );
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    // find note to delete

    let post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Note not found" });
    }


    // check if user is authorized to delete
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    post = await Posts.findByIdAndDelete(req.params.id);

    // res.json(note);
    res.json("Successfully deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
