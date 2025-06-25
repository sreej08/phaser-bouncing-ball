let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let ballSize = 200;
let xspeed = 1.0;
let yspeed = 0.5;
let lives = 10;
let livesText;
let gameOverText;
let turboButton;
let turboText;

function preload() {
    // Load assets here
    this.load.image("ball", "assets/ball.png");
    this.load.image("square", "assets/square.png");
}

function create() {
    // Initialize game objects here
    gameOverText = this.add.text(WIDTH/2, HEIGHT/2, 'GAME OVER', {
        fontSize: '64px',
        fill: '#ff0000',
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);

    ball = this.add.sprite(WIDTH / 2, HEIGHT / 4, "ball");
    ball.setDisplaySize(ballSize, ballSize);

    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '24px',
        fill: '#808080'
    });
    // make ball interactive
    ball.setInteractive();
    ball.on('pointerdown', function() {
        console.log("Ball clicked!");
        xspeed *= 1.1;
        yspeed *= 1.1;
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        lives += 1;
        if (lives <= 3) {
            livesText.fill = '#ff0000';
        } else if (lives <= 5) {
            livesText.fill = '#ff8000';
        } else {
            livesText.fill = '#808080';
        }
        livesText.setText(`Lives: ${lives}`);
    });
    turboButton = this.add.image(715, 20, 'square').setInteractive();
    turboButton.setDisplaySize(250, 40);
    turboText = this.add.text(635, 10, 'Turbo mode!', {
        fontSize: 'bold 24px',
        fill: '#000000'
    });

    turboButton.on('pointerdown', function () {
        xspeed *= 3;
        yspeed *= 3;
    });
}

function update() {
    // Game logic here
    if (lives <= 0) {
        return;
    }
    // if (yspeed < 0) {
    //     yspeed -= 1;
    // } else {
    //     yspeed += 1;
    // }

    ball.y += yspeed;
    
    // if (xspeed < 0) {
    //     xspeed -= 1;
    // } else {
    //     xspeed += 1;
    // }
    ball.x += xspeed;

    if (ball.x >= WIDTH - ballSize / 2  || ball.x <= ballSize / 2) {
        xspeed = -xspeed;
        lives--;
        if (lives <= 3) {
            livesText.fill = '#ff0000';
        } else if (lives <= 5) {
            livesText.fill = '#ff8000';
        } else {
            livesText.fill = '#808080';
        }
        livesText.setText(`Lives: ${lives}`);
        checkGameOver();
    }
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed = -yspeed;
        lives--;
        if (lives <= 3) {
            livesText.fill = '#ff0000';
        } else if (lives <= 5) {
            livesText.fill = '#ff8000';
        } else {
            livesText.fill = '#808080';
        }
        livesText.setText(`Lives: ${lives}`);
        checkGameOver();
    }
}

function checkGameOver() {
    if (lives <= 0) {
        lives = 0;
        livesText.setText('Lives: 0');
        ball.setVisible(false);
        turboButton.setVisible(false);
        turboText.setVisible(false);
        gameOverText.setVisible(true);
        setTimeout(() => {
            gameOverText.setVisible(false);

            setTimeout(() => {
                gameOverText.setVisible(true);

                setTimeout(() => {
                    gameOverText.setVisible(false);

                    setTimeout(() => {
                        gameOverText.setVisible(true);
                    }, 500);

                }, 500);

            }, 500);

        }, 500);
    }
}