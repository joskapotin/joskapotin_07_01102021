/**
 *  Create the filter bar
 * @param {{main: string[], ingredients: string[], appliances: string[], ustensils: string[]}} filter
 * @returns {HTMLElement} filter bar
 */
const createfilterList = filter => {
  const uifilterList = document.createElement("ul")
  uifilterList.classList.add("container", "filter-list")

  Object.keys(filter).forEach(filterCat => {
    if (filterCat !== "main") {
      filter[filterCat].forEach(filterTerm => {
        const uiListItem = document.createElement("li")
        uiListItem.classList.add("filter-list__item", `filter-list__item-${filterCat}`)
        uiListItem.textContent = filterTerm
        uiListItem.dataset.filterCat = filterCat
        uifilterList.appendChild(uiListItem)
      })
    }
  })

  return uifilterList
}

export default createfilterList
