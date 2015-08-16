var rightEdge = 400;
var leftEdge = 0;
var topEdge = 70;
var bottomEdge = 385;
var victoryLine = 60;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //var obj = Object.create(Enemy.prototype);
    //obj.update = Enemy.prototype.update;
    //obj.render = Enemy.prototype.render;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //return obj;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 504) {
    this.x += this.speed * dt;
    }else{
    this.x = -100;
    };
};
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

//sends the player back to the starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//moves the player but keeps them from going off the game board
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case "left":
        if(this.x > leftEdge) {
            this.x = this.x - 100;
        }
            break;
        case "right":
        if(this.x < rightEdge) {
            this.x = this.x + 100;
        }
            break;
        case "up":
        if(this.y > topEdge) {
            this.y = this.y - 83;
        }
            break;
        case "down":
        if(this.y < bottomEdge) {
            this.y = this.y + 83;
        }
            break;
    }
};

Player.prototype.update = function(dt){

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-100, 60, 75);
var enemy2 = new Enemy(-100, 219, 50);
var enemy3 = new Enemy(-150, 136, 100);
var enemy4 = new Enemy(-150, 136, 200);
var enemy5 = new Enemy(-75, 219, 150);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player(200, 385);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//compares the boundry of the player to each enemy to see if a collision occured.
//did most of this on my own, but also got assistance from a MDN post
var checkCollisions = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if(player.y === Math.floor(allEnemies[i].y)){
            if ((Math.floor(allEnemies[i].x) + allEnemies[i].width) > player.x &&
                player.x + player.width > Math.floor(allEnemies[i].x) &&
                player.y < (Math.floor(allEnemies[i].y) + allEnemies[i].height) &&
                player.y + player.height > Math.floor(allEnemies[i].y)){
                player.reset();
            }
        }
    }
};