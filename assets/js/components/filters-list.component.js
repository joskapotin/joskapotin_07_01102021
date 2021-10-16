/**
 *
 * @param {Object} filters
 * @returns {HTMLElement}
 */
const uiFiltersList = filters => {
  const uiFiltersList = document.createElement("ul")
  uiFiltersList.classList.add("container", "filters-list")

  for (const [key, values] of Object.entries(filters)) {
    values.forEach(value => {
      const uiListItem = document.createElement("li")
      uiListItem.classList.add("filter-list__item", `filter-list__item-${key}`)
      uiListItem.textContent = value
      uiListItem.dataset.type = key
      uiFiltersList.appendChild(uiListItem)
    })
  }

  return uiFiltersList
}

export default uiFiltersList
