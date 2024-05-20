const contentBoxesType = document.querySelectorAll('.content-box-type')
contentBoxesType.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    contentBoxesType.forEach((box) => {
      box.classList.remove('selected')
    })

    contentBox.classList.add('selected')
  })
})
const contentBoxesLength = document.querySelectorAll('.content-box-length')

contentBoxesLength.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    contentBoxesLength.forEach((box) => {
      box.classList.remove('selected')
    })

    contentBox.classList.add('selected')
  })
})
const contentBoxesAssesments = document.querySelectorAll('.content-box-assesments')

contentBoxesAssesments.forEach((contentBox) => {
  contentBox.addEventListener('click', () => {
    contentBoxesAssesments.forEach((box) => {
      box.classList.remove('selected')
    })

    contentBox.classList.add('selected')
  })
})
function hide() {
  document.getElementById('info-r').style.display = 'none'
}
function unhide() {
  document.getElementById('info-r').style.display = ''
}

window.onload = function () {
  setTimeout(function () {
    const err = document.getElementById('signup-error')
    err.remove()
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      input.value = ''
    })
  }, 3000)
}
