(function () {
    var Game = function () {
        var canvasElement = document.getElementById('canvas');
        var canvas = canvasElement.getContext('2d');
        var canvasSize = { x: canvasElement.width, y: canvasElement.height };

        this.objects = [];
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
            console.log('draw Objects');
        },

        addObject: function (obj) {
            this.objects.push(obj);
        }
    };


    // LOAD NEW GAME
    window.onload = function () {
        new Game();
    };
})();