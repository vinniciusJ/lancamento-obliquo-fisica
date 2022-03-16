import { calculateAngle } from '../scripts/ProjectileMotion.js'

const v0Label = document.querySelector('#v0')
const angleLabel = document.querySelector('#angle')
const inputV0 = document.querySelector('#input-v0')
const inputAngle = document.querySelector('#input-angle')
const cannonBarrel = document.querySelector('#cannon-barrel')

const canvas = document.querySelector('canvas')

const setLaunchAngle = event => {
    const rect = canvas.getBoundingClientRect()

    const [ x, y ] = [ event.clientX - rect.left, event.clientY - rect.top]
 
    const angle = Math.ceil(calculateAngle({ ex: x, ey: y }))

    inputAngle.value = angle
    angleLabel.textContent = angle
    cannonBarrel.setAttribute('transform', `rotate(-${angle},17.995497,44.510739)`)
} 

canvas.addEventListener('mousedown', () => {
    canvas.addEventListener('mousemove', setLaunchAngle)
})

canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', setLaunchAngle)
})

document.addEventListener("DOMContentLoaded", () => {
    v0Label.textContent = inputV0.value
    angleLabel.textContent = inputAngle.value
})

inputV0.addEventListener('input', ({ target }) => {
    v0Label.textContent = target.value
})

inputAngle.addEventListener('input', ({ target }) => {
    angleLabel.textContent = target.value
    cannonBarrel.setAttribute('transform', `rotate(-${target.value},17.995497,44.510739)`)
})
