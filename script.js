
class RubiksCube {
  constructor() {
    this.state = this.createSolvedCube()
    this.moveHistory = []
  }

  createSolvedCube() {
    return {
      front: this.createFace("G"), // Green
      back: this.createFace("B"), // Blue
      left: this.createFace("O"), // Orange
      right: this.createFace("R"), // Red
      top: this.createFace("Y"), // Yellow
      bottom: this.createFace("W"), // White
    }
  }

  createFace(color) {
    return Array(3)
      .fill(null)
      .map(() => Array(3).fill(color))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }

  isSolved() {
    const faces = Object.values(this.state)
    return faces.every((face) => {
      const firstColor = face[0][0]
      return face.every((row) => row.every((cell) => cell === firstColor))
    })
  }

  rotateFaceClockwise(face) {
    const newFace = Array(3)
      .fill(null)
      .map(() => Array(3).fill("W"))
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newFace[j][2 - i] = face[i][j]
      }
    }
    return newFace
  }

  // ==================== MOVE IMPLEMENTATIONS ====================

  F() {
    this.state.front = this.rotateFaceClockwise(this.state.front)

    const temp = [this.state.top[2][0], this.state.top[2][1], this.state.top[2][2]]

    this.state.top[2][0] = this.state.left[2][2]
    this.state.top[2][1] = this.state.left[1][2]
    this.state.top[2][2] = this.state.left[0][2]

    this.state.left[0][2] = this.state.bottom[0][2]
    this.state.left[1][2] = this.state.bottom[0][1]
    this.state.left[2][2] = this.state.bottom[0][0]

    this.state.bottom[0][0] = this.state.right[2][0]
    this.state.bottom[0][1] = this.state.right[1][0]
    this.state.bottom[0][2] = this.state.right[0][0]

    this.state.right[0][0] = temp[0]
    this.state.right[1][0] = temp[1]
    this.state.right[2][0] = temp[2]
  }

  R() {
    this.state.right = this.rotateFaceClockwise(this.state.right)

    const temp = [this.state.top[0][2], this.state.top[1][2], this.state.top[2][2]]

    this.state.top[0][2] = this.state.front[0][2]
    this.state.top[1][2] = this.state.front[1][2]
    this.state.top[2][2] = this.state.front[2][2]

    this.state.front[0][2] = this.state.bottom[0][2]
    this.state.front[1][2] = this.state.bottom[1][2]
    this.state.front[2][2] = this.state.bottom[2][2]

    this.state.bottom[0][2] = this.state.back[2][0]
    this.state.bottom[1][2] = this.state.back[1][0]
    this.state.bottom[2][2] = this.state.back[0][0]

    this.state.back[0][0] = temp[2]
    this.state.back[1][0] = temp[1]
    this.state.back[2][0] = temp[0]
  }

  U() {
    this.state.top = this.rotateFaceClockwise(this.state.top)

    const temp = [this.state.front[0][0], this.state.front[0][1], this.state.front[0][2]]

    this.state.front[0][0] = this.state.right[0][0]
    this.state.front[0][1] = this.state.right[0][1]
    this.state.front[0][2] = this.state.right[0][2]

    this.state.right[0][0] = this.state.back[0][0]
    this.state.right[0][1] = this.state.back[0][1]
    this.state.right[0][2] = this.state.back[0][2]

    this.state.back[0][0] = this.state.left[0][0]
    this.state.back[0][1] = this.state.left[0][1]
    this.state.back[0][2] = this.state.left[0][2]

    this.state.left[0][0] = temp[0]
    this.state.left[0][1] = temp[1]
    this.state.left[0][2] = temp[2]
  }

  D() {
    this.state.bottom = this.rotateFaceClockwise(this.state.bottom)

    const temp = [this.state.front[2][0], this.state.front[2][1], this.state.front[2][2]]

    this.state.front[2][0] = this.state.left[2][0]
    this.state.front[2][1] = this.state.left[2][1]
    this.state.front[2][2] = this.state.left[2][2]

    this.state.left[2][0] = this.state.back[2][0]
    this.state.left[2][1] = this.state.back[2][1]
    this.state.left[2][2] = this.state.back[2][2]

    this.state.back[2][0] = this.state.right[2][0]
    this.state.back[2][1] = this.state.right[2][1]
    this.state.back[2][2] = this.state.right[2][2]

    this.state.right[2][0] = temp[0]
    this.state.right[2][1] = temp[1]
    this.state.right[2][2] = temp[2]
  }

  L() {
    this.state.left = this.rotateFaceClockwise(this.state.left)

    const temp = [this.state.top[0][0], this.state.top[1][0], this.state.top[2][0]]

    this.state.top[0][0] = this.state.back[2][2]
    this.state.top[1][0] = this.state.back[1][2]
    this.state.top[2][0] = this.state.back[0][2]

    this.state.back[0][2] = this.state.bottom[2][0]
    this.state.back[1][2] = this.state.bottom[1][0]
    this.state.back[2][2] = this.state.bottom[0][0]

    this.state.bottom[0][0] = this.state.front[0][0]
    this.state.bottom[1][0] = this.state.front[1][0]
    this.state.bottom[2][0] = this.state.front[2][0]

    this.state.front[0][0] = temp[0]
    this.state.front[1][0] = temp[1]
    this.state.front[2][0] = temp[2]
  }

  B() {
    this.state.back = this.rotateFaceClockwise(this.state.back)

    const temp = [this.state.top[0][0], this.state.top[0][1], this.state.top[0][2]]

    this.state.top[0][0] = this.state.right[0][2]
    this.state.top[0][1] = this.state.right[1][2]
    this.state.top[0][2] = this.state.right[2][2]

    this.state.right[0][2] = this.state.bottom[2][2]
    this.state.right[1][2] = this.state.bottom[2][1]
    this.state.right[2][2] = this.state.bottom[2][0]

    this.state.bottom[2][0] = this.state.left[2][0]
    this.state.bottom[2][1] = this.state.left[1][0]
    this.state.bottom[2][2] = this.state.left[0][0]

    this.state.left[0][0] = temp[2]
    this.state.left[1][0] = temp[1]
    this.state.left[2][0] = temp[0]
  }

  executeMove(move) {
    this.moveHistory.push(move)

    switch (move) {
      case "F":
        this.F()
        break
      case "F'":
        this.F()
        this.F()
        this.F()
        break
      case "R":
        this.R()
        break
      case "R'":
        this.R()
        this.R()
        this.R()
        break
      case "U":
        this.U()
        break
      case "U'":
        this.U()
        this.U()
        this.U()
        break
      case "D":
        this.D()
        break
      case "D'":
        this.D()
        this.D()
        this.D()
        break
      case "L":
        this.L()
        break
      case "L'":
        this.L()
        this.L()
        this.L()
        break
      case "B":
        this.B()
        break
      case "B'":
        this.B()
        this.B()
        this.B()
        break
    }
  }

  scramble(numMoves = 15) {
    const moves = ["F", "F'", "R", "R'", "U", "U'", "D", "D'", "L", "L'", "B", "B'"]
    const scrambleMoves = []

    for (let i = 0; i < numMoves; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)]
      this.executeMove(move)
      scrambleMoves.push(move)
    }

    return scrambleMoves
  }

  reset() {
    this.state = this.createSolvedCube()
    this.moveHistory = []
  }
}

