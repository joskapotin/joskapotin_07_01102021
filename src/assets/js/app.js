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
const render = ({ matchRecipes, secondaryMenuItems } = { matchRecipes: recipes, secondaryMenuItems: getSecondaryMenuItems(recipes) }) => {
  const ingredients = Object.keys(secondaryMenuItems.ingredients).sort()
  const appliances = Object.keys(secondaryMenuItems.appliances).sort()
  const ustensils = Object.keys(secondaryMenuItems.ustensils).sort()

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
 * retreive the items form an array of recipes or from a single recipe
 * use only when there is no filters
 * @param {Object[]|Object} recipes Array of recipes or a single recipe
 * @returns {Object[]} return an object with item as attributs. Prevent dup
 */
const getSecondaryMenuItems = recipes => {
  const secondaryMenuItems = {
    ingredients: {},
    appliances: {},
    ustensils: {},
  }

  const getItems = recipe => {
    getIngredients(recipe).forEach(ingredient => {
      secondaryMenuItems.ingredients[ingredient] = true
    })
    getAppliances(recipe).forEach(appliance => {
      secondaryMenuItems.appliances[appliance] = true
    })
    getUstensils(recipe).forEach(ustensil => {
      secondaryMenuItems.ustensils[ustensil] = true
    })
  }

  if (Array.isArray(recipes)) {
    recipes.forEach(recipe => {
      getItems(recipe)
    })
  } else {
    getItems(recipes)
  }

  return secondaryMenuItems
}

/**
 * Filter recipes
 * @returns {recipes[]} recipes that match the filters
 */
const createMatchRecipes = () => {
  // if no filters return all recipes
  if (filters.main.length === 0 && filters.ingredients.length === 0 && filters.appliances.length === 0 && filters.ustensils.length === 0) {
    render()
    return
  }

  // create an array with only the active filters
  const activeFilterCats = Object.keys(filters).filter(filterCat => filters[filterCat].length > 0)

  // we want to store ingredients, appliances and ustensils of valid recipe has we loop through each recipes to update the secondary menu
  // storing those items has objects prevent the duplication
  let secondaryMenuItems = {}

  // recipe tester
  const isValidRecipe = recipe => {
    let isValid = true

    activeFilterCats.forEach(filterCat => {
      filters[filterCat].forEach(filterTerm => {
        if (filterCat === "main" && !isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) {
          isValid = false
        }
        if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) {
          isValid = false
        }
        if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) {
          isValid = false
        }
        if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) {
          isValid = false
        }
      })
    })

    if (isValid) {
      secondaryMenuItems = { ...secondaryMenuItems, ...getSecondaryMenuItems(recipe) }
    }

    return isValid
  }

  // test each recipes
  const matchRecipes = recipes.filter(recipe => {
    return isValidRecipe(recipe)
  })

  render({ matchRecipes, secondaryMenuItems })
}

// SECTION UI

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
