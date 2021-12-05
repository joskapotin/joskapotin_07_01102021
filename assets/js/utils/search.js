import AllRecipes from "../data/recipes.js"
import Recipe from "../models/Recipe.js"
import Matcher from "./matcher.js"

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

  AllRecipes.forEach(element => {
    const recipe = new Recipe(element)
    const matcher = new Matcher(recipe)

    if (matcher.isMatchRecipe(filter)) {
      matchRecipes.push(matcher.getRecipe())
      ingredientsObj = { ...ingredientsObj, ...matcher.getRecipe().ingredientsList }
      appliancesObj = { ...appliancesObj, ...matcher.getRecipe().appliancesList }
      ustensilsObj = { ...ustensilsObj, ...matcher.getRecipe().ustensilsList }
    }
  })

  const ingredients = Object.keys(ingredientsObj).sort()
  const appliances = Object.keys(appliancesObj).sort()
  const ustensils = Object.keys(ustensilsObj).sort()

  return { matchRecipes, ingredients, appliances, ustensils, filter }
}

export default getMatchRecipes
