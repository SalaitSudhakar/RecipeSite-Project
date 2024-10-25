import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    name: String,
    ingredients: [String],
    procedure: String,
    duration: String
})

/* Another method
const recipeSchema = mongoose.Schema({
  name: {
  type: String,
  required: true,
  },
  ingredients: {
  type: [String],
  required: true,
  },
  procedure: {
  type: String,
  required: true,
  },
  duration: {
  type: String,
  },
})
*/

const recipes = mongoose.model("recipes", recipeSchema);

export default recipes;