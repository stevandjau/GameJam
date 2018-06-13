//select begin
//begin in bedroom(just wake up)
//activate arrow control keys
//allow player to move around
//once left first room, trigger darkness and ghost
//after 2-4 room changes go bright and hide ghost
//repeat until ghost enters same room

//ghost function

//onload

window.onload = function() {

    var myGamePiece;
    var myObstacle;
    var avatar = new Image();
    avatar.src = "img/lady-up.png";
    var ghost = new Image();
    ghost.src = "img/ghost-down.png";

    var canvas = document.getElementById("background-canvas");
    var canvasControl = canvas.getContext("2d");
    var gCanvas = document.getElementById("ghost-canvas");
    var gCtx = gCanvas.getContext("2d");
    var background = new Image();
    background.src = "img/room-1h.png";
    var randomizer;
    var endPage = document.getElementById('endPage');
    endPage.style.display = "none";

    background.onload = function() {
        canvasControl.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    document.getElementById('goBtn').onclick = function() {
        var strtPage = document.getElementById('strtPage');
        strtPage.style.display = "none";
        myGamePiece = new Component((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), 100, 100, "red", "a", avatar);
        myGhost = new Component((myGameArea.canvas.width / 2), (myGameArea.canvas.height / 2), 100, 100, "red", "d", ghost)

        myGameArea.start();
    }

    function endGame() {
        endPage.style.display = "block"
    }

    function checkRoom() {
        if (myGhost.room === myGamePiece.room) {
            gCtx.drawImage(ghost, 300, 240, 115, 115);

            var gameOver = setTimeout(endGame, 1500);

        }
    } //end checkrooom

    function ghostRoom() {
        if (randomizer < 25) {
            ghost.src = "img/ghost-right.png";
            myGhost.room = "a";
        } else if (randomizer >= 25 && randomizer < 50) {
            ghost.src = "img/ghost-left.png";
            myGhost.room = "b";
        } else if (randomizer >= 50 && randomizer < 75) {
            ghost.src = "img/ghost-up.png";
            myGhost.room = "c";
        } else {
            ghost.src = "img/ghost-up.png";
            myGhost.room = "d";
        }
    }

    var myGameArea = {
        canvas: document.getElementById('game-canvas'),
        start: function() {
            this.context = this.canvas.getContext("2d");

            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function(e) {
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
            window.addEventListener('keyup', function(e) {
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            })
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function() {
            clearInterval(this.interval);
        }
    }

    function Component(x, y, w, h, fill, room, img) {
        this.gamearea = myGameArea;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speedX = 0;
        this.speedY = 0;
        this.room = room;
        this.update = function() {
            ctx = myGameArea.context;
            ctx.fillStyle = fill;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    function updateGameArea() {

        myGameArea.clear();
        myGamePiece.newPos();
        myGamePiece.update();
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.keys && myGameArea.keys[65]) {
            if (myGamePiece.x === 0) {
                myGamePiece.speedX = 0
            } else {
                myGamePiece.speedX = -2;
                avatar.src = "img/lady-left.png";
            }
        } //end keystroke up
        if (myGameArea.keys && myGameArea.keys[68]) {
            if (myGamePiece.x === myGameArea.canvas.width - myGamePiece.width) {
                myGamePiece.speedX = 0;
            } else {
                myGamePiece.speedX = 2;
                avatar.src = "img/lady-right.png";
            }
        } //end keystroke down
        if (myGameArea.keys && myGameArea.keys[87]) {
            if (myGamePiece.y === 0) {
                myGamePiece.speedY = 0
            } else {
                myGamePiece.speedY = -2;
                avatar.src = "img/lady-up.png";
            }
        } //end keystroke left
        if (myGameArea.keys && myGameArea.keys[83]) {
            if (myGamePiece.y === myGameArea.canvas.height - myGamePiece.height) {
                myGamePiece.speedY = 0;
            } else {
                myGamePiece.speedY = 2;
                avatar.src = "img/lady-down.png";
            } // end keystroke right
        }

        if (myGamePiece.room === "a") {
            //ROOM A
            //set background
            // console.log(myGamePiece.x);
            if ((myGamePiece.x > 620 && myGamePiece.x < 650) && (myGamePiece.y > 135 && myGamePiece.y < 205)) {
                background.src = "img/room-2h.png";
                myGamePiece.room = "b";
                myGamePiece.x = 95;
                myGamePiece.y = 216;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);

            } else if ((myGamePiece.x > 360 && myGamePiece.x < 440) && (myGamePiece.y > 320 && myGamePiece.y < 345)) {
                background.src = "img/room-4h.png";
                myGamePiece.room = "d";
                myGamePiece.x = 325;
                myGamePiece.y = 100;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
            }

        }

        if (myGamePiece.room === "b") {
            //ROOM A
            //set background
            // console.log(myGamePiece.x);
            if ((myGamePiece.x > 40 && myGamePiece.x < 45) && (myGamePiece.y > 175 && myGamePiece.y < 240)) {
                background.src = "img/room-1h.png";
                myGamePiece.room = "a";
                myGamePiece.x = 607;
                myGamePiece.y = 168;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
                //randomize ghost position

            } else if ((myGamePiece.x > 319 && myGamePiece.x < 400) && (myGamePiece.y > 326 && myGamePiece.y < 335)) {
                background.src = "img/room-3h.png";
                myGamePiece.room = "c";
                myGamePiece.x = 331;
                myGamePiece.y = 94;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
            }

        }

        if (myGamePiece.room === "c") {
            //ROOM A
            //set background
            // console.log(myGamePiece.x);
            if ((myGamePiece.x > 299 && myGamePiece.x < 360) && (myGamePiece.y > 40 && myGamePiece.y < 55)) {
                background.src = "img/room-2h.png";
                myGamePiece.room = "b";
                myGamePiece.x = 361;
                myGamePiece.y = 298;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
                //randomize ghost position

            } else if ((myGamePiece.x > 25 && myGamePiece.x < 50) && (myGamePiece.y > 190 && myGamePiece.y < 240)) {
                background.src = "img/room-4h.png";
                myGamePiece.room = "d";
                myGamePiece.x = 599;
                myGamePiece.y = 156;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
            }
        }

        if (myGamePiece.room === "d") {
            //ROOM A
            //set background
            // console.log(myGamePiece.x);
            if ((myGamePiece.x > 290 && myGamePiece.x < 380) && (myGamePiece.y > 44 && myGamePiece.y < 72)) {
                background.src = "img/room-1h.png";
                myGamePiece.room = "a";
                myGamePiece.x = 401;
                myGamePiece.y = 296;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
                //randomize ghost position

            } else if ((myGamePiece.x > 625 && myGamePiece.x < 650) && (myGamePiece.y > 125 && myGamePiece.y < 210)) {
                background.src = "img/room-3h.png";
                myGamePiece.room = "c";
                myGamePiece.x = 77;
                myGamePiece.y = 218;
                ghostRoom();
                var gameOver = setTimeout(checkRoom);
            }

        }
        randomizer = Math.floor(Math.random() * 100);
    }

}; //end onload
