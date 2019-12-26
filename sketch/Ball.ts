class Ball {
    protected ballXPosition: number;
    protected ballYPosition: number;
    protected ballSpeed: number;
    protected ballRadius: number;

    constructor(ballXPosition: number, ballYPosition: number, ballSpeed: number, ballRadius: number) {
        this.ballXPosition = ballXPosition; // Recieve ball x,y coordinates from method?
        this.ballYPosition = ballYPosition;
        this.ballSpeed = ballSpeed;
        this.ballRadius = ballRadius;
    }
    update(): void { }
    draw(): void {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);
    }
    handleBall(): void {
        if (this.ballYPosition > height || this.ballYPosition < 0) {
            this.ballSpeed *= -1;
        } else if (this.ballXPosition > width || this.ballXPosition < 0) {
            this.ballSpeed *= -1;
        }
    }
    ballSize(): void { }
    bounceBackFromPad(): void { }
}