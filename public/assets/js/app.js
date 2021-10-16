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
const populateSecondaryMenu = ({ uiMenu, tags, tagType }) => {
  uiMenu.querySelector(".dropdown-menu")?.remove()
  uiMenu.appendChild(uiDropdownMenu({ tags: tags, tagType: tagType }))
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
  populateSecondaryMenu({ uiMenu: uiIngredientsMenu, tags: getIngredients(matchRecipes), tagType: "ingredients" })
  populateSecondaryMenu({ uiMenu: uiAppliancesMenu, tags: getAppliances(matchRecipes), tagType: "appliances" })
  populateSecondaryMenu({ uiMenu: uiUstensilsMenu, tags: getUstensils(matchRecipes), tagType: "ustensils" })
  populateRecipesList(matchRecipes)
}

// TESTS
const isName = ({ tag, recipe }) => recipe.name.toLowerCase().includes(tag.toLowerCase())

const isIngredient = ({ tag, recipe }) => recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(tag.toLowerCase()))

const isAppliance = ({ tag, recipe }) => recipe.appliance.toLowerCase().includes(tag.toLowerCase())

const isUstensil = ({ tag, recipe }) => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))

const isDescription = ({ tag, recipe }) => recipe.description.toLowerCase().includes(tag.toLowerCase())

// SEARCH

/**
 * Search recipes
 * @param {string} tagType
 * @returns {string[]} ids of recipe to remove from the list
 */
const searchRecipes = tagType => {
  const tags = Object.values(filters[tagType])

  const discardedRecipesIds = tags.reduce((ids, tag) => {
    if (localStorage.getItem(`${tagType}-${tag}`)) {
      ids = [...JSON.parse(localStorage.getItem(`${tagType}-${tag}`))]
    } else {
      ids = recipes.reduce((ids, recipe) => {
        if (tagType === "main" && !isName({ tag: tag, recipe: recipe }) && !isIngredient({ tag: tag, recipe: recipe }) && !isDescription({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        if (tagType === "ingredients" && !isIngredient({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        if (tagType === "appliances" && !isAppliance({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        if (tagType === "ustensils" && !isUstensil({ tag: tag, recipe: recipe })) ids.push(recipe.id)
        return ids
      }, [])
      localStorage.setItem(`${tagType}-${tag}`, JSON.stringify(ids))
    }
    return ids
  }, [])

  return [...new Set(discardedRecipesIds)]
}

// UPDATE RECIPES LIST
const updateRecipesList = () => {
  // If theres is no search or filter render default view
  if (filters.main.length === 0 && filters.ingredients.length === 0 && filters.appliances.length === 0 && filters.ustensils.length === 0) return render()

  // create an array of match recipes
  const discardedRecipesIds = Object.keys(filters).flatMap(tagType => searchRecipes(tagType))

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
