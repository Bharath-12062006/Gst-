const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    panNumber: {
        type: String,
        default: '',
    },
    gstNumber: {
        type: String,
        default: '',
    },
    gstDetails: {
        legalName: String,
        tradeName: String,
        status: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
