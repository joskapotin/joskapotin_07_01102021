/**
 *  Create the filter / tag bar
 * @param {{main: string[], ingredients: string[], appliances: string[], ustensils: string[]}} filters
 * @returns {HTMLElement} tag bar
 */
const uiFiltersList = filters => {
  const uiFiltersList = document.createElement("ul")
  uiFiltersList.classList.add("container", "filters-list")

  for (const [tagType, tags] of Object.entries(filters)) {
    if (tagType !== "main") {
      tags.forEach(tag => {
        const uiListItem = document.createElement("li")
        uiListItem.classList.add("filter-list__item", `filter-list__item-${tagType}`)
        uiListItem.textContent = tag
        uiListItem.dataset.type = tagType
        uiFiltersList.appendChild(uiListItem)
      })
    }
  }

  return uiFiltersList
}

export default uiFiltersList
