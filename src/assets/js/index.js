import config from "./config/config.js"
import { sanitize } from "./utils/utils.js"
import Controller from "./controllers/Controller.js"
import dropdownModule from "./modules/dropdown.module.js"

// VARIABLES

const controller = new Controller()
console.log(controller)

/**
 * Search filters
 * @type {{main:string[], ingredients:string[], appliances:string[], ustensils:string[]}}
 */
const filters = {
  main: [],
  ingredients: [],
  appliances: [],
  ustensils: [],
}

// SECTION UI

/**
 * Handle primary search
 * When input reach 3 characters, add filter term in filter category "main" and trigger render
 *
 */
config.uiSearchPrimary.addEventListener("input", e => {
  filters.main.length = 0
  if (e.target.value.length >= 3) {
    filters.main[0] = e.target.value
  }

  controller.render(filters)
})

/**
 * Handle advanced search
 * Add or remove filter and trigger render
 */
document.addEventListener("click", e => {
  const isMenuItem = e.target.matches(".dropdown-menu__item")
  const isFilterItem = e.target.matches(".filter-list__item")

  if (!isMenuItem && !isFilterItem) return

  const filterTerm = e.target.textContent
  const { filterCat } = e.target.dataset

  // update filters object
  if (isFilterItem) {
    const filterTermIndex = filters[filterCat].indexOf(filterTerm)
    filters[filterCat].splice(filterTermIndex, 1)
  } else if (!filters[filterCat].some(elem => elem === filterTerm)) {
    filters[filterCat].push(filterTerm)
  }

  controller.render(filters)
})

/**
 * filter secondary menu item
 * @param {HTMLElement} uiMenu - menu to filter
 */
const filterSecondaryMenuItems = uiMenu => {
  const term = sanitize(uiMenu.value)
  const regex = new RegExp(`^${term}`)
  const menuItems = uiMenu.parentElement.querySelectorAll(".dropdown-menu__item")

  menuItems.forEach(item => {
    const itemTerm = sanitize(item.textContent)

    if (regex.test(itemTerm)) {
      item.classList.remove("display-none")
    } else item.classList.add("display-none")
  })
}

config.uiSecondaryMenus.forEach(menu => {
  menu.addEventListener("input", e => {
    filterSecondaryMenuItems(e.target)
  })
})

// INIT
controller.render(filters)
dropdownModule()
