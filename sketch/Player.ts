class Player {
    public playerID: number = gameManager.players.length;
    public activePlayer: boolean;
    public playerColor: p5.Color;
    public playerButtonLeft!: number;
    private playerButtonRight!: number;
    public playerXCoordinates: number[];
    public playerYCoordinates: number[];
    public pad: Pad;

    constructor() {
        this.activePlayer = true;
        this.playerColor = this.getPlayerColor;
        this.playerXCoordinates = [];
        this.playerYCoordinates = [];
        this.pad = new Pad;
    }

    update() {
        this.setKeys();

        if (isGameRunning === 1) {
            // set positions if they're unset
            if (this.pad.currentPosition == undefined && this.pad.startPosition == undefined) {
                gameManager.setDefaultPositions();
            }
            this.getPlayerCoordinates();
            this.handlePlayerButtons();
        }
    }
    draw() {
        this.pad.drawPlayer(this.playerColor);
    }

    hitPlayer() { }

    // make player inactive
    removePlayer() {
        this.activePlayer = false;
    }

    getPlayerCoordinates() {
        for(let i = 0; i <= this.pad.getPadLength; i++){
            this.playerXCoordinates[i] = (circleSize / 2) * Math.cos(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (width / 2);
            this.playerYCoordinates[i] = (circleSize / 2) * Math.sin(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (height / 2);
        }
    }

    // generate random color
    private get getPlayerColor(): p5.Color {
        let r = random(0, 255);
        let g = random(0, 255);
        let b = random(0, 255);
        let c = color(r, g, b);
        return c;
    }

    // handle user key press
    public handlePlayerButtons(): void {
        if (keyIsDown(this.playerButtonLeft)) {
            this.pad.calculatePlayerVelocity('left');
        }
        else if (keyIsDown(this.playerButtonRight)) {
            this.pad.calculatePlayerVelocity('right');
        }
    }

    // set constrain values
    public setConstrainValues() {
        this.pad.setMinValue = this.pad.getStartPosition - this.pad.getPadLength;
        this.pad.setMaxValue = (this.pad.getStartPosition + this.pad.getPadLength) - 1;
    }

    // set start position and default current position
    public setDefaultPositionss() {
        if (this.playerID === 0) {
            // 0 is not read as number so it is set manually
            this.pad.setCurrentPosition = 0;
            this.pad.setStartPosition = 0;
        }
        else {
            // position = full circle divided by nr of players, multiplied by playerID
            // or else each player ends up at the same position
            this.pad.setCurrentPosition = (360 / nrOfPlayers) * this.playerID;
            this.pad.setStartPosition = (360 / nrOfPlayers) * this.playerID;
        }
        this.setConstrainValues();
    }

    // set player buttons
    public setKeys() {
        if (!this.playerButtonRight) {
            const allKeyPairs = Object.entries(this.getKeys)[this.playerID];
            const keyPairIndex = parseInt(allKeyPairs[0])
            const keyPairObj = allKeyPairs[1];
            const keyPair = Object.entries(keyPairObj);

            for (const [key, value] of keyPair) {
                if (key === 'left' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonLeft = (<number>value);
                }
                if (key === 'right' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonRight = (<number>value);
                }
            }
        }
    }

    // list of keys
    private get getKeys(): Array<{}> {
        return [
            { left: UP_ARROW, right: DOWN_ARROW },
            { left: 65, right: 90 }, // A, Z
            { left: 76, right: 80 }, // L, P
            { left: 51, right: 69 }, // 3, E
            { left: 57, right: 48 }, // 9, 0
            { left: 53, right: 54 }, // 5, 6
            { left: 67, right: 86 }, // C, V
            { left: 66, right: 78 } // B, N
        ]
    }
}


