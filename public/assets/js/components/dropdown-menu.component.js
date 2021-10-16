/**
 * Create dropdown menus
 * @param {{tags: string[], tagType: string}}
 * @returns {HTMLElement} dropdown menu
 */
const uiDropdownMenu = ({ tags, tagType }) => {
  const uiDropdownList = document.createElement("ul")
  uiDropdownList.classList.add("dropdown-menu")

  tags.forEach(tag => {
    const uiDropdownItem = document.createElement("li")
    uiDropdownItem.classList.add("dropdown-menu__item")
    uiDropdownItem.textContent = tag
    uiDropdownItem.dataset.type = tagType
    uiDropdownList.appendChild(uiDropdownItem)
  })

  return uiDropdownList
}

export default uiDropdownMenu
