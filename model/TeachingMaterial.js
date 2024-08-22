const mongoose = require("mongoose");

// Schema for teaching material
const teachingMaterialSchema = new mongoose.Schema({
    title:{type: String, required: true},
    s3FileUrl: {type: String, required: true},
    subject: {type: String, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    uploadDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("TeachingMaterial", teachingMaterialSchema);