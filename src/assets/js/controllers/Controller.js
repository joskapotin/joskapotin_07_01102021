import Recipe from "../models/Recipe.js"
import View from "../views/View.js"

export default class {
  constructor(recipes) {
    this.recipes = recipes
  }

  getData() {
    let matchRecipes = []
    let ingredientsObj = {}
    let appliancesObj = {}
    let ustensilsObj = {}

    this.recipes.forEach(element => {
      const recipe = new Recipe(element)
      matchRecipes.push(recipe)
      ingredientsObj = { ...ingredientsObj, ...recipe.ingredientsList }
      appliancesObj = { ...appliancesObj, ...recipe.appliancesList }
      ustensilsObj = { ...ustensilsObj, ...recipe.ustensilsList }
    })

    const ingredients = Object.keys(ingredientsObj).sort()
    const appliances = Object.keys(appliancesObj).sort()
    const ustensils = Object.keys(ustensilsObj).sort()

    return { matchRecipes, ingredients, appliances, ustensils }
  }

  render() {
    return new View(this.getData())
  }
}
