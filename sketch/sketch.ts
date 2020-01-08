// global variables
let gameManager: GameManager;
let gameMusic: GameMusic;
let isGameRunning: number;
let gameRestart: number;
let circleSize: number;
let nrOfPlayers: number;
let img: p5.Image;
let img2: p5.Image;

window.addEventListener('load', () => {
    isGameRunning = 0;
})

function preload() {
    img = loadImage('./assets/images/battle_pong.svg');

    // load music
    soundFormats('wav');
    gameMusic = { menuMusic: (window as any).loadSound('./assets/music/menu-music.wav') }
}

function setup() {
    // size of the screen
    createCanvas(windowWidth, windowHeight, "p2d");
    frameRate(60);
    fullscreen();
    angleMode(DEGREES);

    // play menu music on page load
    // gameMusic.menuMusic.loop();
    // gameMusic.menuMusic.play();
    // create new game manager instance
    gameManager = new GameManager(gameMusic);
}
function draw() {
    gameManager.update();
    gameManager.draw();
}


// key press event
function keyPressed() {
    // just for testing
    // when 1st player presses on left button, remove player
    // for (let i = 0; i < gameManager.players.length; i++) {
    //     if (keyCode === gameManager.players[0].playerButtonLeft && isGameRunning == 1 && gameManager.players.length > 1) {
    //         gameManager.players[0].removePlayer();
    //     }
    // }

}


// hover event
function mouseMoved(): void {
    const addPlayerButton = mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
        mouseY > height * .9 && mouseY < (height * .9) + 45;
    const soundButton = dist(mouseX, mouseY, 60, 60) < 40;

    const StartGameButton = mouseX > (width * .5) - 75 && mouseX < (width * .5) + 70 &&
        mouseY > height * .89 && mouseY < (height * .89) + 50;

    if (addPlayerButton || soundButton || StartGameButton) {
        cursor('pointer');
    }
    else {
        cursor(ARROW);
    }
}

// mouse on click/press interactions called here
function mousePressed(): void {
    // mouse click/press events on game menu
    if (isGameRunning == 0 && gameManager.players.length < 8) {
        gameManager.gameMenu.handleAddPlayerButton();

        // set keys after each player is created
        for (const playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                const player = gameManager.players[playerObj];
                player.setKeys();
            }
        }
    }

    // mouse click/press events on start button
    if (isGameRunning == 0 && mouseX > (width * .5) - 75 && mouseX < (width * .5) + 70 &&
        mouseY > height * .89 && mouseY < (height * .89) + 50) {
        clear();
        gameManager.gameSettings.startGame();
    }

    // etc mouse click/press events in game area, not player buttons
    else if (isGameRunning == 1 || isGameRunning == 2) {
    }
    // mute music and draw line on click
    gameManager.gameSettings.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
