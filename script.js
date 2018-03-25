(function () {
    var Game = function () {
        var canvasElement = document.getElementById('canvas');
        var canvas = canvasElement.getContext('2d');
        var canvasSize = { x: canvasElement.width, y: canvasElement.height };

        var nextFrame = function () {
            console.log(new Date());
            requestAnimationFrame(nextFrame); //60fps
        };

        nextFrame();
    };

    window.onload = function () {
        new Game();
    };
})();