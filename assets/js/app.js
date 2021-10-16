import recipes from "./data/recipesObj.js"
import recipesIds from "./data/recipesIds.js"
import recipesIndex from "./data/recipesIndex.js"
import dropdownModule from "./modules/dropdown.module.js"
import uiDropdownMenu from "./components/dropdown-menu.component.js"
import uiFiltersList from "./components/filters-list.component.js"
import uiRecipe from "./components/recipe.component.js"

dropdownModule()

// DOM elements
const uiSearchPrimary = document.querySelector(".form-control-primary")
const uiNavSecondary = document.querySelector(".nav-secondary")
const uiIngredientsMenu = document.querySelector(".dropdown-ingredients")
const uiAppliancesMenu = document.querySelector(".dropdown-appliances")
const uiUstensilsMenu = document.querySelector(".dropdown-ustensils")

// VARIABLES
const filters = { ingredient: [], appliance: [], ustensil: [] }

console.log("recipes", recipes)
console.log("recipesIds", recipesIds)
console.log("recipesIndex", recipesIndex)

const matchRecipesIds = []
const matchRecipesIndex = {}
const leftRecipesIds = []
const leftRecipesIndex = {}

// populate secondary search menus
const populateSecondaryMenu = (uiMenu, elements, elementsType) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu(elements, elementsType))
}

// populate filters list
const populateFiltersList = () => {
  document.querySelector(".filters-list")?.remove()
  uiNavSecondary.parentNode.insertBefore(uiFiltersList(filters), uiNavSecondary)
}

// populate recipes list
const populateRecipesList = ids => {
  const uiRecipesList = document.getElementById("recipes-list")
  uiRecipesList.innerHTML = ""
  ids.forEach(id => {
    uiRecipesList.appendChild(uiRecipe(recipes[id]))
  })
}

// RENDER HTML
const render = (index, recipesIds) => {
  populateSecondaryMenu(uiIngredientsMenu, Object.keys(index.ingredients).sort(), "ingredient")
  populateSecondaryMenu(uiAppliancesMenu, Object.keys(index.appliance).sort(), "appliance")
  populateSecondaryMenu(uiUstensilsMenu, Object.keys(index.ustensils).sort(), "ustensil")
  populateRecipesList(recipesIds)
}
render(recipesIndex, recipesIds)

// utils
const isName = searchString => {
  return recipe.name.toLowerCase().includes(searchString.toLowerCase())
}

const isIngredient = (searchString, recipe) => {
  return recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(searchString.toLowerCase()))
}

const isDescription = (searchString, recipe) => {
  return recipe.description.toLowerCase().includes(searchString.toLowerCase())
}

const isFilter = (filter, key) => {
  return filters[key].some(elem => elem === filter)
}

// SEARCH
const searchPrimary = searchString => {
  // const regex = /\s|,\s|'/g
  matchRecipesIds.length = 0

  // Init recipes list with filters
  if (Object.keys(filters).length > 0) {
  }
  // search in titles
  for (const [key, values] of Object.entries(recipesIndex.names)) {
    if (key.includes(searchString)) {
      values.forEach(value => {
        matchRecipesIds.push(value)
      })
    }
  }

  // search in ingredients

  console.log(matchRecipesIds)
  render(recipesIndex, matchRecipesIds)
}

// Trigger primary search
uiSearchPrimary.addEventListener("input", e => {
  if (e.target.value.length < 3) {
    render(recipesIndex, recipesIds)
  }
  if (e.target.value.length >= 3) {
    searchPrimary(e.target.value)
  }
})

// handle filters list
document.addEventListener("click", e => {
  const iSenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (!iSenuItem && !isFilterItem) return

  const filter = e.target.textContent
  const key = e.target.dataset.type

  if (isFilterItem) {
    filters[key].pop(filter)
    console.log(filters)
    populateFiltersList()
    return
  }

  if (isFilter(filter, key)) return
  filters[key].push(filter)
  console.log(filters)
  populateFiltersList()
})
