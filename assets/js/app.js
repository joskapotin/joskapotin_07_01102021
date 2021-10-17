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
const render = ({ matchRecipes, ingredients, appliances, ustensils }) => {
  renderFiltersList()
  renderSecondaryMenu({ uiMenu: uiIngredientsMenu, filterTerms: ingredients, filterCat: "ingredients" })
  renderSecondaryMenu({ uiMenu: uiAppliancesMenu, filterTerms: appliances, filterCat: "appliances" })
  renderSecondaryMenu({ uiMenu: uiUstensilsMenu, filterTerms: ustensils, filterCat: "ustensils" })
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
  return recipe.ingredients.map(ingredients => {
    return ingredients.ingredient.toLowerCase()
  })
}

const getAppliances = recipe => {
  return [recipe.appliance.toLowerCase()]
}

const getUstensils = recipe => {
  return recipe.ustensils.map(ustensil => {
    return ustensil.toLowerCase()
  })
}

/**
 * loop the recipes to get the items and return them without dups
 * use only when there is no filters
 * @param {recipes[]} recipes
 * @returns {{ingredients:string[],appliances:string[],ustensils:string[]}}
 */
const getSecondaryMenuItems = recipes => {
  let ingredientsDup = []
  let appliancesDup = []
  let ustensilsDup = []

  recipes.forEach(recipe => {
    ingredientsDup = [...ingredientsDup, ...getIngredients(recipe)]
    appliancesDup = [...appliancesDup, ...getAppliances(recipe)]
    ustensilsDup = [...ustensilsDup, ...getUstensils(recipe)]
  })

  console.log(appliancesDup)

  const secondaryMenuItems = { ingredients: [...new Set(ingredientsDup.sort())], appliances: [...new Set(appliancesDup.sort())], ustensils: [...new Set(ustensilsDup.sort())] }

  return secondaryMenuItems
}

/**
 * Filter recipes
 * @returns {recipes[]} recipes that match the filters
 */
const createMatchRecipes = () => {
  // if no filters return all recipes
  if (filters.main.length === 0 && filters.ingredients.length === 0 && filters.appliances.length === 0 && filters.ustensils.length === 0) {
    const matchRecipes = recipes.sort((a, b) => a.name.localeCompare(b.name))
    const { ingredients, appliances, ustensils } = getSecondaryMenuItems(matchRecipes)
    render({ matchRecipes, ingredients, appliances, ustensils })
    return
  }

  // create an array with only the active filters
  const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)

  // // create results storage object
  // const resultStorage = {
  //   filters: {
  //     main: [],
  //     ingredients: [],
  //     appliances: [],
  //     ustensils: [],
  //   },
  //   recipeId: {},
  // }

  // // store result
  // const storeResult = ({ filterCat, filterTerm, recipe, ingredients = [], appliances = [], ustensils = [] }) => {
  //   // store recipes by filter category and by term
  //   if (resultStorage.filters[filterCat][filterTerm]) resultStorage.filters[filterCat][filterTerm].push(recipe)
  //   else resultStorage.filters[filterCat][filterTerm] = [recipe]

  //   // store items by recipe id and type
  //   if (!resultStorage.recipeId[recipe.id]) {
  //     resultStorage.recipeId[recipe.id] = { ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] }
  //   }
  // }

  // console.log(resultStorage)

  const isValidRecipe = recipe => {
    let isValid = true

    activeFilterCats.forEach(filterCat => {
      filters[filterCat].forEach(filterTerm => {
        if (filterCat === "main" && !isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) {
          isValid = false
          // storeResult({ filterCat, filterTerm, recipe })
        }
        if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) {
          isValid = false
          // storeResult({ filterCat, filterTerm, recipe, ingredients: getIngredients(recipe) })
        }
        if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) {
          isValid = false
          // storeResult({ filterCat, filterTerm, recipe, appliances: getAppliances(recipe) })
        }
        if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) {
          isValid = false
          // storeResult({ filterCat, filterTerm, recipe, ustensils: getUstensils(recipe) })
        }
      })
    })

    return isValid
  }

  const matchRecipes = recipes
    .filter(recipe => {
      return isValidRecipe(recipe)
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const { ingredients, appliances, ustensils } = getSecondaryMenuItems(matchRecipes)

  render({ matchRecipes, ingredients, appliances, ustensils })
}

// SECTION ACTION

// handle primary search
uiSearchPrimary.addEventListener("input", e => {
  filters.main.length = 0
  if (e.target.value.length >= 3) {
    filters.main[0] = e.target.value
  }

  createMatchRecipes()
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

  createMatchRecipes()
})

// SECTION INIT
dropdownModule()
createMatchRecipes()
