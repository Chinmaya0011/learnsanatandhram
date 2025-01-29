const Category=require('../models/Category');
const Progress=require('../models/Progress');

const canAccessLevel = async (req, res) => {
    try {
        const { userId, categoryId, levelNumber } = req.body;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const progress = await Progress.findOne({ userId, categoryId });

        if (!progress) {
            return res.status(400).json({ message: "User has not started this category" });
        }

        const previousLevelCompleted = progress.completedLevels.includes(levelNumber - 1);

        if (!previousLevelCompleted && levelNumber > 1) {
            return res.status(400).json({ message: "You need to complete the previous level first." });
        }

        res.status(200).json({ message: "Level access granted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error checking access", error: error.message });
    }
};
const markLevelAsCompleted = async (req, res) => {
    try {
        const { userId, categoryId, levelNumber } = req.body;

        let progress = await Progress.findOne({ userId, categoryId });

        if (!progress) {
            progress = new Progress({ userId, categoryId });
        }

        if (!progress.completedLevels.includes(levelNumber)) {
            progress.completedLevels.push(levelNumber);
            await progress.save();
        }

        res.status(200).json({ message: "Level marked as completed" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error marking level as completed", error: error.message });
    }
};
const progressReport=async(req,res)=>{
    try{
const{userId}=req.body;
const progressRecords=await Progress.find({userId});

if(!progressRecords||progressRecords.length===0){
    return res.status(404).json({ message: "No progress found for this user" });
 
}
const report=[];
for (const progress of progressRecords) {
    const category = await Category.findById(progress.categoryId);

    if (!category) {
        continue; 
    }

    const completedLevels = category.levels.filter(level => progress.completedLevels.includes(level.levelNumber));
    const remainingLevels = category.levels.filter(level => !progress.completedLevels.includes(level.levelNumber));

    report.push({
        categoryId: category._id,
        categoryName: category.name,
        completedLevels: completedLevels,
        totalLevels: category.levels.length,
        completedCount: completedLevels.length,
        remainingLevels: remainingLevels,
        remainingCount: remainingLevels.length
    });
}

res.status(200).json({
    message: "Complete progress report fetched successfully",
    userId,
    report
});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching progress report", error: error.message });
    }
}
module.exports = { canAccessLevel, markLevelAsCompleted,progressReport  };
