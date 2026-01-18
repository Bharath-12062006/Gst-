const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   PUT /api/users/:id/pan
// @desc    Update PAN number
// @access  Private (Public for now)
router.put('/:id/pan', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.panNumber = req.body.panNumber;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/users/:id/gst
// @desc    Update GST number and details
// @access  Private (Public for now)
router.put('/:id/gst', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.gstNumber = req.body.gstNumber;
            user.gstDetails = req.body.details;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
