const gravity = 9.81

//Decomposição da velocidade inicial em velocidade horizontal (vx) e velocidade vertical inicial(v0y)
function getVx(v0, angle) {
    return v0 * Math.cos(DegreesToRadians(angle))
}

function getV0y(v0, angle) {
    return v0 * Math.sin(DegreesToRadians(angle))
}

//Implementar equação para descobrir a altura máxima
function getMaxHeight(v0y) {
    return (v0y ** 2) / (2 * gravity)
}

//Implementar equação para descobrir o tempo de subida e de voo
function getRiseTime() {
    //equation

    return //result
}

//Implementar equação para descobrir a distância percorrida
function getDistance() {
    //equation

    return //result
}

//Conversão entre radianos e graus
function DegreesToRadians(degree) {
    return degree * (Math.PI / 180)
}

function RadiansToDegrees(radian) {
    return radian * (180 / Math.PI)
}

console.log(getMaxHeight(getV0y(18, 50)).toFixed(2))