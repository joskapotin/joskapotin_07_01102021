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

  isName(filterTerm) {
    return this.name.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isIngredient(filterTerm) {
    return this.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))
  }

  isAppliance(filterTerm) {
    return this.appliance.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isUstensil(filterTerm) {
    return this.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))
  }

  isDescription(filterTerm) {
    return this.description.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isMatchMain(filterTerms) {
    return filterTerms.some(filterTerm => this.isName(filterTerm) || this.isIngredient(filterTerm) || this.isDescription(filterTerm))
  }

  isMatchIngredients(filterTerms) {
    return filterTerms.some(filterTerm => this.isIngredient(filterTerm))
  }

  isMatchAppliances(filterTerms) {
    return filterTerms.some(filterTerm => this.isAppliance(filterTerm))
  }

  isMatchUstensils(filterTerms) {
    return filterTerms.some(filterTerm => this.isUstensil(filterTerm))
  }

  isMatchRecipe(filter) {
    const activeFilterCats = Object.keys(filter).filter(filterCat => filter[filterCat].length > 0)
    if (activeFilterCats.length === 0) return true

    const isMatch = ({ filterCat, filterTerms }) => {
      switch (filterCat) {
        case "main":
          return this.isMatchMain(filterTerms)

        case "ingredients":
          return this.isMatchIngredients(filterTerms)

        case "appliances":
          return this.isMatchAppliances(filterTerms)

        case "ustensils":
          return this.isMatchUstensils(filterTerms)

        default:
          return true
      }
    }

    return !activeFilterCats.some(filterCat => !isMatch({ filterCat, filterTerms: filter[filterCat] }))
  }
}
