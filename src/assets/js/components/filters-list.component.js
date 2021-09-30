const uiFiltersList = filters => {
  const uiFiltersList = document.createElement("ul")
  uiFiltersList.classList.add("container", "filters-list")

  filters.forEach(function (filter, index) {
    const uiListItem = document.createElement("li")
    uiListItem.classList.add("filter-list__item", `filter-list__item-${filter.type}`)
    uiListItem.dataset.index = index
    uiListItem.textContent = filter.name
    uiFiltersList.appendChild(uiListItem)
  })

  return uiFiltersList
}

export default uiFiltersList
