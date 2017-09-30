// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    // Make sure that the enemy moves in again from the left, after going off the field on the right
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check if player is hit by an enemy
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define a class for player
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update the position of the player
Player.prototype.update = function () {
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for user input for the movement of the player
Player.prototype.handleInput = function (pressedKey) {
    switch (pressedKey) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
}

// Defining variables

var allEnemies = [];
var enemyPosition = [60, 120, 180];

// Instantiating the player
var player = new Player(200, 380, 50);

// Instantiate the enemies
for (i = 0; i < enemyPosition.length; i++) {
    enemy = new Enemy(0, enemyPosition[i], 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
