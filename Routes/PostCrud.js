const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts")

router.post("/createpost", async (req, res) =>  {
    try {
        const { title, description, img, tags } = req.body;
        const post = new Posts({
            title,
            description,
            tags,
            img ,
            user: req.user.id,
        });
        const savedPost = post.save()
        res.send(savedPost)
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router