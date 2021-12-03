import config from "./config/config.js"
import sanitize from "./utils/utils.js"
import render from "./controllers/Controller.js"
import dropdownModule from "./modules/dropdown.module.js"

// VARIABLES

/**
 * Search filter
 * @type {{main:string[], ingredients:string[], appliances:string[], ustensils:string[]}}
 */
const filter = {
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
  filter.main.length = 0
  if (e.target.value.length >= 3) {
    e.target.value.split(" ").forEach(term => filter.main.push(term))
  }

  render(filter)
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

  // update filter object
  if (isFilterItem) {
    const filterTermIndex = filter[filterCat].indexOf(filterTerm)
    filter[filterCat].splice(filterTermIndex, 1)
  } else if (!filter[filterCat].some(elem => elem === filterTerm)) {
    filter[filterCat].push(filterTerm)
  }

  render(filter)
})

/**
 * filter secondary menu item
 * @param {HTMLElement} uiMenu - menu to filter
 */
const filterecondaryMenuItems = uiMenu => {
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
    filterecondaryMenuItems(e.target)
  })
})

// INIT
render(filter)
dropdownModule()