// ==================== CUBE RENDERING ====================

const COLORS = {
  W: "#ffffff", // White
  R: "#ff0000", // Red
  G: "#00ff00", // Green
  B: "#0000ff", // Blue
  O: "#ff8000", // Orange
  Y: "#ffff00", // Yellow
}

function getCubeSvg(cubeState) {
  const faceSize = 80
  const gap = 8
  const cellSize = faceSize / 3
  const strokeWidth = 2

  function renderFace(face, x, y, label) {
    let svg = ""

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const color = COLORS[face[i][j]]
        const rectX = x + j * cellSize
        const rectY = y + i * cellSize

        svg += `<rect x="${rectX}" y="${rectY}" 
                        width="${cellSize}" height="${cellSize}" 
                        fill="${color}" 
                        stroke="#333" 
                        stroke-width="${strokeWidth}" 
                        rx="3"/>`
      }
    }

    svg += `<text x="${x + faceSize / 2}" y="${y - 10}" 
                text-anchor="middle" 
                font-size="14" 
                font-weight="bold" 
                fill="#333">${label}</text>`

    return svg
  }

  const topFace = renderFace(cubeState.top, faceSize + gap, 0, "TOP")
  const leftFace = renderFace(cubeState.left, 0, faceSize + gap, "LEFT")
  const frontFace = renderFace(cubeState.front, faceSize + gap, faceSize + gap, "FRONT")
  const rightFace = renderFace(cubeState.right, 2 * (faceSize + gap), faceSize + gap, "RIGHT")
  const backFace = renderFace(cubeState.back, 3 * (faceSize + gap), faceSize + gap, "BACK")
  const bottomFace = renderFace(cubeState.bottom, faceSize + gap, 2 * (faceSize + gap), "BOTTOM")

  const totalWidth = 4 * (faceSize + gap)
  const totalHeight = 3 * (faceSize + gap) + 30

  return `
        <svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#00000040"/>
                </filter>
            </defs>
            
            <rect width="100%" height="100%" fill="#f8f9fa" rx="10"/>
            
            <g filter="url(#shadow)">
                ${topFace}
                ${leftFace}
                ${frontFace}
                ${rightFace}
                ${backFace}
                ${bottomFace}
            </g>
        </svg>
    `
}

