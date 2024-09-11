const User = require("../model/user");
const TeachingMaterial = require("../model/TeachingMaterial");
const Quiz = require("../model/Quiz");

async function updateTeacherSubmissions(teacherId){
    try{
        // Fetch the submited resources
        const materials = await TeachingMaterial.find({teacher: teacherId}).select("_id");
        const quizzes = await Quiz.find({teacher: teacherId}).select("_id");

        // Extract the IDs
        const materialIds = materials.map(material => material._id.toString());
        const quizIds = quizzes.map(quiz => quiz._id.toString());

        // Update the teacher's data
        await User.findByIdAndUpdate(
            teacherId,
            {
                submittedMaterials: materialIds,
                submittedQuizzes: quizIds
            },
            { new: true}    // Return the updated doc
        )

        console.log('Teacher submissions updated successfuly.');
    }catch(error){
        console.error("Error updating teacher submissions:", error);
    }
}

module.exports = updateTeacherSubmissions;