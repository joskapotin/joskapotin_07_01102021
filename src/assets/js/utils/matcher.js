export default class {
  constructor(recipe) {
    this.recipe = recipe
  }

  getRecipe() {
    return this.recipe
  }

  isName(filterTerm) {
    return this.recipe.name.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isIngredient(filterTerm) {
    return this.recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(filterTerm.toLowerCase()))
  }

  isAppliance(filterTerm) {
    return this.recipe.appliance.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isUstensil(filterTerm) {
    return this.recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterTerm.toLowerCase()))
  }

  isDescription(filterTerm) {
    return this.recipe.description.toLowerCase().includes(filterTerm.toLowerCase())
  }

  isMatchMain(filterTerms) {
    return filterTerms.every(filterTerm => this.isName(filterTerm) || this.isIngredient(filterTerm) || this.isDescription(filterTerm))
  }

  isMatchIngredients(filterTerms) {
    return filterTerms.every(filterTerm => this.isIngredient(filterTerm))
  }

  isMatchAppliances(filterTerms) {
    return filterTerms.every(filterTerm => this.isAppliance(filterTerm))
  }

  isMatchUstensils(filterTerms) {
    return filterTerms.every(filterTerm => this.isUstensil(filterTerm))
  }

  isMatchRecipe(filter) {
    const activeFilterCats = Object.keys(filter).filter(filterCat => filter[filterCat].length > 0)
    if (activeFilterCats.length === 0) return true

    const isMatch = ({ filterCat, filterTerms }) => {
      if (filterCat === "main") return this.isMatchMain(filterTerms)
      if (filterCat === "ingredients") return this.isMatchIngredients(filterTerms)
      if (filterCat === "appliances") return this.isMatchAppliances(filterTerms)
      if (filterCat === "ustensils") return this.isMatchUstensils(filterTerms)
      return true
    }

    return !activeFilterCats.some(filterCat => !isMatch({ filterCat, filterTerms: filter[filterCat] }))
  }
}
