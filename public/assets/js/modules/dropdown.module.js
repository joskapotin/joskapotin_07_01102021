/**
 * Change placeholder message of advanced menu when clicked
 * @param {HTMLElement} dropdown - the current selected menu
 */
const changePlaceholder = dropdown => {
  const input = dropdown.querySelector("input")
  const { placeholder } = input
  input.placeholder = input.dataset.message
  input.dataset.message = placeholder
}

export default () => {
  document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

    let currentDropdown

    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle("active")

      // handle placeholder text change
      changePlaceholder(currentDropdown)
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("active")

      // handle placeholder text change
      changePlaceholder(dropdown)
    })
  })
}
