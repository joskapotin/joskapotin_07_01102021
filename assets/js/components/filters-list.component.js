/**
 *  Create the filter bar
 * @param {{main: string[], ingredients: string[], appliances: string[], ustensils: string[]}} filters
 * @returns {HTMLElement} filter bar
 */
const createFiltersList = filters => {
  const uiFiltersList = document.createElement("ul")
  uiFiltersList.classList.add("container", "filters-list")

  Object.keys(filters).forEach(filterCat => {
    if (filterCat !== "main") {
      filters[filterCat].forEach(filterTerm => {
        const uiListItem = document.createElement("li")
        uiListItem.classList.add("filter-list__item", `filter-list__item-${filterCat}`)
        uiListItem.textContent = filterTerm
        uiListItem.dataset.filterCat = filterCat
        uiFiltersList.appendChild(uiListItem)
      })
    }
  })

  return uiFiltersList
}

export default createFiltersList
