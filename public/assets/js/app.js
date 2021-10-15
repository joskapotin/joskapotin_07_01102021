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
  populateSecondaryMenu(uiIngredientsMenu, getIngredients(matchRecipes), "ingredients")
  populateSecondaryMenu(uiAppliancesMenu, getAppliances(matchRecipes), "appliances")
  populateSecondaryMenu(uiUstensilsMenu, getUstensils(matchRecipes), "ustensils")
  populateRecipesList(matchRecipes)
}

// TESTS
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
const searchRecipes = (matchRecipes, tagType) => {
  const tags = Object.values(filters[tagType])
  let ids = []

  tags.forEach(tag => {
    if (localStorage.getItem(`${tagType}-${tag}`)) {
      ids = [...JSON.parse(localStorage.getItem(`${tagType}-${tag}`))]
    } else {
      matchRecipes.forEach(recipe => {
        if (tagType === "main" && !isName(tag, recipe) && !isIngredient(tag, recipe) && !isDescription(tag, recipe)) ids.push(recipe.id)
        else if (tagType === "ingredients" && !isIngredient(tag, recipe)) ids.push(recipe.id)
        else if (tagType === "appliances" && !isAppliance(tag, recipe)) ids.push(recipe.id)
        else if (tagType === "ustensils" && !isUstensil(tag, recipe)) ids.push(recipe.id)
      })

      localStorage.setItem(`${tagType}-${tag}`, JSON.stringify(ids))
    }
  })

  return ids
}

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  // first reset recipes list
  const matchRecipes = [...recipes]

  // create à list of ids to remove from the list of recipes
  const recipesIdsDup = Object.keys(filters)
    .filter(tagType => tagType.length > 0)
    .flatMap(tagType => searchRecipes(recipes, tagType))

  const recipesIds = [...new Set(recipesIdsDup)]

  // remove recipes by id
  recipesIds.forEach(id => {
    const index = matchRecipes.findIndex(recipe => recipe.id === id)
    matchRecipes.splice(index, 1)
  })

  // render view
  render(matchRecipes)
}

// handle primary search
uiSearchPrimary.addEventListener("input", e => {
  filters.main.length = 0
  if (e.target.value.length >= 3) {
    filters.main[0] = e.target.value
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

  populateFiltersList()
  updateRecipesList()
})

// INIT
dropdownModule()
render()
