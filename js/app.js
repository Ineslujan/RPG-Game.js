const app = {
    player: {
        x: 0,
        y: 0,
        direction: 'right',
    },
    targetCell: {
        x: 5,
        y: 3,
    },
    direction: {
        right: ['up', 'down', 1],
        up: ['left', 'right', -1],
        left: ['down', 'up', -1],
        down: ['right', 'left', 1],
    },
    // left: {
    //   right: 'up',    // right
    //   up: 'left',     // up
    //   left: 'down',   // left
    //   down: 'right',  // down
    // },
    // right: {
    //   right: 'down',  // right
    //   up: 'right',    // up
    //   left: 'up',     // left
    //   down: 'left',   // down
    // },
    degree: 0,
    gameOver: false,
    attempts: 0,
    cellSize: 70,
    parent: document.getElementById('board'),
    drawBoard: function () {
        for (let y = 0; y < 4; y++) {
            const div = document.createElement('div');

            div.classList.add('row');
            app.parent.appendChild(div);

            for (let x = 0; x < 6; x++) {
                const cell = document.createElement('div');
                cell.style.width = `${app.cellSize}px`;
                cell.style.height = `${app.cellSize}px`;
                cell.classList.add('cell');
                div.appendChild(cell);

                if (x === app.targetCell.x && y === app.targetCell.y) {
                    cell.style.backgroundColor = 'green';
                }

                if (x === app.player.x && y === app.player.y) {
                    const divPlayer = document.createElement('div');

                    divPlayer.classList.add('player');
                    divPlayer.style.transform = `rotate(${app.degree}deg)`;
                    cell.appendChild(divPlayer);
                }
            }
        }
        app.isGameOver();
    },
    clearBoard: function () {
        app.parent.innerHTML = '';
    },
    redrawBoard: function () {
        app.clearBoard();
        app.drawBoard();
    },
    turnLeft: function () {
        if (app.gameOver === false) {

            if (app.player.direction === 'right') {
                app.player.direction = 'up';
            }
            else if (app.player.direction === 'up') {
                app.player.direction = 'left';
            }
            else if (app.player.direction === 'left') {
                app.player.direction = 'down';
            }
            else if (app.player.direction === 'down') {
                app.player.direction = 'right';
            }
            app.degree -= 90;
            app.redrawBoard();
        }
    },
    turnRight: function () {
        if (app.gameOver === false) {

            if (app.player.direction === 'right') {
                app.player.direction = 'down';
            }
            else if (app.player.direction === 'up') {
                app.player.direction = 'right';
            }
            else if (app.player.direction === 'left') {
                app.player.direction = 'up';
            }
            else if (app.player.direction === 'down') {
                app.player.direction = 'left';
            }
            app.degree += 90;
            app.redrawBoard();
        }
    },
    moveForward: function () {
        if (!app.gameOver) {

            if (app.player.direction === 'right') {
                app.player.x += 1;
                console.log('j\'avance' + app.player.x);
                if (app.player.x < 6) {
                    app.redrawBoard();
                }
                else {
                    alert('On sort du jeu');
                    app.player.x -= 1;
                }
            }
            else if (app.player.direction === 'up') {
                app.player.y -= 1;
                console.log('je monte' + app.player.y);
                if (app.player.y >= 0) {
                    app.redrawBoard();
                }
                else {
                    alert('On sort du jeu');
                    app.player.y += 1;
                }
            }
            else if (app.player.direction === 'left') {
                app.player.x -= 1;
                console.log('je recule' + app.player.x);
                if (app.player.x >= 0) {
                    app.redrawBoard();
                }
                else {
                    alert('On sort du jeu');
                    app.player.x += 1;
                }

            }
            else if (app.player.direction === 'down') {
                app.player.y += 1;
                console.log('je descends' + app.player.y);
                if (app.player.y < 4) {
                    app.redrawBoard();
                }
                else {
                    alert('On sort du jeu');
                    app.player.y -= 1;
                }
            }

        }
    },
    listenKeyboardEvents: function () {
        document.addEventListener('keyup', function (event) {
            console.log(event);
            if (event.key === 'ArrowRight') {
                app.turnRight();
                app.attempts += 1;
            }
            else if (event.key === 'ArrowLeft') {
                app.turnLeft();
                app.attempts += 1;
            }
            else if (event.key === 'Enter') {
                app.moveForward();
                app.attempts += 1;
            }
        });
    },
    isGameOver: function () {
        if (app.targetCell.x === app.player.x && app.targetCell.y === app.player.y) {
            const bodyy = document.createElement('div');

            bodyy.innerHTML = `<p>Vous avez gagné en ${app.attempts} coups</p>`;

            bodyy.classList.add('win');
            document.body.appendChild(bodyy);


            // alert(`Vous avez gagné en ${app.attempts} coups`)

            app.gameOver = true;
        }

    },
    init: function () {
        app.drawBoard();
        app.listenKeyboardEvents();
    }
};
document.addEventListener('DOMContentLoaded', app.init);