import getMatchRecipes from "../utils/search.js"
import View from "../views/View.js"

const render = filter => View(getMatchRecipes(filter))

export default render
