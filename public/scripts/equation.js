const convertRadiansToDegrees = radians => radians * 180 / Math.PI
const convertDegreesToRadians = degrees => degrees * (Math.PI / 180)

class ProjectileMotion{
    static GRAVITY = 9.81

    constructor(angle, initialSpeed){
        this.angle = angle
        this.initialSpeed = initialSpeed

        this.yInitialSpeed = initialSpeed * Math.sin(convertDegreesToRadians(angle))
        this.xInitialSpeed = initialSpeed * Math.cos(convertDegreesToRadians(angle))      
    }

    getFlightTime(){
        return 2 * this.yInitialSpeed / ProjectileMotion.GRAVITY
    }

    getMaxDistance(){
        return ((this.initialSpeed ** 2) * Math.sin(2 * convertDegreesToRadians(this.angle))) / ProjectileMotion.GRAVITY
    }

    getMaxHeight(){
        return Math.pow(this.yInitialSpeed, 2) / (2 * ProjectileMotion.GRAVITY)
    }

    getPositionAtTime(time){
        time = time / 10

        return {
            x: this.xInitialSpeed * time,
            y: this.yInitialSpeed * time - .5 * (ProjectileMotion.GRAVITY * Math.pow(time, 2))
        }
    }

}

export default ProjectileMotion