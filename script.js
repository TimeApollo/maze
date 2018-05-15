const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];

const main = document.querySelector("main");
const sonic = document.getElementById("sonic");
sonic.style.width = 'calc(100vw / ' + map[0].length + ')';
sonic.style.height = 'calc(100vh / ' + map.lenght + ')';
const endRing = document.getElementById("endImg");
endRing.style.width = 'calc(100vw / ' + map[0].length + ')';
endRing.style.height = 'calc(100vh / ' + map.lenght + ')';

let rowIndex = 0;
for (const row of map) {
    let newRow = createDivRow("row", rowIndex, map.length)
    let cellIndex = 0;
    for (let letter of row) {
        if (letter === " ") {
            letter = "space"
        }
        createCell(letter, newRow, row.length , cellIndex)
        cellIndex++;
    }
    rowIndex++;
}

let start = document.getElementsByClassName("S");
start[0].appendChild(sonic);
let currentPosition = start[0];
let end = document.getElementsByClassName("F");
end[0].appendChild(endRing);
document.addEventListener('keydown', movePlayer);
let Winner = false;

function createDivRow(className, Id, mapLength) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add(className);
    rowContainer.dataset.row = Id;
    rowContainer.style.height = 'calc(100vh / ' + mapLength + ')'
    main.appendChild(rowContainer);
    return rowContainer;
}

function createCell(className, rowContainer, lenghtOfRow ,cellIndex) {
    const cell = document.createElement('div');
    cell.classList.add(className);
    cell.style.width = 'calc(100vw / ' + lenghtOfRow + ')'
    cell.dataset.column = cellIndex;
    rowContainer.appendChild(cell);
    return cell;
}

function movePlayer(event){
    if(Winner){
        return;
    }
    const keyName = event.key;
    let nextPosition = currentPosition;
    let currentColumnValue = 0;
    let rowElement = 0;
    console.log('keydown event\n\n' + 'key: ' + keyName);
    if (keyName === "ArrowDown") {
        if(currentPosition.parentElement.dataset.row == map.length - 1){
            nextPosition = currentPosition;
            return;
        }
        currentColumnValue = Number(currentPosition.dataset.column);
        rowElement = currentPosition.parentElement.nextSibling;
        nextPosition = rowElement.childNodes[currentColumnValue];
        if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(sonic)
        }else{
            nextPosition = currentPosition;
        }
    } else if (keyName === "ArrowUp") {
        if(currentPosition.parentElement.dataset.row == map.length - 1){
            nextPosition = currentPosition;
            return;
        }
        currentColumnValue = Number(currentPosition.dataset.column);
        rowElement = currentPosition.parentElement.previousSibling;
        nextPosition = rowElement.childNodes[currentColumnValue];
        if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(sonic)
        }else{
            nextPosition = currentPosition;
        }
    } else if (keyName === "ArrowLeft") {
        if(currentPosition.dataset.column == 0){
            nextPosition = currentPosition;
            return;
        }
        nextPosition = currentPosition.previousSibling;
        if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(sonic)
        }else{
            nextPosition = currentPosition;
        }
    } else if (keyName === "ArrowRight") {
        if(currentPosition.dataset.column == map[0].length-1){
            nextPosition = currentPosition;
            return;
        }
        nextPosition = currentPosition.nextSibling;
        if(!nextPosition.classList.contains("W")){
            nextPosition.appendChild(sonic)
        }else{
            nextPosition = currentPosition;
        }
    }
    currentPosition = nextPosition;
    winCondition(currentPosition)
    if(Winner){
        const winBox = document.createElement("div");
        const winBoxText = document.createElement("div");
        winBox.style.backgroundColor = "green";
        winBox.style.margin = "auto";
        winBox.style.color = "white";
        winBox.style.height = "20vh";
        winBox.style.width = "50vw";
        winBox.style.textAlign = "center";
        winBox.style.verticalAlign = "middle";
        winBox.style.position = "absolute";
        winBox.style.top = "0px";
        winBox.style.left = "25vw";
        winBoxText.textContent = "You have made it through the maze!!!!"
        winBoxText.style.position = 'absolute';
        winBoxText.style.top = '45%';
        winBoxText.style.width = '100%';
        winBoxText.style.textAlign = "center";
        winBox.appendChild(winBoxText);
        document.body.appendChild(winBox);
    }
}

function winCondition(position){
    if(position.classList.contains("F")){
        Winner = true;
    }
}


