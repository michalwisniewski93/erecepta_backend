const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    permission: {type: Boolean, required: true},
})

const Permission = mongoose.model("Permission", permissionSchema)
module.exports = Permission