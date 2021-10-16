/**
 *  Create recipe card
 * @param {string|Object[]|string|string} recipe info
 * @returns {HTMLElement}
 */
const uiRecipe = ({ name, ingredients, time, description }) => {
  const uiRecipe = document.createElement("article")
  uiRecipe.classList.add("card")

  const uiHeader = document.createElement("header")
  uiHeader.classList.add("card__header")

  const uiHeading = document.createElement("h2")
  uiHeading.textContent = name
  uiHeading.classList.add("card__heading")

  const uiTime = document.createElement("span")
  uiTime.textContent = `${time} min`

  const uiContent = document.createElement("div")
  uiContent.classList.add("card__content")

  const uiIngredientsList = document.createElement("ul")
  uiIngredientsList.classList.add("card__list")

  ingredients.forEach(ingredient => {
    const uiIngredientItem = document.createElement("li")
    uiIngredientItem.classList.add("card__list__item")

    const uiIngredient = document.createElement("span")
    uiIngredient.textContent = ingredient.ingredient

    uiIngredientItem.appendChild(uiIngredient)

    if (ingredient.quantity) {
      const uiQuantity = document.createTextNode(`: ${ingredient.quantity}`)
      uiIngredientItem.appendChild(uiQuantity)
    }

    if (ingredient.unit) {
      const uiUnit = document.createTextNode(` ${ingredient.unit}`)
      uiIngredientItem.appendChild(uiUnit)
    }

    uiIngredientsList.appendChild(uiIngredientItem)
  })

  const uiDescription = document.createElement("div")
  uiDescription.textContent = description
  uiDescription.classList.add("card__description")

  uiHeader.append(uiHeading, uiTime)
  uiContent.append(uiIngredientsList, uiDescription)
  uiRecipe.append(uiHeader, uiContent)

  return uiRecipe
}

export default uiRecipe
