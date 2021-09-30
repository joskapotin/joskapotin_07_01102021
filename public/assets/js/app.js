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

const refRecipes = recipes
const filters = []

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

// init search menus
populateSecondaryMenu(uiIngredientsMenu, getIngredients(refRecipes), "ingredient")
populateSecondaryMenu(uiAppliancesMenu, getAppliances(refRecipes), "appliance")
populateSecondaryMenu(uiUstensilsMenu, getUstensils(refRecipes), "ustensil")
populateRecipesList(refRecipes)

// SEARCH
const isName = (searchString, recipe) => {
  return recipe.name.toLowerCase().includes(searchString.toLowerCase())
}

const isIngredient = (searchString, recipe) => {
  return recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(searchString.toLowerCase()))
}

const isDescription = (searchString, recipe) => {
  return recipe.description.toLowerCase().includes(searchString.toLowerCase())
}

const isFilter = searchString => {
  return filters.some(filter => filter.name === searchString)
}

const searchPrimary = (searchString, recipes) => {
  // const regex = /\s|,\s|'/gm
  const matchRecipes = []

  recipes.forEach(recipe => {
    if (isName(searchString, recipe) || isIngredient(searchString, recipe) || isDescription(searchString, recipe)) {
      matchRecipes.push(recipe)
    }
  })

  populateSecondaryMenu(uiIngredientsMenu, getIngredients(matchRecipes), "ingredient")
  populateSecondaryMenu(uiAppliancesMenu, getAppliances(matchRecipes), "appliance")
  populateSecondaryMenu(uiUstensilsMenu, getUstensils(matchRecipes), "ustensil")
  populateRecipesList(matchRecipes)
}

// Trigger primary search
uiSearchPrimary.addEventListener("input", e => {
  if (e.target.value.length === 0) {
    populateSecondaryMenu(uiIngredientsMenu, getIngredients(refRecipes), "ingredient")
    populateSecondaryMenu(uiAppliancesMenu, getAppliances(refRecipes), "appliance")
    populateSecondaryMenu(uiUstensilsMenu, getUstensils(refRecipes), "ustensil")
    populateRecipesList(refRecipes)
  }
  if (e.target.value.length >= 3) {
    searchPrimary(e.target.value, refRecipes)
  }
})

// handle filters list
document.addEventListener("click", e => {
  const iSenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (iSenuItem && !isFilter(e.target.textContent)) {
    const filter = { name: e.target.textContent, type: e.target.dataset.type }
    filters.push(filter)
    populateFiltersList()
  } else if (isFilterItem) {
    const filterIndex = e.target.dataset.filterIndex
    filters.splice(filterIndex, 1)
    populateFiltersList()
  }
})
