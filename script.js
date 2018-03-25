(function () {
    var Game = function () {
        var canvasElement = document.getElementById('canvas');
        var canvas = canvasElement.getContext('2d');
        var canvasSize = { x: canvasElement.width, y: canvasElement.height };
        this.objects = [new Player(this, canvasSize)];
        var self = this;

        var nextFrame = function () {
            self.update();
            self.draw(canvas, canvasSize);
            requestAnimationFrame(nextFrame); //60fps
        };
        nextFrame();
    };

    Game.prototype = {
        update: function () {
            console.log('update Objects');
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
        this.game = game;
        this.color = 'orange';
        this.size = { x: 15, y: 15 };
        this.center = { x: canvasSize.x / 2, y: canvasSize.y - this.size.x };
    };

    // DRAW OBJECT
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

    // LOAD NEW GAME
    window.onload = function () {
        new Game();
    };
})();