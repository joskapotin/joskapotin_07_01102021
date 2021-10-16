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
const populateSecondaryMenu = ({ uiMenu, elements, elementsType }) => {
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
  populateSecondaryMenu({ uiMenu: uiIngredientsMenu, elements: getIngredients(matchRecipes), elementsType: "ingredients" })
  populateSecondaryMenu({ uiMenu: uiAppliancesMenu, elements: getAppliances(matchRecipes), elementsType: "appliances" })
  populateSecondaryMenu({ uiMenu: uiUstensilsMenu, elements: getUstensils(matchRecipes), elementsType: "ustensils" })
  populateRecipesList(matchRecipes)
}

// TESTS
const isName = ({ tag, recipe }) => recipe.name.toLowerCase().includes(tag.toLowerCase())

const isIngredient = ({ tag, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(tag.toLowerCase()))

const isAppliance = ({ tag, recipe }) => recipe.appliance.toLowerCase().includes(tag.toLowerCase())

const isUstensil = ({ tag, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))

const isDescription = ({ tag, recipe }) => recipe.description.toLowerCase().includes(tag.toLowerCase())

// SEARCH

const searchRecipes = tagType => {
  const tags = Object.values(filters[tagType])
  if (tags.length === 0) return
  let ids = []

  tags.forEach(tag => {
    if (localStorage.getItem(`${tagType}-${tag}`)) {
      ids = [...JSON.parse(localStorage.getItem(`${tagType}-${tag}`))]
    } else {
      recipes.forEach(recipe => {
        if (tagType === "main" && !isName({ tag: tag, recipe: recipe }) && !isIngredient({ tag: tag, recipe: recipe }) && !isDescription({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        else if (tagType === "ingredients" && !isIngredient({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        else if (tagType === "appliances" && !isAppliance({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        else if (tagType === "ustensils" && !isUstensil({ tag: tag, recipe: recipe })) ids.push(recipe.id)
      })

      localStorage.setItem(`${tagType}-${tag}`, JSON.stringify(ids))
    }
  })

  return [...new Set(ids)]
}

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  // first reset recipes list
  const matchRecipes = [...recipes]

  // create à list of ids to remove from the list of recipes

  const recipesIds = Object.keys(filters).flatMap(tagType => searchRecipes(tagType))

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

  const tag = e.target.textContent
  const type = e.target.dataset.type

  // update filters object
  if (isFilterItem) {
    const tagIndex = filters[type].indexOf(tag)
    filters[type].splice(tagIndex, 1)
  } else if (!filters[type].some(elem => elem === tag)) {
    filters[type].push(tag)
  }

  populateFiltersList()
  updateRecipesList()
})

// INIT
dropdownModule()
render()
