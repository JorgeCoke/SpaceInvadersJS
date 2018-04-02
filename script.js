(function () {
    var Game = function () {
        var canvasElement = document.getElementById('canvas');
        var canvas = canvasElement.getContext('2d');
        var canvasSize = { x: canvasElement.width, y: canvasElement.height };
        this.objects = createEnemies(this).concat([new Player(this, canvasSize)]);
        var self = this;

        this.canShoot = false;
        setInterval(function(){
            self.canShoot = true;
        }, 500);
        this.shootSound = new Audio('shoot.wav');

        var nextFrame = function () {
            self.update();
            self.draw(canvas, canvasSize);
            requestAnimationFrame(nextFrame); //60fps
        };
        nextFrame();
    };

    Game.prototype = {
        update: function () {
            var objectsArray = this.objects;
            var notCollidingWithAnything = function(body1) {
                return (
                    objectsArray.filter(function(body2) {
                        return colliding(body1, body2);
                    }).length === 0
                );
            };
            this.objects = this.objects.filter(notCollidingWithAnything);
            this.objects.forEach(function (obj) {
                obj.update();
            });
        },

        draw: function (canvas, canvasSize) {
            canvas.clearRect(0, 0, canvasSize.x, canvasSize.y); // Clean Canvas
            this.objects.forEach(function (obj) {
                drawObject(canvas, obj);
            });
        },

        addObject: function (obj) {
            this.objects.push(obj);
        }
    };

    // PLAYER OBJECT
    var Player = function (game, canvasSize) {
        this.type = 'player';
        this.game = game;
        this.color = 'orange';
        this.size = { x: 15, y: 15 };
        this.center = { x: canvasSize.x / 2, y: canvasSize.y - this.size.x };
    };
    Player.prototype = {
        update: function () {
            if (keyLeft) {
                this.center.x -= 2;
            } else if (keyRight) {
                this.center.x += 2;
            }
            if (keySpace && this.game.canShoot){
                var bullet = new Bullet ({ x: this.center.x, y: this.center.y - this.size.x / 2 }, -5, 'cyan', 'player');
                this.game.addObject(bullet);
                this.game.canShoot = false;
                this.game.shootSound.play();
            }
        },
    };

    // BULLET OBJECT
    var Bullet = function(center, velocity, color, type) {
        this.type = type;
        this.size = { x: 3, y: 12 };
        this.center = center;
        this.velocity = velocity;
        this.color = color;
    };
    Bullet.prototype = {
        update: function() {
            this.center.y += this.velocity;
        },
    };

    //ENEMY OBJECT
    var Enemy = function(game, center) {
        this.type = 'enemy';
        this.game = game;
        this.color = 'red';
        this.size = { x: 15, y: 15 };
        this.center = center;
        this.patrolX = 0;
        this.speedX = 0.3;
    };
    Enemy.prototype = {
        update: function() {
            if (this.patrolX < 0 || this.patrolX > 40) {
                this.speedX = -this.speedX;
            }
            this.center.x += this.speedX;
            this.patrolX += this.speedX;
            if (Math.random() > 0.995) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.x / 2 }, 3, 'purple', 'enemy');
                this.game.addObject(bullet);
            }
        },
    };

    //CREATE ENEMY METHOD
    var createEnemies = function(game) {
        console.log('game: ', game);
        var enemies = [];
        for (var i = 0; i < 12; i++) {
            var x = i * 25 + 100;
            enemies.push(new Enemy(game, { x: x, y: 15 }));
        }
        console.log('enemies: ', enemies);
        return enemies;
    };

    // DRAW METHOD
    var drawObject = function (canvas, obj) {
        canvas.fillStyle = obj.color;
        canvas.fillRect(
            obj.center.x - obj.size.x / 2,
            obj.center.y - obj.size.y / 2,
            obj.size.x,
            obj.size.y
        );
        canvas.fillStyle = 'black';
    };

    // COLLIDING METHOD
    var colliding = function(body1, body2) {
        return ((body1.type == 'player' && body2.type == 'enemy') || (body1.type == 'enemy' && body2.type == 'player')) &&
        (body1.center.x <= body2.center.x+5) &&
        (body1.center.x >= body2.center.x-5) &&
        (body1.center.y <= body2.center.y+5) &&
        (body1.center.y >= body2.center.y-5);
    };

    //KEYBOARD
    var keyRight = false;   //39
    var keyLeft = false;    //37
    var keySpace = false;   //32
    window.onkeydown = function (e) {
        console.log('e: ', e);
        switch (e.keyCode) {
            case 39:
                keyRight = true;
                break;
            case 37:
                keyLeft = true;
                break;
            case 32:
                keySpace = true;
                break;
            default:
                break;
        }
    };
    window.onkeyup = function (e) {
        switch (e.keyCode) {
            case 39:
                keyRight = false;
                break;
            case 37:
                keyLeft = false;
                break;
            case 32:
                keySpace = false;
                break;
            default:
                break;
        }
    };

    // LOAD NEW GAME
    window.onload = function () {
        new Game();
    };
})();