export default class Canvas {

    constructor({ root=document.body }={}) {

        this.root = typeof root == "string" ? document.querySelector(root) : root
        this.root.appendChild(this.#createCanvas())
        this.#addEventListeners()

    }

    get dimensions() {

        return {
            width: this.root.offsetWidth,
            height: this.root.offsetHeight
        }
            
    }

    #createCanvas() {

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        return this.canvas

    }

    #addEventListeners() {

        this.canvas.addEventListener("resize", () => {

            const { width, height } = this.dimensions
            const { canvas, ctx } = this

            if(window.devicePixelRatio > 1) {
                canvas.width = canvas.clientWidth * 2
                canvas.height = canvas.clientHeight * 2
                ctx.scale(2, 2)
            } else {
                canvas.width = dimensions.width
                canvas.height = dimensions.height
            }

        })

    }

}