var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;


window.onload = function(){
    startGame();
    //every 1/10th of sec recalls this bloody func
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },100)
}

function randomCandy(){
    return candies[Math.floor(Math.random()* candies.length)]; // 0 to 5 (decimal numb)

}

function startGame(){
    for(let r =0; r<rows;r++){
        let row = [];
        for(let c=0; c<columns ;c++){
            // takes out a random pic from image folder
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            ///drag n drop functionality
            tile.addEventListener("dragstart", dragStart); //click on a candy
            tile.addEventListener("dragover", dragOver); // moving the candy while clicking on it
            tile.addEventListener("dragenter", dragEnter);// dragging it onto a candy
            tile.addEventListener("dragleave", dragLeave);//leaving it on another
            tile.addEventListener("drop", dragDrop)//dropping on another candy
            tile.addEventListener("dragend",dragEnd);//after process we swap


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart(){
    //this refers to tile that was clicked for drag
    currTile = this;

}

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    //this refers to the target that dropped on
    otherTile = this;
}

function dragEnd() {
    //not crush empty 
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }


    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        }
    }
}

function crushCandy (){
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;

            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;

            }
        }
    }
}

function checkValid(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy(){
    for (let c=0 ; c < columns ; c++){
        let ind = rows-1;
        for (let r= columns-1; r >= 0; r--){
            if (!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r>=0; r--){
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy(){
    for (let c = 0; c < columns; c++){
        if (board[0][c].src.includes("blank")){
            board[0][c].src = "./images/" + randomCandy() + ".png"
        }
    }
}