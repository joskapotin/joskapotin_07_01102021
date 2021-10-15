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
const filters = { main: "", ingredient: [], appliance: [], ustensil: [] }

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
const render = (matchRecipes = recipes) => {
  matchRecipes = matchRecipes.sort((a, b) => a.name.localeCompare(b.name))
  populateSecondaryMenu(uiIngredientsMenu, getIngredients(matchRecipes), "ingredient")
  populateSecondaryMenu(uiAppliancesMenu, getAppliances(matchRecipes), "appliance")
  populateSecondaryMenu(uiUstensilsMenu, getUstensils(matchRecipes), "ustensil")
  populateRecipesList(matchRecipes)
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

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  const main = filters.main
  const ingredients = Object.values(filters.ingredient)
  const appliances = Object.values(filters.appliance)
  const ustensils = Object.values(filters.ustensil)

  const matchRecipes = [...recipes]

  // create à list of ids to remove from the list of recipes
  const recipesIdsDup = []

  // test main search in name, ingredient, description
  if (main.length >= 3) {
    console.log(main)

    matchRecipes.forEach(recipe => {
      // search in name
      if (!isName(main, recipe) || !isIngredient(main, recipe) || !isDescription(main, recipe)) recipesIdsDup.push(recipe.id)
    })

    ingredients.forEach(tag => {
      matchRecipes.forEach(recipe => {
        if (!isIngredient(tag, recipe)) {
          recipesIdsDup.push(recipe.id)
        }
      })
    })
  }

  appliances.forEach(tag => {
    matchRecipes.forEach(recipe => {
      if (!isAppliance(tag, recipe)) {
        recipesIdsDup.push(recipe.id)
      }
    })
  })

  ustensils.forEach(tag => {
    matchRecipes.forEach(recipe => {
      if (!isUstensil(tag, recipe)) {
        recipesIdsDup.push(recipe.id)
      }
    })
  })

  const recipesIds = [...new Set(recipesIdsDup)]

  recipesIds.forEach(id => {
    const index = matchRecipes.findIndex(recipe => recipe.id === id)
    matchRecipes.splice(index, 1)
  })

  render(matchRecipes)
}

// handle primary search
uiSearchPrimary.addEventListener("input", e => {
  filters.main = ""
  if (e.target.value.length >= 3) {
    filters.main = e.target.value
  }
  updateRecipesList()
})

// handle tags search
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