// ==================== GLOBAL VARIABLES ====================

const cube = new RubiksCube()
let scrambleMoves = []

// ==================== MAIN FUNCTIONS ====================

function init() {
  updateDisplay()
  console.log("🎲 Rubik's Cube Solver initialized!")
}

function updateDisplay() {
  const cubeState = cube.getState()
  document.getElementById("cubeDisplay").innerHTML = getCubeSvg(cubeState)

  const statusSection = document.getElementById("statusSection")
  const hintBtn = document.getElementById("hintBtn")

  if (cube.isSolved()) {
    statusSection.className = "status-section solved"
    statusSection.innerHTML = `
            <h2>✅ Status: Solved</h2>
            <p>Perfect! Ready to scramble!</p>
        `
    hintBtn.disabled = true
    document.getElementById("hintSection").style.display = "none"
  } else {
    statusSection.className = "status-section scrambled"
    statusSection.innerHTML = `
            <h2>🔄 Status: Scrambled</h2>
            <p>Try to solve it or get a hint!</p>
        `
    hintBtn.disabled = false
  }
}

function scrambleCube() {
  console.log("🎲 Scrambling cube...")
  scrambleMoves = cube.scramble(15)
  updateDisplay()
  document.getElementById("hintSection").style.display = "none"
  console.log("Scramble moves:", scrambleMoves.join(" "))
}

function executeMove(move) {
  console.log("Executing move:", move)
  cube.executeMove(move)
  updateDisplay()
}

function resetCube() {
  console.log("🔄 Resetting cube...")
  cube.reset()
  scrambleMoves = []
  updateDisplay()
  document.getElementById("hintSection").style.display = "none"
}

function showHint() {
  if (cube.isSolved()) {
    return
  }

  // Simple hint system - suggest basic moves based on cube state
  const hints = [
    "Try solving the white cross first - look for white edge pieces",
    "Focus on getting white edges to the bottom layer",
    "Use F, R, U, R', U', F' to position pieces",
    "Try R, U, R', U' to move corner pieces",
    "Work on one layer at a time - start with white (bottom)",
    "Look for pieces that are almost in the right position",
    "Try U moves to rotate the top layer and find better positions",
    "Use basic algorithms like R, U, R', U' repeatedly",
    "Focus on the white cross pattern on the bottom",
    "Try F, U, R, U', R', F' for corner positioning",
  ]

  const randomHint = hints[Math.floor(Math.random() * hints.length)]

  document.getElementById("hintSection").style.display = "block"
  document.getElementById("hintText").textContent = randomHint

  // Scroll to hint
  document.getElementById("hintSection").scrollIntoView({ behavior: "smooth" })
}

// ==================== EVENT LISTENERS ====================

window.addEventListener("load", () => {
  init()
  console.log("🎲 Rubik's Cube Solver loaded!")
})

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return
  }

  switch (event.key.toLowerCase()) {
    case "s":
      scrambleCube()
      break
    case "r":
      resetCube()
      break
    case "h":
      showHint()
      break
  }
})

console.log("🎲 Rubik's Cube Solver ready!")
console.log("💡 Keyboard shortcuts: S=Scramble, R=Reset, H=Hint")
