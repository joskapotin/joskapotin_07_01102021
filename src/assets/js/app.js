import AllRecipes from "./data/recipes.js"
import dropdownModule from "./modules/dropdown.module.js"
import uiDropdownMenu from "./components/dropdown-menu.component.js"
import uiRecipe from "./components/recipe.component.js"

dropdownModule()

// build default ingredients menu
const getAllIngredients = recipes => {
  const allIngredientsDup = recipes.flatMap(recipe => {
    return recipe.ingredients.map(ingredients => {
      return ingredients.ingredient.toLowerCase()
    })
  })

  return [...new Set(allIngredientsDup.sort())]
}

const uiIngredientsMenu = document.querySelector(".dropdown-ingredients")
uiIngredientsMenu.appendChild(uiDropdownMenu(getAllIngredients(AllRecipes)))

// build default appliance menu
const getAllappliances = recipes => {
  const allappliancesDup = recipes.map(recipe => {
    return recipe.appliance.toLowerCase()
  })

  return [...new Set(allappliancesDup.sort())]
}

const uiAppliancesMenu = document.querySelector(".dropdown-appliance")
uiAppliancesMenu.appendChild(uiDropdownMenu(getAllappliances(AllRecipes)))

// build default ustensils menu
const getAllUstensils = recipes => {
  const allUstensilsDup = recipes.flatMap(recipe => {
    return recipe.ustensils.map(ustensil => {
      return ustensil.toLowerCase()
    })
  })

  return [...new Set(allUstensilsDup.sort())]
}

const uiUstensilsMenu = document.querySelector(".dropdown-ustensils")
uiUstensilsMenu.appendChild(uiDropdownMenu(getAllUstensils(AllRecipes)))

// populate recipes list
const populateRecipesList = recipes => {
  const uiRecipesList = document.getElementById("recipes-list")
  uiRecipesList.innerHTML = ""
  recipes.forEach(recipe => {
    uiRecipesList.appendChild(uiRecipe(recipe))
  })
}

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

  populateRecipesList(matchRecipes)
}

// Trigger search
const uiSearchPrimary = document.querySelector(".form-control-primary")
uiSearchPrimary.addEventListener("input", e => {
  if (e.target.value.length === 0) {
    populateRecipesList(AllRecipes)
  }
  if (e.target.value.length >= 3) {
    searchPrimary(e.target.value, AllRecipes)
  }
})
