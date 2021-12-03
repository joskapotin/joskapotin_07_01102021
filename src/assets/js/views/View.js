import config from "../config/config.js"
import createDropdownMenu from "./components/dropdown-menu.component.js"
import createfilterList from "./components/filter-list.component.js"
import CreateRecipe from "./components/recipe.component.js"

export default ({ matchRecipes, ingredients, appliances, ustensils, filter }) => {
  /**
   * Render filter list
   */
  document.querySelector(".filter-list")?.remove()
  config.uiNavSecondary.parentElement.insertBefore(createfilterList(filter), config.uiNavSecondary)

  /**
   * Render ingredients list
   */
  config.uiIngredientsMenu.querySelector(".dropdown-menu")?.remove()
  config.uiIngredientsMenu.appendChild(createDropdownMenu({ filterTerms: ingredients, filterCat: "ingredients" }))

  /**
   * Render appliances list
   */
  config.uiAppliancesMenu.querySelector(".dropdown-menu")?.remove()
  config.uiAppliancesMenu.appendChild(createDropdownMenu({ filterTerms: appliances, filterCat: "appliances" }))

  /**
   * Render ustensils list
   */
  config.uiUstensilsMenu.querySelector(".dropdown-menu")?.remove()
  config.uiUstensilsMenu.appendChild(createDropdownMenu({ filterTerms: ustensils, filterCat: "ustensils" }))

  /**
   * Render recipes list
   */
  config.uiRecipesList.innerHTML = ""
  matchRecipes.forEach(recipe => {
    config.uiRecipesList.appendChild(CreateRecipe(recipe))
  })
}
