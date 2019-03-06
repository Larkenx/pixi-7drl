import * as PIXI from 'pixi.js'
PIXI.utils.skipHello()
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const WIDTH = 1200
const HEIGHT = 600
const SPEED = 1 //ms

function rand(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export class GameDisplay {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.renderer = PIXI.autoDetectRenderer({
			width,
			height,
			antialias: true
		})
		this.ticker = new PIXI.ticker.Ticker()
		this.ticker.start()
		this.stage = new PIXI.Container()
		this.animations = []
	}

	animate(delta) {
		let callbacks = []
		for (let { sprite, speed, target, done } of this.animations) {
			let x = speed
			let y = speed
			let distX = Math.abs(sprite.x - target.x)
			let distY = Math.abs(sprite.y - target.y)
			if (distX <= Math.abs(x)) x = distX
			if (distY <= Math.abs(y)) y = distY
			sprite.x += x
			sprite.y += y
			if (sprite.x === target.x && sprite.y === target.y) {
				callbacks.push(done)
			}
		}
		this.animations = this.animations.filter(animation => {
			const { sprite, target } = animation
			return sprite.x !== target.x || sprite.y !== target.y
		})
		callbacks.forEach(fn => fn())
		this.renderer.render(this.stage)
	}

	tween(sprite, speed, target, done = () => {}) {
		this.animations.push({ sprite, speed, target, done })
	}

	destroy() {
		this.renderer.destroy()
	}

	mountCanvas() {
		document.getElementById('pixi_canvas').innerHTML = ''
		document.getElementById('pixi_canvas').appendChild(this.renderer.view)
	}

	clearStage() {
		const { stage } = this
		if (stage.children) {
			for (let i = stage.children.length - 1; i >= 0; i--) {
				stage.removeChild(stage.children[i])
			}
		}
	}

	drawChar(char, x, y, style) {
		const charStyling = new PIXI.TextStyle(style)
		let text = new PIXI.Text(char, titleStyling)
		titleText.x = 0
		titleText.y = 0
		console.log(titleText)
		this.stage.addChild(titleText)
		this.renderer.render(this.stage)
		this.tween(titleText, { x: 10000, y: 10000 }, { x: WIDTH / 2, y: HEIGHT / 2 })
	}

	renderStart() {
		this.clearStage()

		/* create hyperspeed white lines */
		// for (let x = 0; x < WIDTH; x += 50) {
		// 	for (let y = 0; y < HEIGHT; y += 200) {
		// 		let g = new PIXI.Graphics()

		// 		const sx = x
		// 		const sy = y + rand(50, 100)
		// 		const length = rand(100, 200)
		// 		g.beginFill(0xffffff)
		// 		g.drawRoundedRect(0, 0, 5, length)
		// 		g.endFill()
		// 		g.x = sx
		// 		g.y = sy
		// 		this.stage.addChild(g)
		// 		const tween = () => {
		// 			this.tween(g, 15, { x: sx, y: HEIGHT + length + 5 }, () => {
		// 				// reset the position to the original x position, but different y
		// 				g.x = sx
		// 				g.y = -HEIGHT
		// 				tween()
		// 			})
		// 		}
		// 		tween()
		// 	}
		// }
		const startContainer = new PIXI.Container()
		/* create title text, start at top and animate it down */
		const titleStyling = new PIXI.TextStyle({
			fontFamily: 'Audiowide',
			fontSize: 36,
			fontWeight: 'bold',
			fill: '#e4c203'
		})
		let titleText = new PIXI.Text('7DRL Alien Conquest', titleStyling)

		titleText.x = WIDTH / 2 - titleText.width / 2
		titleText.y = HEIGHT / 4 - titleText.height / 2
		startContainer.addChild(titleText)

		//  author text
		let authorText = new PIXI.Text(
			'Created by Larkenx',
			new PIXI.TextStyle({
				fontFamily: 'Audiowide',
				fontSize: 20,
				fontWeight: 'bold',
				fill: '#e4c203'
			})
		)

		authorText.x = WIDTH / 2 - authorText.width / 2
		authorText.y = HEIGHT / 4 - authorText.height / 2 + 50
		startContainer.addChild(authorText)

		/* create start button */
		const startButtonStyling = new PIXI.TextStyle({
			fontFamily: 'Audiowide,Consolas',
			fontSize: 24,
			fill: '#f6f6f6'
		})
		let startButtonText = new PIXI.Text('New Game', startButtonStyling)
		startButtonText.buttonMode = true
		startButtonText.interactive = true
		startButtonText.x = WIDTH / 2 - startButtonText.width / 2
		startButtonText.y = HEIGHT / 2 - startButtonText.height / 2
		startButtonText.alpha = 0.5

		startButtonText.on('pointerdown', () => {
			console.log('button pressed')
		})
		startButtonText.on('pointerover', () => {
			startButtonText.alpha = 1
		})
		startButtonText.on('pointerout', () => {
			startButtonText.alpha = 0.5
		})
		startContainer.addChild(startButtonText)

		// kick off animation for title text slowly moving to center
		let center = {
			x: WIDTH / 2,
			y: HEIGHT / 4
		}
		this.stage.addChild(startContainer)
		this.renderer.render(this.stage)
	}

	render() {
		this.renderStart()
		this.ticker.add(delta => this.animate(delta))
		// this.clearStage()
		// let g = new PIXI.Graphics()
		// g.beginFill(0x4385e9)
		// g.drawCircle(WIDTH / 2, HEIGHT / 2, 100)
		// g.endFill()
		// this.stage.addChild(g)
		// this.renderer.render(this.stage)
	}
}

export default new GameDisplay(WIDTH, HEIGHT)
