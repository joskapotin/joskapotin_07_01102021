import recipes from "./data/recipes.js"
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
let recipesList = [...recipes]

// get filters elements to populate secondary search menu
const getIngredients = recipes => {
  const ingredientsDup = recipes.flatMap(recipe => {
    return recipe.ingredients.map(ingredients => {
      return ingredients.ingredient.toLowerCase()
    })
  })

  return [...new Set(ingredientsDup.sort())]
}

const getAppliances = recipes => {
  const appliancesDup = recipes.map(recipe => {
    return recipe.appliance.toLowerCase()
  })

  return [...new Set(appliancesDup.sort())]
}

const getUstensils = recipes => {
  const ustensilsDup = recipes.flatMap(recipe => {
    return recipe.ustensils.map(ustensil => {
      return ustensil.toLowerCase()
    })
  })

  return [...new Set(ustensilsDup.sort())]
}

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
const populateRecipesList = recipes => {
  const uiRecipesList = document.getElementById("recipes-list")
  uiRecipesList.innerHTML = ""
  recipes.forEach(recipe => {
    uiRecipesList.appendChild(uiRecipe(recipe))
  })
}

// RENDER HTML
const render = (recipesToRender = recipesList) => {
  recipesToRender = recipesToRender.sort((a, b) => a.name.localeCompare(b.name))
  populateSecondaryMenu(uiIngredientsMenu, getIngredients(recipesToRender), "ingredient")
  populateSecondaryMenu(uiAppliancesMenu, getAppliances(recipesToRender), "appliance")
  populateSecondaryMenu(uiUstensilsMenu, getUstensils(recipesToRender), "ustensil")
  populateRecipesList(recipesToRender)
}

render()

// TEST
const isName = (term, recipe) => {
  return recipe.name.toLowerCase().includes(term.toLowerCase())
}

const isIngredient = (term, recipe) => {
  return recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(term.toLowerCase()))
}

const isAppliance = (term, recipe) => {
  return recipe.appliance.toLowerCase().includes(term.toLowerCase())
}

const isUstensil = (term, recipe) => {
  return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(term.toLowerCase()))
}

const isDescription = (term, recipe) => {
  return recipe.description.toLowerCase().includes(term.toLowerCase())
}

const isFilter = (term, type) => {
  return filters[type].some(elem => elem === term)
}

// SEARCH
const searchPrimary = term => {
  // const regex = /\s|,\s|'/gm

  const matchRecipes = []

  recipesList.forEach(recipe => {
    if (isName(term, recipe) || isIngredient(term, recipe) || isDescription(term, recipe) || isAppliance(term, recipe) || isUstensil(term, recipe)) {
      matchRecipes.push(recipe)
    }
  })

  render(matchRecipes)
}

// Trigger primary search
uiSearchPrimary.addEventListener("input", e => {
  if (e.target.value.length < 3) {
    render()
  }
  if (e.target.value.length >= 3) {
    searchPrimary(e.target.value, recipes)
  }
})

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  const ingredients = Object.values(filters.ingredient)
  const appliances = Object.values(filters.appliance)
  const ustensils = Object.values(filters.ustensil)

  // if there is no filter fill the list with all the recipes
  if (ingredients.length === 0 && appliances.length === 0 && ustensils.length === 0) recipesList = [...recipes]

  // create à list of ids to remove from the list of recipes
  const recipesIdsDup = []

  ingredients.forEach(element => {
    recipesList.forEach(recipe => {
      if (!isIngredient(element, recipe)) {
        recipesIdsDup.push(recipe.id)
      }
    })
  })

  appliances.forEach(element => {
    recipesList.forEach(recipe => {
      if (!isAppliance(element, recipe)) {
        recipesIdsDup.push(recipe.id)
      }
    })
  })

  ustensils.forEach(element => {
    recipesList.forEach(recipe => {
      if (!isUstensil(element, recipe)) {
        recipesIdsDup.push(recipe.id)
      }
    })
  })

  const recipesIds = [...new Set(recipesIdsDup)]

  console.log(recipesIds)

  recipesIds.forEach(id => {
    const index = recipesList.findIndex(recipe => recipe.id === id)
    recipesList.splice(index, 1)
  })

  render(recipesList)
}

// FILTERS

// handle filters menu
document.addEventListener("click", e => {
  const iSenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (!iSenuItem && !isFilterItem) return

  const term = e.target.textContent
  const type = e.target.dataset.type

  // update filters object
  if (isFilterItem) {
    filters[type].pop(term)
  } else if (!isFilter(term, type)) {
    filters[type].push(term)
  }

  // update filters ui
  populateFiltersList()

  // update recipes list
  updateRecipesList()
})
