export default class {
  constructor() {
    this.build
  }

  build() {
    const div = document.createElement("div")
    div.innerText = "BUILD"

    document.body.innerHTML = div
  }
}
