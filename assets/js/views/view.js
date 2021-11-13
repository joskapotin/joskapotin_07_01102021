import config from "../config/config.js"
import createDropdownMenu from "./components/dropdown-menu.component.js"
import createFiltersList from "./components/filters-list.component.js"
import CreateRecipe from "./components/recipe.component.js"
export default class {
  constructor({ matchRecipes, ingredients, appliances, ustensils, filters }) {
    this.buildFiltersList(filters)
    this.buildIngredientsMenu(ingredients)
    this.buildAppliancesMenu(appliances)
    this.buildUstensilsMenu(ustensils)
    this.buildRecipesList(matchRecipes)
  }

  buildFiltersList(filters) {
    document.querySelector(".filters-list")?.remove()
    config.uiNavSecondary.parentElement.insertBefore(createFiltersList(filters), config.uiNavSecondary)
  }

  buildIngredientsMenu(ingredients) {
    config.uiIngredientsMenu.querySelector(".dropdown-menu")?.remove()
    config.uiIngredientsMenu.appendChild(createDropdownMenu({ filterTerms: ingredients, filterCat: "ingredients" }))
  }

  buildAppliancesMenu(appliances) {
    config.uiAppliancesMenu.querySelector(".dropdown-menu")?.remove()
    config.uiAppliancesMenu.appendChild(createDropdownMenu({ filterTerms: appliances, filterCat: "appliances" }))
  }

  buildUstensilsMenu(ustensils) {
    config.uiUstensilsMenu.querySelector(".dropdown-menu")?.remove()
    config.uiUstensilsMenu.appendChild(createDropdownMenu({ filterTerms: ustensils, filterCat: "ustensils" }))
  }

  buildRecipesList(matchRecipes) {
    config.uiRecipesList.innerHTML = ""
    matchRecipes.forEach(recipe => {
      config.uiRecipesList.appendChild(CreateRecipe(recipe))
    })
  }
}
