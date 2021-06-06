let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('../music/food.mp3');
const gameoversound = new Audio('../music/gameover.mp3');
const movesound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');
let speed = 10;
let lastPaintTime = 0;
const board = document.getElementById('board');
let snakeArr = [
    { x: 13, y: 15 }
]
let foodval = { x: 6, y: 7 };
let score = 0;






//Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(arr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine() {
    //Update snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        movesound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over...!!!! Press any key to Replay...");
        snakeArr = [
            { x: 13, y: 15 }
        ]
        musicsound.play();
        score = 0;
    }
    //incrememt score and food posn
    if (snakeArr[0].y === foodval.y && snakeArr[0].x === foodval.x) {
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        foodval = { x: Math.floor((Math.random() *(b-a)) + a), y: Math.floor((Math.random() *(b-a) ) + a) }
    }

    //Move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodval.y;
    foodElement.style.gridColumnStart = foodval.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





//Main logic start here
musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };//start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            //console.log('move up');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            //console.log('move down');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            //console.log('move left');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            //console.log('move right');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})