import AllRecipes from "../data/recipes.js"
import Recipe from "../models/Recipe.js"
import View from "../views/View.js"

export default class {
  constructor() {}

  /**
   * Main function that loop through every recipes and return the data to render
   * Time complexity O(n) * O(1) * O(1) = O(n)
   *
   * @return {{matchRecipes:object[],ingredients:object,appliances:object,ustensils:object}}
   */
  getMatchDatas(filters) {
    const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)
    const matchRecipes = []
    let ingredientsObj = {}
    let appliancesObj = {}
    let ustensilsObj = {}

    AllRecipes.forEach(element => {
      let isMatch = true
      const recipe = new Recipe(element)

      activeFilterCats.forEach(filterCat => {
        filters[filterCat].forEach(filterTerm => {
          if (filterCat === "main" && !isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) isMatch = false
          else if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) isMatch = false
          else if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) isMatch = false
          else if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) isMatch = false
        })
      })

      if (isMatch) {
        matchRecipes.push(recipe)
        ingredientsObj = { ...ingredientsObj, ...recipe.ingredientsList }
        appliancesObj = { ...appliancesObj, ...recipe.appliancesList }
        ustensilsObj = { ...ustensilsObj, ...recipe.ustensilsList }
      }
    })

    const ingredients = Object.keys(ingredientsObj).sort()
    const appliances = Object.keys(appliancesObj).sort()
    const ustensils = Object.keys(ustensilsObj).sort()

    return { matchRecipes, ingredients, appliances, ustensils, filters }
  }

  render(filters) {
    return new View(this.getMatchDatas(filters))
  }
}

// SECTION TESTS

/**
 * Test if a term is include in the name of the recipe
 * Time complexity O(n)
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string} obj.filterTerm - term to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the name of the recipe
 */
const isName = ({ filterTerm, recipe }) => recipe.name.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ingredients of the recipe
 * Time complexity O(n) * O(1) = O(n)
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string} obj.filterTerm - term to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the ingredients of the recipe
 */
const isIngredient = ({ filterTerm, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the appliances of the recipe
 * Time complexity O(n)
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string} obj.filterTerm - term to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the appliances of the recipe
 */
const isAppliance = ({ filterTerm, recipe }) => recipe.appliance.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ustensils of the recipe
 * Time complexity O(n) * O(1) = O(n)
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string} obj.filterTerm - term to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the ustensils of the recipe
 */
const isUstensil = ({ filterTerm, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the description of the recipe
 * Time complexity O(n)
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string} obj.filterTerm - term to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the description of the recipe
 */
const isDescription = ({ filterTerm, recipe }) => recipe.description.toLowerCase().includes(filterTerm.toLowerCase())
