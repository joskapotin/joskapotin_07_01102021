import AllRecipes from "../data/recipes.js"
import Recipe from "../models/RecipeOLD.js"
import View from "../views/View.js"

// SECTION TESTS ? ASSOCIER CES FONCTIONS A LA CLASSE RECIPE ?

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

/**
 * Test if one term in an array is include in the name or in the ingredients or in the description of a recipe
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string[]} obj.filterTerms - terms to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not one term is include in the name or in the ingredients or in the description of a recipe
 */
const isMatchMain = ({ filterTerms, recipe }) => filterTerms.some(filterTerm => isName({ filterTerm, recipe }) || isIngredient({ filterTerm, recipe }) || isDescription({ filterTerm, recipe }))

/**
 * Test if one term in an array is include in the ingredients
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string[]} obj.filterTerms - terms to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not one term is include in the ingredients
 */
const isMatchIngredients = ({ filterTerms, recipe }) => filterTerms.some(filterTerm => isIngredient({ filterTerm, recipe }))

/**
 * Test if one term in an array is include in the appliances
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string[]} obj.filterTerms - terms to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not one term is include in the appliance
 */
const isMatchAppliances = ({ filterTerms, recipe }) => filterTerms.some(filterTerm => isAppliance({ filterTerm, recipe }))

/**
 * Test if one term in an array is include in the ustensils
 *
 * @param {object} obj - an object that contain the term to search and the recipe to search in
 * @param {string[]} obj.filterTerms - terms to search
 * @param {object} obj.recipe - object to search in
 * @returns {boolean} whether or not one term is include in the ustensils
 */
const isMatchUstensils = ({ filterTerms, recipe }) => filterTerms.some(filterTerm => isUstensil({ filterTerm, recipe }))

// test
const isMatchRecipeTest = ({ recipe, filter }) => {
  const activeFilterCats = Object.keys(filter).filter(filterCat => filter[filterCat].length > 0)
  if (activeFilterCats.length === 0) return true

  const isMatch = ({ filterCat, filterTerms }) => {
    switch (filterCat) {
      case "main":
        return isMatchMain({ filterTerms, recipe })

      case "ingredients":
        return isMatchIngredients({ filterTerms, recipe })

      case "appliances":
        return isMatchAppliances({ filterTerms, recipe })

      case "ustensils":
        return isMatchUstensils({ filterTerms, recipe })

      default:
        return true
    }
  }

  return !activeFilterCats.some(filterCat => !isMatch({ filterCat, filterTerms: filter[filterCat] }))
}

/**
 * Test if a recipe match any of the filter
 *
 * @param {object} obj - an object that contain the recipe the filter
 * @param {object} obj.recipe - the recipe
 * @param {object} obj.filter - the filter
 * @returns {boolean} - whether or not the recipe match one of the filter
 */
const isMatchRecipe = ({ recipe, filter }) => {
  const activeFilterCats = Object.keys(filter).filter(filterCat => filter[filterCat].length > 0)

  let mainSearchResult = true
  let ingredientsSearchResult = true
  let appliancesSearchResult = true
  let ustensilsSearchResult = true

  activeFilterCats.forEach(filterCat => {
    const filterTerms = filter[filterCat]

    switch (filterCat) {
      case "main":
        mainSearchResult = isMatchMain({ filterTerms, recipe })
        break

      case "ingredients":
        ingredientsSearchResult = isMatchIngredients({ filterTerms, recipe })
        break

      case "appliances":
        appliancesSearchResult = isMatchAppliances({ filterTerms, recipe })
        break

      case "ustensils":
        ustensilsSearchResult = isMatchUstensils({ filterTerms, recipe })
        break

      default:
        console.log("no filter")
    }
  })

  if (!mainSearchResult || !ingredientsSearchResult || !appliancesSearchResult || !ustensilsSearchResult) return false
  return true
}

/**
 * Main function that loop through every recipes and return the data to render
 * Time complexity O(n) * O(1) * O(1) = O(n)
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

    if (isMatchRecipeTest({ recipe, filter })) {
      // peut on faire le test et la collecte en meme temps ?
      matchRecipes.push(recipe)
      ingredientsObj = { ...ingredientsObj, ...recipe.ingredientsList }
      appliancesObj = { ...appliancesObj, ...recipe.appliancesList }
      ustensilsObj = { ...ustensilsObj, ...recipe.ustensilsList }
    }
  })

  const ingredients = Object.keys(ingredientsObj).sort()
  const appliances = Object.keys(appliancesObj).sort()
  const ustensils = Object.keys(ustensilsObj).sort()

  return { matchRecipes, ingredients, appliances, ustensils, filter }
}

const render = filter => View(getMatchRecipes(filter))

export default render
