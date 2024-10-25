import recipes from "../Models/recipeSchema.js";

// Create or Post method
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipes(req.body);
    await newRecipe.save();
    res
      .status(200)
      .json({ message: "Recipe added successfully", data: newRecipe });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all the recipe
export const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipes.find();
    res
      .status(200)
      .json({
        message: "All recipes retrieved successfully",
        data: allRecipes,
      });
      if (!allRecipes) { // Corrected check to see if recipe is not found
        return res.status(404).json({ message: "Recipes Not Found" });
      }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recipe by id
export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipes.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }

    res
      .status(200)
      .json({ message: "Recipe retrieved sucessfully", data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or Put recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const {name, ingredients, procedure, duration} = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      {name: name},
      {ingredients: ingredients},
      {procedure: procedure},
      {duration: duration},
      {new: true}
    )
    if (result.matchedCount === 0){
      return res.staus(404).json({message: "Recipe Not Found" });
    }
    res.status(200).json({message: "Recipe Updated successfully", oldData: result, updatedData: await recipes.findById(recipeId)})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Delete Recipe 
export const deleteRecipe = async (req, res) => {
   try {
     const recipeId = req.params.id;
     const result = await recipes.findByIdAndDelete({_id:recipeId});
     if(result.matchedCount === 0){
      res.status(404).json({message: "Recipe Not Found"})
     }
     const allRecipes = await recipes.find()
     res.status(200).json({message: "Recipe Deleted Successfully", data: allRecipes})
   } catch (error) {
     res.status(500).json({message: error.message})
   }
}
