import recipes from "./data/recipes.js"
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
uiIngredientsMenu.appendChild(uiDropdownMenu(getAllIngredients(recipes)))

// build default appliance menu
const getAllappliances = recipes => {
  const allappliancesDup = recipes.map(recipe => {
    return recipe.appliance.toLowerCase()
  })

  return [...new Set(allappliancesDup.sort())]
}

const uiAppliancesMenu = document.querySelector(".dropdown-appliance")
uiAppliancesMenu.appendChild(uiDropdownMenu(getAllappliances(recipes)))

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
uiUstensilsMenu.appendChild(uiDropdownMenu(getAllUstensils(recipes)))

// build default recipe
const uiRecipesList = document.getElementById("recipes-list")
recipes.forEach(recipe => {
  uiRecipesList.appendChild(uiRecipe(recipe))
})
