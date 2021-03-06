import Particle from "./objects/SphereParticle.js"

export default class Canvas {

    particles = []
    animationID = null

    constructor({
        root=document.body, 
        autoplay=true, 
        lines=false, 
        textures=[], 
        population=100,
        radius=false }={}) {

        this.root = typeof root == "string" ? document.querySelector(root) : root
        this.root.appendChild(this.#createCanvas())
        this.#addEventListeners()

        this.lines = lines 

        this.#createParticles({ radius, textures, population })
        
        if(autoplay) {
            this.startAnimation()
        }

    }

    get dimensions() {

        return {
            width: this.root.offsetWidth,
            height: this.root.offsetHeight
        }
            
    }

    #createParticles({ radius, textures, population }) {

        for(let i = 0; i < population; i++) {

            this.particles.push(new Particle({ 
                dimensions: this.dimensions,
                radius: radius || (textures.length > 0 ? 30 : 5),
                texture: textures[Math.floor(Math.random() * textures.length)]
            }))

        }

    }

    #createCanvas() {

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        return this.canvas

    }

    #addEventListeners() {

        const resize = () => {

            const { width, height } = this.dimensions
            const { canvas, ctx } = this

            if(window.devicePixelRatio > 1) {

                canvas.width = canvas.clientWidth * 2
                canvas.height = canvas.clientHeight * 2
                ctx.scale(2, 2)
            
            } else {
            
                canvas.width = width
                canvas.height = height
            
            }

        }

        window.addEventListener("resize", resize)
        resize()

    }

    startAnimation() {

        const animate = () => {

            requestAnimationFrame(animate)

            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
            this.particles
                .sort((particleA, particleB) => particleA.projectedScale - particleB.projectedScale)
                .forEach(particle => typeof particle.render == "function" 
                    ? particle.render(this) 
                    : console.log("[Canvas.js] no render function"))

        }

        animate()

    }

    stopAnimation() {

        cancelAnimationFrame(this.animationID)

    }

}