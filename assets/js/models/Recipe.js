import { sanitize } from "../utils/utils.js"
export default class {
  constructor({ id, name, servings, ingredients, time, description, appliance, ustensils }) {
    this.id = id
    this.name = name
    this.servings = servings
    this.ingredients = ingredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensils = ustensils
  }

  get ingredientsList() {
    return this.ingredients.reduce((ingredients, element) => {
      ingredients[sanitize(element.ingredient)] = true
      return ingredients
    }, {})
  }

  get appliancesList() {
    return Object.fromEntries([[sanitize(this.appliance), "true"]])
  }

  get ustensilsList() {
    return this.ustensils.reduce((ustensils, ustensil) => {
      ustensils[sanitize(ustensil)] = true
      return ustensils
    }, {})
  }
}
