import AllRecipes from "./data/recipes.js"
import Controller from "./controllers/Controller.js"
import dropdownModule from "./modules/dropdown.module.js"

const controller = new Controller(AllRecipes)
controller.render()
dropdownModule()
