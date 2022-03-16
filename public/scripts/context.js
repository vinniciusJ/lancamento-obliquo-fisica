const baseSchema = { primary: '#F78154', }

const projectileMotionContext = {
    current: {},
    contexts: {
        earth: {
            gravity: 9.81,
            colorSchema: {
                ...baseSchema,
                secondary: '#424340'
            }
        },
        moon: {
            gravity: 1.62,
            colorSchema: {
                ...baseSchema,
                secondary: '#FFF'
            }
        },
        jupter: {
            gravity: 24.79,
            colorSchema: {
                ...baseSchema,
                secondary: '#FFF'
            }
        }
    }
}

const handler = {
    set: (target, prop, newValue) => {
        if(prop == 'currentGravity'){
            const gravities = Object.keys(target.contexts).map(key => target.contexts[key].gravity)

            if(!gravities.includes(newValue)){
                throw new Error('Invalid value for gravity')
            }

            target.current = Object.values(target.contexts).find(value => value.gravity == newValue)

            return true
        }
    },

    get: (target, prop) => {
        if(prop == 'currentGravity'){
            return target.current.gravity
        }

        if(prop == 'colorSchema'){
            return target.current.colorSchema
        }
        
        return target.current
    }
}

const context = new Proxy(projectileMotionContext, handler)

export default context