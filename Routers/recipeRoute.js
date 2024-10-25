import express from 'express';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../Controller/recipeController.js';

const router = express.Router();

router.post("/create", createRecipe);
router.get("/getdata", getAllRecipes);
router.get("/getdata/:id", getRecipeById);
router.put('/update/:id', updateRecipe);
router.delete('/delete/:id', deleteRecipe)

export default router;