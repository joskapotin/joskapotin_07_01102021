import sanitize from "../utils/utils.js"

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
    const entries = this.ingredients.map(element => [sanitize(element.ingredient), true])
    return Object.fromEntries(entries)
  }

  get appliancesList() {
    const entries = [[sanitize(this.appliance), "true"]]
    return Object.fromEntries(entries)
  }

  get ustensilsList() {
    const entries = this.ustensils.map(ustensil => [sanitize(ustensil), true])
    return Object.fromEntries(entries)
  }
}
