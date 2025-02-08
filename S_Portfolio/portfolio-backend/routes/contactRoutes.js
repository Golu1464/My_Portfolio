const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST Route to Save Contact Messages
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send message." });
        console.error(error);
    }
});

module.exports = router;
