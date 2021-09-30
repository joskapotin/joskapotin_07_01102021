const uiDropdownMenu = elements => {
  const uiDropdownList = document.createElement("ul")
  uiDropdownList.classList.add("dropdown-menu")

  elements.forEach(element => {
    const uiDropdownItem = document.createElement("li")
    uiDropdownItem.classList.add("dropdown-menu__item")
    uiDropdownItem.textContent = element
    uiDropdownList.appendChild(uiDropdownItem)
  })

  return uiDropdownList
}

export default uiDropdownMenu
