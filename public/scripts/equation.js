const convertRadiansToDegrees = radians => radians * 180 / Math.PI
const convertDegreesToRadians = degrees => degrees * Math.PI / 180

class ProjectileMotion{
    static GRAVITY = 9.81

    constructor(angle, initialSpeed, initialPositions){
        this.angle = -angle
        this.initialSpeed = initialSpeed

        this.xInitial = initialPositions.x
        this.yInitial = initialPositions.y

        this.yInitialSpeed = initialSpeed * Math.sin(convertDegreesToRadians(-angle))
        this.xInitialSpeed = initialSpeed * Math.cos(convertDegreesToRadians(-angle))
    }

    getFlightTime(){
        return 2 * this.yInitialSpeed / ProjectileMotion.GRAVITY
    }

    getMaxDistance(){
        return ((this.initialSpeed ** 2) * Math.sin(2 * convertDegreesToRadians(this.angle))) / ProjectileMotion.GRAVITY
    }

    getMaxHeight(){
        return (this.yInitialSpeed ** 2) / 2 * ProjectileMotion.GRAVITY
    }

    getXPositionAt(time){
        return this.xInitial + this.xInitialSpeed * time
    }

    getYPositionAt(time){
        return this.yInitial + this.yInitialSpeed * time - (ProjectileMotion.GRAVITY * (time ** 2) / 2)
    }
}

export default ProjectileMotion