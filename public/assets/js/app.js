import AllRecipes from "./data/recipes.js"
import dropdownModule from "./modules/dropdown.module.js"
import uiDropdownMenu from "./components/dropdown-menu.component.js"
import uiRecipe from "./components/recipe.component.js"

dropdownModule()

// DOM elements
const uiIngredientsMenu = document.querySelector(".dropdown-ingredients")
const uiAppliancesMenu = document.querySelector(".dropdown-appliance")
const uiUstensilsMenu = document.querySelector(".dropdown-ustensils")

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
const populateSecondaryMenu = (uiMenu, elements) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu(elements))
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
populateSecondaryMenu(uiIngredientsMenu, getIngredients(AllRecipes))
populateSecondaryMenu(uiAppliancesMenu, getAppliances(AllRecipes))
populateSecondaryMenu(uiUstensilsMenu, getUstensils(AllRecipes))
populateRecipesList(AllRecipes)

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

const searchPrimary = (searchString, recipes) => {
  // const regex = /\s|,\s|'/gm
  const matchRecipes = []

  recipes.forEach(recipe => {
    if (isName(searchString, recipe) || isIngredient(searchString, recipe) || isDescription(searchString, recipe)) {
      matchRecipes.push(recipe)
    }
  })

  populateSecondaryMenu(uiIngredientsMenu, getIngredients(matchRecipes))
  populateSecondaryMenu(uiAppliancesMenu, getAppliances(matchRecipes))
  populateSecondaryMenu(uiUstensilsMenu, getUstensils(matchRecipes))
  populateRecipesList(matchRecipes)
}

// Trigger search
const uiSearchPrimary = document.querySelector(".form-control-primary")
uiSearchPrimary.addEventListener("input", e => {
  if (e.target.value.length === 0) {
    populateSecondaryMenu(uiIngredientsMenu, getIngredients(AllRecipes))
    populateSecondaryMenu(uiAppliancesMenu, getAppliances(AllRecipes))
    populateSecondaryMenu(uiUstensilsMenu, getUstensils(AllRecipes))
    populateRecipesList(AllRecipes)
  }
  if (e.target.value.length >= 3) {
    searchPrimary(e.target.value, AllRecipes)
  }
})
