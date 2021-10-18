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

// render secondary search menus
const renderSecondaryMenu = ({ uiMenu, filterTerms, filterCat }) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu({ filterTerms, filterCat }))
}

// render filters list
const renderFiltersList = () => {
  document.querySelector(".filters-list")?.remove()
  uiNavSecondary.parentNode.insertBefore(uiFiltersList(filters), uiNavSecondary)
}

// render recipes list
const renderRecipesList = matchRecipes => {
  const uiRecipesList = document.getElementById("recipes-list")
  uiRecipesList.innerHTML = ""
  matchRecipes.forEach(recipe => {
    uiRecipesList.appendChild(uiRecipe(recipe))
  })
}

// render HTML
const render = () => {
  const { matchRecipes, ingredients, appliances, ustensils } = getMatchRecipes()
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
 * @param {{filterTerm:string,recipe:object}}
 * @returns {boolean} true or false
 */
const isName = ({ filterTerm, recipe }) => recipe.name.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ingredients of the recipe
 * @param {{filterTerm:string,recipe:object}}
 * @returns {boolean} true or false
 */
const isIngredient = ({ filterTerm, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the appliances of the recipe
 * @param {{filterTerm:string,recipe:object}}
 * @returns {boolean} true or false
 */
const isAppliance = ({ filterTerm, recipe }) => recipe.appliance.toLowerCase().includes(filterTerm.toLowerCase())

/**
 * Test if a term is include in the ustensils of the recipe
 * @param {{filterTerm:string,recipe:object}}
 * @returns {boolean} true or false
 */
const isUstensil = ({ filterTerm, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))

/**
 * Test if a term is include in the description of the recipe
 * @param {{filterTerm:string,recipe:object}}
 * @returns {boolean} true or false
 */
const isDescription = ({ filterTerm, recipe }) => recipe.description.toLowerCase().includes(filterTerm.toLowerCase())

// SECTION SEARCH

const getIngredients = recipe => {
  return recipe.ingredients.reduce((ingredients, element) => {
    ingredients[element.ingredient.toLowerCase()] = true
    return ingredients
  }, {})
}

const getAppliances = recipe => {
  return Object.fromEntries([[recipe.appliance.toLowerCase(), "true"]])
}

const getUstensils = recipe => {
  recipe.ustensils.reduce((ustensils, element) => {
    ustensils[element.toLowerCase()] = true
    return ustensils
  }, {})
}

/**
 * filter recipes and gather ingredients, appliances and ustensils
 * @returns {( matchRecipes:Array, ingredients:Object, appliances:Object, ustensils:Object )} data to render
 */
const getMatchRecipes = () => {
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

// handle primary search
uiSearchPrimary.addEventListener("input", e => {
  filters.main.length = 0
  if (e.target.value.length >= 3) {
    filters.main[0] = e.target.value
  }

  render()
})

// handle filterTerms search
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
