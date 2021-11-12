export default class {
  constructor({ id, name, serving, ingredients, time, description, appliance, ustensils }) {
    this.id = id
    this.name = name
    this.serving = serving
    this.ingredients = ingredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensils = ustensils
  }

  get ingredients() {}

  get ustensils() {}
}
