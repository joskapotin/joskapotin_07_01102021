/**
 *  Create the filter bar
 * @param {{main: string[], ingredients: string[], appliances: string[], ustensils: string[]}} filters
 * @returns {HTMLElement} filter bar
 */
const uiFiltersList = filters => {
  const uiFiltersList = document.createElement("ul")
  uiFiltersList.classList.add("container", "filters-list")

  for (const [filterCat, filterTerms] of Object.entries(filters)) {
    if (filterCat !== "main") {
      filterTerms.forEach(filterTerm => {
        const uiListItem = document.createElement("li")
        uiListItem.classList.add("filter-list__item", `filter-list__item-${filterCat}`)
        uiListItem.textContent = filterTerm
        uiListItem.dataset.type = filterCat
        uiFiltersList.appendChild(uiListItem)
      })
    }
  }

  return uiFiltersList
}

export default uiFiltersList
