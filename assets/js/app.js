import recipes from "./data/recipes.js"
import dropdownModule from "./modules/dropdown.module.js"
import uiDropdownMenu from "./components/dropdown-menu.component.js"
import uiFiltersList from "./components/filters-list.component.js"
import uiRecipe from "./components/recipe.component.js"

// DOM elements
const uiSearchPrimary = document.querySelector(".form-control-primary")
const uiNavSecondary = document.querySelector(".nav-secondary")
const uiIngredientsMenu = document.querySelector(".dropdown-ingredients")
const uiAppliancesMenu = document.querySelector(".dropdown-appliances")
const uiUstensilsMenu = document.querySelector(".dropdown-ustensils")

// VARIABLES
const filters = { main: [], ingredients: [], appliances: [], ustensils: [] }

// SECTION RENDER

/**
 * render secondary search menus
 *
 * @param {object} param0 - an object that contain the target DOMelement, an array of filter terms and the category of filter
 * @param {HTMLElement} param0.uiMenu - the target DOMelement
 * @param {string[]} param0.filterTerms - an array of filter terms
 * @param {string} param0.filterCat - the category of filter
 */
const renderSecondaryMenu = ({ uiMenu, filterTerms, filterCat }) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu({ filterTerms, filterCat }))
}

/**
 * Render filters list
 *
 */
const renderFiltersList = () => {
  document.querySelector(".filters-list")?.remove()
  uiNavSecondary.parentNode.insertBefore(uiFiltersList(filters), uiNavSecondary)
}

/**
 * Render recipes list
 *
 * @param {array} recipes - an array of recipes
 */
const renderRecipesList = recipes => {
  const uiRecipesList = document.getElementById("recipes-list")
  uiRecipesList.innerHTML = ""
  recipes.forEach(recipe => {
    uiRecipesList.appendChild(uiRecipe(recipe))
  })
}

/**
 * Render everything
 *
 */
const render = () => {
  const { matchRecipes, ingredients, appliances, ustensils } = getMatchDatas()
  const ingredientsArr = Object.keys(ingredients).sort()
  const appliancesArr = Object.keys(appliances).sort()
  const ustensilsArr = Object.keys(ustensils).sort()

  renderFiltersList()
  renderSecondaryMenu({ uiMenu: uiIngredientsMenu, filterTerms: ingredientsArr, filterCat: "ingredients" })
  renderSecondaryMenu({ uiMenu: uiAppliancesMenu, filterTerms: appliancesArr, filterCat: "appliances" })
  renderSecondaryMenu({ uiMenu: uiUstensilsMenu, filterTerms: ustensilsArr, filterCat: "ustensils" })
  renderRecipesList(matchRecipes)
}

// SECTION TESTS

/**
 * Test if a term is include in the name of the recipe
 *
 * @param {object} param0 - an object that contain the term to search and the recipe to search in
 * @param {string} param0.filterTerm - term to search
 * @param {object} param0.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the name of the recipe
 */
const isName = ({ filterTerm, recipe }) => recipe.name.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ingredients of the recipe
 *
 * @param {object} param0 - an object that contain the term to search and the recipe to search in
 * @param {string} param0.filterTerm - term to search
 * @param {object} param0.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the ingredients of the recipe
 */
const isIngredient = ({ filterTerm, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the appliances of the recipe
 *
 * @param {object} param0 - an object that contain the term to search and the recipe to search in
 * @param {string} param0.filterTerm - term to search
 * @param {object} param0.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the appliances of the recipe
 */
const isAppliance = ({ filterTerm, recipe }) => recipe.appliance.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ustensils of the recipe
 *
 * @param {object} param0 - an object that contain the term to search and the recipe to search in
 * @param {string} param0.filterTerm - term to search
 * @param {object} param0.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the ustensils of the recipe
 */
const isUstensil = ({ filterTerm, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the description of the recipe
 *
 * @param {object} param0 - an object that contain the term to search and the recipe to search in
 * @param {string} param0.filterTerm - term to search
 * @param {object} param0.recipe - object to search in
 * @returns {boolean} whether or not the term is include in the description of the recipe
 */
const isDescription = ({ filterTerm, recipe }) => recipe.description.toLowerCase().includes(filterTerm.toLowerCase())

// SECTION SEARCH

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getIngredients = recipe => {
  return recipe.ingredients.reduce((ingredients, element) => {
    ingredients[element.ingredient.toLowerCase()] = true
    return ingredients
  }, {})
}

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getAppliances = recipe => {
  return Object.fromEntries([[recipe.appliance.toLowerCase(), "true"]])
}

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getUstensils = recipe => {
  recipe.ustensils.reduce((ustensils, element) => {
    ustensils[element.toLowerCase()] = true
    return ustensils
  }, {})
}

/**
 * Main function that loop through every recipes and return the data to render
 *
 * @return {object} matchData
 * @return {array} matchData.matchRecipes
 * @return {object} matchData.ingredients
 * @return {object} matchData.appliances
 * @return {object} matchData.ustensils
 */
const getMatchDatas = () => {
  const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)
  const matchRecipes = []
  let ingredients = {}
  let appliances = {}
  let ustensils = {}

  for (const recipe of recipes) {
    let isMatch = true

    for (const filterCat of activeFilterCats) {
      for (const filterTerm of filters[filterCat]) {
        if (filterCat === "main" && !isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) {
          isMatch = false
        }
        if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) {
          isMatch = false
        }
        if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) {
          isMatch = false
        }
        if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) {
          isMatch = false
        }
      }
    }

    if (isMatch) {
      matchRecipes.push(recipe)
      ingredients = { ...ingredients, ...getIngredients(recipe) }
      appliances = { ...appliances, ...getAppliances(recipe) }
      ustensils = { ...ustensils, ...getUstensils(recipe) }
    }
  }

  return { matchRecipes, ingredients, appliances, ustensils }
}

// SECTION UI

/**
 * Handle primary search
 * When input reach 3 characters, add filter term in filter category "main" and trigger render
 *
 */
uiSearchPrimary.addEventListener("input", e => {
  filters.main.length = 0
  if (e.target.value.length >= 3) {
    filters.main[0] = e.target.value
  }

  render()
})

/**
 * Handle filterTerms search
 * Add or remove filter and trigger render
 */
document.addEventListener("click", e => {
  const iSenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (!iSenuItem && !isFilterItem) return

  const filterTerm = e.target.textContent
  const type = e.target.dataset.type

  // update filters object
  if (isFilterItem) {
    const filterTermIndex = filters[type].indexOf(filterTerm)
    filters[type].splice(filterTermIndex, 1)
  } else if (!filters[type].some(elem => elem === filterTerm)) {
    filters[type].push(filterTerm)
  }

  render()
})

// SECTION INIT
dropdownModule()
render()
