export const convertDegreesToRadians = degrees => degrees * (Math.PI / 180)
export const convertRadiansToDegrees = radians => radians * 180 / Math.PI

export const calculateAngle = ({ ex, ey }) => {
    const [ dx, dy ] =  [ Math.abs(ex - 0), Math.abs(ey - 548) ]
    const angle = convertRadiansToDegrees(Math.atan2(dy, dx))

    return angle
}
export default class ProjectileMotion{
    constructor(angle, initialSpeed, gravity){
        this.angle = angle
        this.initialSpeed = initialSpeed
        this.gravity = gravity

        this.yInitialSpeed = initialSpeed * Math.sin(convertDegreesToRadians(angle))
        this.xInitialSpeed = initialSpeed * Math.cos(convertDegreesToRadians(angle))      
    }

    getFlightTime(){
        return 2 * this.yInitialSpeed / this.gravity
    }

    getMaxDistance(){
        return ((this.initialSpeed ** 2) * Math.sin(2 * convertDegreesToRadians(this.angle))) / this.gravity
    }

    getMaxHeight(){
        return Math.pow(this.yInitialSpeed, 2) / (2 * this.gravity)
    }

    getSpeedAtTime(time){
        return {
            vx: this.xInitialSpeed,
            vy: this.yInitialSpeed - this.gravity * time,
        }
    }

    getPositionAtTime(time, options = {}){        
        if(!options.finalTime){
            time = time / 10
        }

        return {
            x: this.xInitialSpeed * time,
            y: this.yInitialSpeed * time - .5 * (this.gravity * Math.pow(time, 2))
        }
    }

}
