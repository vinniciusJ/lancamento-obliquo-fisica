const v0 = document.querySelector('#v0')
const angle = document.querySelector('#angle')
const inputV0 = document.querySelector('#input-v0')
const inputAngle = document.querySelector('#input-angle')
const cannonBarrel = document.querySelector('#cannon-barrel')

inputV0.oninput = (() => {
    let value = inputV0.value
    v0.textContent = value
})

inputAngle.oninput = (() => {
    let value = inputAngle.value
    angle.textContent = value

    cannonBarrel.setAttribute('transform', `rotate(-${value},17.995497,44.510739)`)
})