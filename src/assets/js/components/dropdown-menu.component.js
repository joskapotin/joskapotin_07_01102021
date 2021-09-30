const uiDropdownMenu = (elements, elementsType) => {
  const uiDropdownList = document.createElement("ul")
  uiDropdownList.classList.add("dropdown-menu")

  elements.forEach(element => {
    const uiDropdownItem = document.createElement("li")
    uiDropdownItem.classList.add("dropdown-menu__item")
    uiDropdownItem.textContent = element
    uiDropdownItem.dataset.type = elementsType
    uiDropdownList.appendChild(uiDropdownItem)
  })

  return uiDropdownList
}

export default uiDropdownMenu
