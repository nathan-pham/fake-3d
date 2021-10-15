import gsap from "https://esm.sh/gsap"

export default class SphereParticle {

    theta = Math.random() * 2 * Math.PI
    phi = Math.acos((Math.random() * 2) - 1)
    radius = 30
    projectedX = 0
    projectedY = 0
    projectedScale = 0
    
    constructor({ dimensions: { width, height }, autoplay=true, texture }={ dimensions: {} }) {

        this.globeRadius = width / 5

        this.perspective = width * 0.8
        this.projectionCenterX = width / 2
        this.projectionCenterY = height / 2

        Object.assign(this, { x: 0, y: 0, z: 0 })

        if(autoplay) {
            this.startAnimation()        
        }

        this.texture = texture

    }

    startAnimation() {

        gsap.to(this, 20 + Math.random() * 10, {
            theta: this.theta + Math.PI * 2,
            repeat: -1,
            ease: "none"
        })

    }

    project() {

        Object.assign(this, { 
            x: this.globeRadius * Math.sin(this.phi) * Math.cos(this.theta),
            y: this.globeRadius * Math.cos(this.phi), 
            z: this.globeRadius * Math.sin(this.phi) * Math.sin(this.theta) + this.globeRadius
        })

        this.projectedScale = this.perspective / (this.perspective + this.z)
        this.projectedX = (this.x * this.projectedScale) + this.projectionCenterX
        this.projectedY = (this.y * this.projectedScale) + this.projectionCenterY

    }

    render({ ctx, dimensions: { width } }={ dimensions: {} }) {

        this.project()

        if(this.texture) {

            ctx.font = `${ this.radius }px serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // ctx.save()
            ctx.globalAlpha = Math.abs(1 - this.z / width)
            ctx.fillText(this.texture, this.projectedX, this.projectedY)
            // ctx.restore()

        } else {

            ctx.beginPath()
            ctx.arc(this.projectedX, this.projectedY, this.projectedScale * this.radius, 0, 2 * Math.PI)
    
            ctx.fillStyle = `rgba(0, 0, 0, ${ Math.abs(1 - this.z / width) })`
            ctx.fill()

        }

    }

}
