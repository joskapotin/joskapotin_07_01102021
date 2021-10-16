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
const populateSecondaryMenu = ({ uiMenu, filterTerms, filterCat }) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu({ filterTerms, filterCat }))
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
  populateSecondaryMenu({ uiMenu: uiIngredientsMenu, filterTerms: getIngredients(matchRecipes), filterCat: "ingredients" })
  populateSecondaryMenu({ uiMenu: uiAppliancesMenu, filterTerms: getAppliances(matchRecipes), filterCat: "appliances" })
  populateSecondaryMenu({ uiMenu: uiUstensilsMenu, filterTerms: getUstensils(matchRecipes), filterCat: "ustensils" })
  populateRecipesList(matchRecipes)
}

// TESTS
const isName = ({ filterTerm, recipe }) => recipe.name.toLowerCase().includes(filterTerm.toLowerCase())

const isIngredient = ({ filterTerm, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))

const isAppliance = ({ filterTerm, recipe }) => recipe.appliance.toLowerCase().includes(filterTerm.toLowerCase())

const isUstensil = ({ filterTerm, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))

const isDescription = ({ filterTerm, recipe }) => recipe.description.toLowerCase().includes(filterTerm.toLowerCase())

// SEARCH

/**
 * Search recipes
 * @param {string} filterCat
 * @returns {string[]} ids of recipe to remove from the list
 */
const searchRecipes = filterCat => {
  const filterTerms = Object.values(filters[filterCat])

  const discardedRecipesIds = filterTerms.reduce((ids, filterTerm) => {
    if (localStorage.getItem(`${filterCat}-${filterTerm}`)) {
      ids = [...ids, ...JSON.parse(localStorage.getItem(`${filterCat}-${filterTerm}`))]
    } else {
      const idsFounded = recipes.reduce((idsByfilterCat, recipe) => {
        if (filterCat === "main" && !isName({ filterTerm, recipe }) && !isIngredient({ filterTerm, recipe }) && !isDescription({ filterTerm, recipe })) idsByfilterCat.push(recipe.id)
        if (filterCat === "ingredients" && !isIngredient({ filterTerm, recipe })) idsByfilterCat.push(recipe.id)
        if (filterCat === "appliances" && !isAppliance({ filterTerm, recipe })) idsByfilterCat.push(recipe.id)
        if (filterCat === "ustensils" && !isUstensil({ filterTerm, recipe })) idsByfilterCat.push(recipe.id)
        return idsByfilterCat
      }, [])

      ids = [...new Set([...ids, ...idsFounded])]
      localStorage.setItem(`${filterCat}-${filterTerm}`, JSON.stringify(ids))
    }
    return ids
  }, [])

  // console.log("discardedRecipesIds", discardedRecipesIds)
  // console.log("New set discardedRecipesIds", [...new Set(discardedRecipesIds)])

  return [...new Set(discardedRecipesIds)]
}

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  // If theres is no search or filter render default view
  if (filters.main.length === 0 && filters.ingredients.length === 0 && filters.appliances.length === 0 && filters.ustensils.length === 0) return render()

  // create an array of match recipes
  const discardedRecipesIds = Object.keys(filters)
    .filter(filterCat => filters[filterCat].length > 0)
    .flatMap(filterCat => searchRecipes(filterCat))

  /**
   * Create list of match recipes
   */
  const matchRecipes = recipes.reduce((recipes, recipe) => {
    if (!discardedRecipesIds.includes(recipe.id)) recipes.push(recipe)
    return recipes
  }, [])

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

  populateFiltersList()
  updateRecipesList()
})

// INIT
dropdownModule()
render()
