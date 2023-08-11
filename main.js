


let main = document.getElementById('overall');
let startButton = document.createElement('button');
startButton.textContent = "Play Ultimate Tic-Tac-Toe!";
startButton.setAttribute("id", "startButton");
startButton.addEventListener("click", startMenu);
main.appendChild(startButton);


let listChoices = ["", "","", "", "", "","", "", ""]

// Renders the game
function renderBoard(){
    let mainboard = document.getElementById("mainboard");
    squareArray = [];
    for (i = 0; i < 9; i++){
        let square = document.createElement('div');
        square.setAttribute('id', `square${i}`);
        square.setAttribute('class', "square");
        mainboard.appendChild(square);
        squareArray.push(square);
    }
    return squareArray;

}

const Players = {
    playerOne: '',
    computerOne: ''
}

const Solutions = 
[[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]

function checkWin(){
    let prompt = document.getElementById('prompt');
    let mainboard = document.getElementById('mainboard');
    playAgain = document.createElement('button');
    playAgain.textContent = "Play Another Round.";
    playAgain.setAttribute("id", "playAgain");
    playAgain.addEventListener("click", clearBoard);
    if (prompt.textContent !== "It's a draw!"){
    for (i = 0; i < 8; i++){
         let individualSolution = Solutions[i];
         let winConditionCache = [];
         for (x = 0; x < 3; x++){
            winConditionCache.push(listChoices[individualSolution[x]]);
         }
         if (winConditionCache.toString() === "X,X,X"){
            if (Players.playerOne === "X"){
                prompt.textContent = "Player wins!";
                mainboard.appendChild(playAgain);
            }
            else {
                prompt.textContent = "Computer wins!";
                mainboard.appendChild(playAgain);
            }
         }
         if (winConditionCache.toString() === "O,O,O"){
            if (Players.playerOne === "O"){
                prompt.textContent = "Player wins!";
                mainboard.appendChild(playAgain);
            }
            else {
                prompt.textContent = "Computer wins!";
                mainboard.appendChild(playAgain);
            }
         } if (listChoices.every(choice => choice !== "") && prompt.textContent !== "Computer wins!" && prompt.textContent !== "Player wins!") {
            prompt.textContent = "It's a draw!";
            mainboard.appendChild(playAgain);
         }
    }
    }
}


function clearBoard(){
    listChoices = ["", "","", "", "", "","", "", ""];
    let prompt = document.getElementById('prompt');
    let playAgain = document.getElementById('playAgain');
    let o = document.getElementById('odiv');
    let x = document.getElementById('xdiv');
    let mainboardSquares = document.getElementsByClassName('square');
    for (i = 0; i < 9; i++){
        mainboardSquares[i].textContent = "";
        mainboardSquares[i].style.backgroundColor = "aquamarine";
    }
    prompt.textContent = "Choose X or O!";
    Players.playerOne = '';
    Players.computerOne = '';
    o.style.backgroundColor = "brown";
    x.style.backgroundColor = "brown";
    playAgain.remove();
    renderChoices.writeBoard(listChoices);
    return listChoices, o, x;
}


//Player chooses to play as 'X' or 'O'.
function renderPlayChoice(){
    let overall = document.getElementById("overall");
    let prompt = document.createElement('h1');
        let x = document.createElement('div');
        let o = document.createElement('div');
        x.setAttribute('id', "xdiv");
        o.setAttribute('id', "odiv");
        prompt.setAttribute('id', "prompt");
        if (prompt.textContent === ''){
            prompt.textContent = "Choose X or O!"
        }
        x.textContent = "X"
        o.textContent = "O"
        console.log(prompt.textContent);
        if (prompt.textContent !== "It's a draw!"){
            x.addEventListener("click", function(){
                Players.playerOne = 'X';
                Players.computerOne = 'O';
                x.style.backgroundColor = "aquamarine";
                x.style.transition = "all 0.3s ease-out 0.1s";
                o.style.backgroundColor = "brown";
                o.style.transition = "all 0.3s ease-in 0.1s";

                
            })
            o.addEventListener("click", function(){
                Players.playerOne = 'O';
                Players.computerOne = 'X';
                o.style.backgroundColor = "aquamarine";
                x.style.backgroundColor = "brown";
                o.style.transition = "all 0.3s ease-in 0.1s";
                x.style.transition = "all 0.3s ease-out 0.1s";

        
            })
        
            overall.appendChild(x);
            overall.appendChild(o);
            overall.appendChild(prompt);
            
            return prompt, x, o;
        }

}

function computerChoice(){
    let temporarycache = [];
    let mainboardSquares = document.getElementsByClassName("square");
    for (i = 0; i < 9; i++){
        let square = mainboardSquares[i];
        if (square.textContent === ""){
            temporarycache.push(square);
            
        }
        
    }
    let choice = Math.floor(Math.random() * temporarycache.length);
    try{
        let choiceIndex = temporarycache[choice].id.slice(6);
        listChoices[choiceIndex] = Players.computerOne;
        temporarycache[choice].textContent = Players.computerOne;
        if (Players.playerOne !== ""){
            temporarycache[choice].style.backgroundColor = "#EAD94C";
        }
    } catch {
        clearBoard();
        return;
    }
    checkWin();
    return listChoices;
}


function startMenu(){
    startButton.remove();
    renderPlayChoice();
    renderBoard();
    renderChoices.writeBoard(listChoices);
}

// Listens for a click on the squares. Every time the click happens it needs to run a function that tells the computer to choose randomly.

const renderChoices = {
    writeBoard: function (listChoices){
        let prompt = document.getElementById('prompt');
        if (prompt.textContent === "Choose X or O!"){
            let mainboardSquares = document.getElementsByClassName("square");
            for (i = 0; i < mainboardSquares.length; i++){
                let square = mainboardSquares[i];
                square.addEventListener("click", function(event){
                    let indexSquare = event.target.id.slice(6);
                    console.log(mainboardSquares[indexSquare].textContent);
                    if (mainboardSquares[indexSquare].textContent !== "O" && mainboardSquares[indexSquare].textContent !== "X"){
                        let square = mainboardSquares[indexSquare];
                        if (listChoices[indexSquare] === "" && prompt.textContent === "Choose X or O!"){
                            listChoices[indexSquare] = Players.playerOne;
                            square.textContent = Players.playerOne;
                            if (Players.playerOne !== ""){
                                square.style.backgroundColor = "#DD7373";
                            }
                            checkWin();
                            console.log(prompt);
                            if (prompt.textContent !== "Choose X or O!"){
                                return;
                            } else if (prompt.textContent === "Choose X or O!") {
                                console.log("FAWFAWF");
                                computerChoice();
                            }
                
                        }   
                    }
                })
    
            }
        }
        }
        
}
