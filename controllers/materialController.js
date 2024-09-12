const {TeachingMaterial} = require("../model/TeachingMaterial");

exports.materialStatus = async (req, res) => {
    const {materialId} = re.params;
    const userId = req.user._id;

    try{
        const material = await TeachingMaterial.findById(materialId);
        if(!material){
            return res.status(404).json({message: "Material not found"});
        }

        // Check if the teacher owns the material
        if(material.creator.toString() !== userId){
            return res.status(403).json({message: "Unauthorized: You can only inactivate materials you created"});
        }

        material.isActive = false;
        await material.save();
        res.status(200).json({message: "Material marked as inactive successfully!"});
    }catch(error){
        res.status(500).json({message: "Error marking material as inactive", error})
    }
}