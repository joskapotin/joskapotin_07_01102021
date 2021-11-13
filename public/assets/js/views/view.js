import config from "../config/config.js"
import createDropdownMenu from "../components/dropdown-menu.component.js"
import createFiltersList from "../components/filters-list.component.js"
import CreateRecipe from "../components/recipe.component.js"
export default class {
  constructor({ matchRecipes, ingredients, appliances, ustensils }) {
    this.matchRecipes = matchRecipes
    this.ingredients = ingredients
    this.appliances = appliances
    this.ustensils = ustensils
    this.buildFiltersList()
    this.buildIngredientsMenu()
    this.buildAppliancesMenu()
    this.buildUstensilsMenu()
    this.buildRecipesList()
  }

  buildFiltersList() {
    console.log("filters List")
  }

  buildIngredientsMenu() {
    const uiIngredientsList = createDropdownMenu({ filterTerms: this.ingredients, filterCat: "ingredients" })
    config.uiIngredientsMenu.querySelector(".dropdown-menu")?.remove()
    config.uiIngredientsMenu.appendChild(uiIngredientsList)
  }

  buildAppliancesMenu() {
    const uiAppliancesList = createDropdownMenu({ filterTerms: this.appliances, filterCat: "appliances" })
    config.uiAppliancesMenu.querySelector(".dropdown-menu")?.remove()
    config.uiAppliancesMenu.appendChild(uiAppliancesList)
  }

  buildUstensilsMenu() {
    const uiUstensilsList = createDropdownMenu({ filterTerms: this.ustensils, filterCat: "ustensils" })
    config.uiUstensilsMenu.querySelector(".dropdown-menu")?.remove()
    config.uiUstensilsMenu.appendChild(uiUstensilsList)
  }

  buildRecipesList() {
    config.uiRecipesList.innerHTML = ""
    this.matchRecipes.forEach(recipe => {
      config.uiRecipesList.appendChild(CreateRecipe(recipe))
    })
  }
}
