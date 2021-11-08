import AllRecipes from "./data/recipes.js"
import dropdownModule from "./modules/dropdown.module.js"
import uiDropdownMenu from "./components/dropdown-menu.component.js"
import createFiltersList from "./components/filters-list.component.js"
import CreateUiRecipe from "./components/recipe.component.js"
import recipes from "./data/recipes.js"

// DOM elements
const uiSearchPrimary = document.querySelector(".form-control-primary")
const uiNavSecondary = document.querySelector(".nav-secondary")
const uiSecondaryMenus = document.querySelectorAll("[data-dropdown]")
const uiIngredientsMenu = document.querySelector(".dropdown-ingredients")
const uiAppliancesMenu = document.querySelector(".dropdown-appliances")
const uiUstensilsMenu = document.querySelector(".dropdown-ustensils")

// VARIABLES

/**
 * Search filters
 * @type {{main:string[], ingredients:string[], appliances:string[], ustensils:string[]}}
 */
const filters = {
  main: [],
  ingredients: [],
  appliances: [],
  ustensils: [],
}

// UTILS

/**
 * Sanitize a string
 * @param {string} string - raw string
 * @return {string} sanitized string
 */
const sanitize = string => {
  const regex = new RegExp(/"/g)
  return string.toLowerCase().replace(regex, " ")
}

/**
 * filter secondary menu item
 * @param {HTMLElement} uiMenu - menu to filter
 */
const filterSecondaryMenuItems = uiMenu => {
  const term = sanitize(uiMenu.value)
  const regex = new RegExp(`^${term}`)
  const menuItems = uiMenu.parentElement.querySelectorAll(".dropdown-menu__item")

  menuItems.forEach(item => {
    const itemTerm = sanitize(item.textContent)

    if (regex.test(itemTerm)) {
      item.classList.remove("display-none")
    } else item.classList.add("display-none")
  })
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

// SECTION SEARCH

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 * Time complexity O(n)
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getIngredients = recipe =>
  recipe.ingredients.reduce((ingredients, element) => {
    ingredients[sanitize(element.ingredient)] = true
    return ingredients
  }, {})

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 * Time complexity 0
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getAppliances = recipe => Object.fromEntries([[sanitize(recipe.appliance), "true"]])

/**
 * Return the ingredients has an object
 * We choose this instead of an array to prevent duplication
 * Time complexity O(n)
 *
 * @param {object} recipe - a recipe
 * @returns {object} an object with ingredient has keys and values set to true
 */
const getUstensils = recipe =>
  recipe.ustensils.reduce((ustensils, ustensil) => {
    ustensils[sanitize(ustensil)] = true
    return ustensils
  }, {})

/**
 * Test if the term in main search is part of a recipe
 * @param {object} obj - the term to test an the recipe
 * @param {string} obj.filterTerm - the term to test
 * @param {object} obj.recipe - the recipe to search in
 * @returns {boolean} wether or not the term is contain in the recipe
 */
const mainSearchTest = ({ filterTerm, recipe }) => {
  if (!isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) return false
  return true
}

/**
 * Main function that loop through every recipes and return the data to render
 * Time complexity O(n) * O(1) * O(1) = O(n)
 *
 * @return {{matchRecipes:object[],ingredients:object,appliances:object,ustensils:object}}
 */
const getMatchDatas = () => {
  const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)

  const matchRecipes = []

  let ingredients = {}
  let appliances = {}
  let ustensils = {}

  for (const recipe of AllRecipes) {
    // Time complexity O(n)

    let isMatch = true

    for (const filterCat of activeFilterCats) {
      // Time complexity O(1)
      for (const filterTerm of filters[filterCat]) {
        // Time complexity O(1)
        if (filterCat === "main") isMatch = mainSearchTest({ filterTerm, recipe })
        else if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) isMatch = false
        else if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) isMatch = false
        else if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) isMatch = false
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

// SECTION RENDER

/**
 * render secondary search menus
 *
 * @param {object} obj - an object that contain the target DOMelement, an array of filter terms and the category of filter
 * @param {HTMLElement} obj.uiMenu - the target DOM element
 * @param {string[]} obj.filterTerms - an array of filter terms
 * @param {string} obj.filterCat - the category of filter
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
  uiNavSecondary.parentNode.insertBefore(createFiltersList(filters), uiNavSecondary)
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
    uiRecipesList.appendChild(CreateUiRecipe(recipe))
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
  const isMenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (!isMenuItem && !isFilterItem) return

  const filterTerm = e.target.textContent
  const { filterCat } = e.target.dataset

  // update filters object
  if (isFilterItem) {
    const filterTermIndex = filters[filterCat].indexOf(filterTerm)
    filters[filterCat].splice(filterTermIndex, 1)
  } else if (!filters[filterCat].some(elem => elem === filterTerm)) {
    filters[filterCat].push(filterTerm)
  }

  render()
})

uiSecondaryMenus.forEach(menu => {
  menu.addEventListener("input", e => {
    filterSecondaryMenuItems(e.target)
  })
})

// SECTION INIT
dropdownModule()
render()
