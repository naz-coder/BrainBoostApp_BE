const mongoose = require('mongoose');
const User = require('../model/user');
const Quiz = require('../model/Quiz'); 
const TeachingMaterial = require('../model/TeachingMaterial'); 
require('dotenv').config();

const {MONGO_URI} = process.env;

async function migrateTeacherSubmissions() {
    try {
        // Connect to MongoDB
        mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

        console.log('Connected to MongoDB');

        // Find all teachers
        const teachers = await User.find({ role: 'teacher' });

        for (let teacher of teachers) {
            // console.log(`Migrating data for teacher: ${teacher.firstName} ${teacher.lastName}`);

            // Fetch the quizzes and materials created by this teacher
            const submittedQuizzes = await Quiz.find({ teacher: teacher._id }).select('_id');
            const submittedMaterials = await TeachingMaterial.find({ teacher: teacher._id }).select('_id');

            // Extract quiz and material IDs
            const quizIds = submittedQuizzes.map(quiz => quiz._id.toString());
            const materialIds = submittedMaterials.map(material => material._id.toString());

            // Update the teacher's submittedQuizzes and submittedMaterials fields
            await User.updateOne(
                { _id: teacher._id },
                {
                    $set: {
                        submittedQuizzes: quizIds,
                        submittedMaterials: materialIds
                    }
                }
            );

            console.log(`Updated submissions for teacher: ${teacher.firstName} ${teacher.lastName}`);
        }

        // console.log('Migration completed successfully');
    } catch (error) {
        // console.error('Error during migration:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        // console.log('Disconnected from MongoDB');
    }
}

migrateTeacherSubmissions();
