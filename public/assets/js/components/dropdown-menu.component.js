/**
 * Create dropdown menus
 * @param {{filterTerms: string[], filterCat: string}}
 * @returns {HTMLElement} dropdown menu
 */
const uiDropdownMenu = ({ filterTerms, filterCat }) => {
  const uiDropdownList = document.createElement("ul")
  uiDropdownList.classList.add("dropdown-menu")

  filterTerms.forEach(filterTerm => {
    const uiDropdownItem = document.createElement("li")
    uiDropdownItem.classList.add("dropdown-menu__item")
    uiDropdownItem.textContent = filterTerm
    uiDropdownItem.dataset.filterCat = filterCat
    uiDropdownList.appendChild(uiDropdownItem)
  })

  return uiDropdownList
}

export default uiDropdownMenu
