import AllRecipes from "../data/recipes.js"
import Recipe from "../models/Recipe.js"
import View from "../views/View.js"

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

/**
 * Test if a recipe match any of the filters
 *
 * @param {object} obj - an object that contain the recipe the filters
 * @param {object} obj.recipe - the recipe
 * @param {object} obj.filters - the filters
 * @returns {boolean} - whether or not the recipe match one of the filters
 */
const isMatchRecipe = ({ recipe, filters }) => {
  const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)

  let mainSearchResult = true
  let ingredientsSearchResult = true
  let appliancesSearchResult = true
  let ustensilsSearchResult = true

  activeFilterCats.forEach(filterCat => {
    const filterTerms = filters[filterCat]

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
        console.log("no filters")
    }
  })

  if (mainSearchResult && ingredientsSearchResult && appliancesSearchResult && ustensilsSearchResult) return true
  return false
}

/**
 * Main function that loop through every recipes and return the data to render
 * Time complexity O(n) * O(1) * O(1) = O(n)
 *
 * @param {object} filters
 * @return {{matchRecipes:object[],ingredients:object,appliances:object,ustensils:object}}
 */
const getMatchRecipes = filters => {
  const matchRecipes = []
  let ingredientsObj = {}
  let appliancesObj = {}
  let ustensilsObj = {}

  AllRecipes.forEach(element => {
    const recipe = new Recipe(element)

    if (isMatchRecipe({ recipe, filters })) {
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

const render = filters => View(getMatchRecipes(filters))

export default render
