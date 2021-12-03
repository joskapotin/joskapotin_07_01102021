import allRecipes from "../data/recipes.js"
import Recipe from "../models/Recipe.js"
import View from "../views/View.js"

/**
 * Main function that loop through every recipes and return the data to render
 * Time complexity O(n)
 *
 * @param {object} filter
 * @return {{matchRecipes:object[],ingredients:object,appliances:object,ustensils:object}}
 */
const getMatchRecipes = filter => {
  const matchRecipes = []
  let ingredientsObj = {}
  let appliancesObj = {}
  let ustensilsObj = {}

  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = new Recipe(allRecipes[i])

    if (recipe.isMatchRecipe(filter)) {
      matchRecipes.push(recipe)
      ingredientsObj = { ...ingredientsObj, ...recipe.ingredientsList }
      appliancesObj = { ...appliancesObj, ...recipe.appliancesList }
      ustensilsObj = { ...ustensilsObj, ...recipe.ustensilsList }
    }
  }

  const ingredients = Object.keys(ingredientsObj).sort()
  const appliances = Object.keys(appliancesObj).sort()
  const ustensils = Object.keys(ustensilsObj).sort()

  return { matchRecipes, ingredients, appliances, ustensils, filter }
}

const render = filter => View(getMatchRecipes(filter))

export default render
