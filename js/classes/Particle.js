import gsap, { Expo } from "https://esm.sh/gsap"

export default class Particle {

    radius = 10
    projectedX = 0
    projectedY = 0
    projectedScale = 0
    
    constructor({ dimensions: { width, height }, autoplay=true }={ dimensions: {} }) {

        this.perspective = width * 0.8
        this.projectionCenterX = width / 2
        this.projectionCenterY = height / 2

        this.x = (Math.random() - 0.5) * width
        this.y = (Math.random() - 0.5) * height
        this.z = Math.random() * width

        if(autoplay) {
            this.startAnimation({ width })        
        }

    }

    startAnimation({ width }={}) {

        gsap.to(this, Math.random() * 10 + 15, {
            z: width,
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: Expo.easeInOut,
            delay: Math.random() * -25
        })

    }

    project() {

        this.projectedScale = this.perspective / (this.perspective + this.z)
        this.projectedX = (this.x * this.projectedScale) + this.projectionCenterX
        this.projectedY = (this.y * this.projectedScale) + this.projectionCenterY

    }

    render({ ctx, dimensions: { width } }={ dimensions: {} }) {

        this.project()

        ctx.fillStyle = `rgba(0, 0, 0, ${ Math.abs(1 - this.z / width) })`
        ctx.fillRect(
            this.projectedX - this.radius, 
            this.projectedY - this.radius, 
            this.radius * 2 * this.projectedScale, 
            this.radius * 2 * this.projectedScale)

    }

}
