const Category = require('../models/Category');


const getSanatanDharmaCategories = async (req, res) => {
    try {
        const categories = await Category.find({ name: "Sanatan Dharma" });

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found for Learn Sanatan Dharma" });
        }

        res.json(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const addSanatanDharmaCategory = async (req, res) => {
    try {
        const { name, levels } = req.body;

        if (!Array.isArray(levels) || levels.length === 0 || !levels.every(level => level.levelNumber && level.title && level.description)) {
            return res.status(400).json({ message: "Each level must contain levelNumber, title, and description." });
        }

        const newCategory = new Category({ name, levels });
        await newCategory.save();

        res.status(201).json({
            message: "Sanatan Dharma category with levels added successfully",
            category: newCategory 
        });
    } catch (error) {
        res.status(400).json({ message: "Error adding Sanatan Dharma category", error });
    }
};

module.exports = { getSanatanDharmaCategories, addSanatanDharmaCategory };
