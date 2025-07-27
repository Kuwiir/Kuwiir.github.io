// Draw Line
function drawLine(sx, ex, sy, ey) {
    ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey); ctx.stroke();
}

// Draw Grid
function drawGrid() {
    ctx.lineWidth = 2;
    drawLine(5+gridWidth/3, 5+gridWidth/3, startGridH+5, c.height-5);
    drawLine(5+gridWidth*2/3, 5+gridWidth*2/3, startGridH+5, c.height-5);
    drawLine(5, 5+gridWidth, startGridH+5+gridHeight/3, startGridH+5+gridHeight/3);
    drawLine(5, 5+gridWidth, startGridH+5+gridHeight*2/3, startGridH+5+gridHeight*2/3);
    ctx.lineWidth = 4;
    drawLine(1, c.width-1, startGridH-2, startGridH-2);
}

// Two Players
function playSetUp() {
	drawGrid();
	winner = 0;
	ctx.drawImage(imgTopButtons, 0, 2, c.width+5, 46);
	playerTurn = "Player X";
	if (gamemode == "twoPlayers") 
    	{ctx.fillText("Player X's Turn", c.width/2, startGridH-18-40);}
    else if (gamemode == "basicAI") 
    	{ctx.fillText("Player's Turn", c.width/2, startGridH-18-40);}
}

// Draw X's and O's
function drawXO(row, column) {
	let slotSize = gridWidth/3;
    let midX = column * slotSize + slotSize/2 + 5
    let midY = startGridH + (row * slotSize) + slotSize/2 + 5

    if (playerTurn == "Player X") {
    	if (winner == 0) {
	        ctx.lineWidth = 2.5;
	        let xSize = 60; //120
	        drawLine(midX-xSize, midX+xSize, midY-xSize, midY+xSize);
	        drawLine(midX-xSize, midX+xSize, midY+xSize, midY-xSize);

            board[row][column] = "X";
            playerTurn = "Player O";
            ctx.clearRect(75, 60, 300, 50); // U could also do same black 8text on top
            if (gamemode == "twoPlayers") 
            	{ctx.fillText("Player O's Turn", c.width/2, startGridH-18-40);}
            else if (gamemode == "basicAI") 
            	{ctx.fillText("Computer's Turn", c.width/2, startGridH-18-40);}
        }
    }
    else if (playerTurn == "Player O") {
    	if (winner == 0) {
	        ctx.lineWidth = 4;
	        let oSize = 60; //120
	        ctx.beginPath();
	        ctx.arc(midX, midY, oSize, 0, 2*Math.PI);
	        ctx.stroke();
        
            board[row][column] = "O";
            playerTurn = "Player X";
            ctx.clearRect(75, 60, 300, 50);
            if (gamemode == "twoPlayers") 
            	{ctx.fillText("Player X's Turn", c.width/2, startGridH-18-40);}
            else if (gamemode == "basicAI") 
            	{ctx.fillText("Player's Turn", c.width/2, startGridH-18-40);}
        }
    }

    for (let i=0; i<board.length; i++) {
	    if (board[i][0] == board[i][1]
	    && board[i][0] == board[i][2]) {
	        winner = board[i][0]; //Rows
	        break;
	    }
	    else if (board[0][i] == board[1][i]
	    && board[0][i] == board[2][i]) {
	        winner = board[0][i]; //Columns
	        break;
	    }
	    else if (board[0][0] == board[1][1]
	    && board[1][1] == board[2][2]) {
	        winner = board[1][1]; //Diagonal L-R
	        break;
	    }
	    else if (board[0][2] == board[1][1]
	    && board[1][1] == board[2][0]) {
	        winner = board[1][1]; //Diagonal R-L
	        break;
	    }
    }

    boardFull = true; //Assume it is full so we can then check if it isn't
    for (let i=0; i<board.length; i++) {
    	for (let j=0; j<board.length; j++) {
    		if (board[i][j] == 0) {
    			boardFull = false;
    		}
    	}
    }

    if (boardFull) {
    	ctx.clearRect(75, 60, 300, 50);
    	ctx.fillText("It's a Tie!", c.width/2, startGridH-18-40);
    }
    if (winner != 0) {
	    ctx.clearRect(75, 60, 300, 50);
	    ctx.fillText("Player "+winner+" won!", c.width/2, startGridH-18-40);
    }
}



// MAIN PROGRAM //
//
var c = document.getElementById("myCanvas");
c.height = 600;
c.width = 460;
var ctx = c.getContext("2d");

// 
ctx.strokeStyle = "#E4E6EB";
ctx.fillStyle = "#E4E6EB";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Main Menu Image
var imgMainMenu = "";
var imgTopButtons = "";
setTimeout(() => {
	imgMainMenu = document.getElementById("imgMainMenu");
	imgTopButtons = document.getElementById("imgTopButtons");
	ctx.drawImage(imgMainMenu, 0, 0, c.width+2, c.height);
}, 200);


// 
var gridHeight = 450;
var gridWidth = 450;
var startGridH = c.height - gridHeight - 10;
ctx.font = "36px sans-serif";

//
var board = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
]
var boardCO = [ //[startX, endX, startY, endY]
[[11,159,150,293], [168,307,150,290], [315,462,147,291]],
[[11,159,305,446], [168,310,306,445], [319,463,306,443]],
[[12,160,454,602], [167,307,453,600], [318,465,453,601]]
]


//
var gamemode = "menu";
var playerTurn = "Player X";
var winner = 0;
var boardFull = false;
var e = {clientX:0, clientY:0};

//
c.addEventListener("mousedown", (ev) => {
	e = {
		clientX: ev.clientX - (window.innerWidth-c.width)/2,
		clientY: ev.clientY
	};

	console.log(e.clientX, e.clientY);

	// Menu
	if (gamemode == "menu") {
		ctx.drawImage(imgMainMenu, 0, 0, c.width+2, c.height);

		// Two Player Option
		if (e.clientX >= 126 && e.clientX <= 368 &&
			e.clientY >= 220 && e.clientY <= 274) {
			gamemode = "twoPlayers";
			ctx.clearRect(0, 0, c.width, c.height);
			playSetUp();
		}
		// Basic AI Option
		else if (e.clientX >= 158 && e.clientX <= 332 &&
			     e.clientY >= 330 && e.clientY <= 387) {
			gamemode = "basicAI";
			ctx.clearRect(0, 0, c.width, c.height);
			playSetUp();
		}
	}

	// Two Players
	else if (gamemode == "twoPlayers") {
		if (e.clientX >= 15 && e.clientX <= 155 && //Main Menu Button
			e.clientY >= 13 && e.clientY <= 44) {
			gamemode = "menu"
		    ctx.drawImage(imgMainMenu, 0, 0, c.width+2, c.height);
		    board = [[0,0,0],[0,0,0],[0,0,0]];
		}
		else if (e.clientX >= 362 && e.clientX <= 463 && //Restart Button
				 e.clientY >= 12 && e.clientY <= 44) {
			board = [[0,0,0],[0,0,0],[0,0,0]];
			ctx.clearRect(0, 0, c.width, c.height);
			playSetUp();
		}
		for (let i=0; i<board.length; i++) {
			for (let j=0; j<board.length; j++) {
				let slot = boardCO[i][j]
				if (board[i][j] == 0) {
					if (e.clientX >= slot[0] && e.clientX <= slot[1] &&
						e.clientY >= slot[2] && e.clientY <= slot[3]) {
						c.style.cursor = "default";
						drawXO(i, j);
					}
				}
			}
		}
	}

	//Basic AI
	else if (gamemode == "basicAI") {
		if (e.clientX >= 15 && e.clientX <= 155 && //Main Menu Button
			e.clientY >= 13 && e.clientY <= 44) {
			gamemode = "menu"
		    ctx.drawImage(imgMainMenu, 0, 0, c.width+2, c.height);
		    board = [[0,0,0],[0,0,0],[0,0,0]];
		}
		else if (e.clientX >= 362 && e.clientX <= 463 && //Restart Button
				 e.clientY >= 12 && e.clientY <= 44) {
			board = [[0,0,0],[0,0,0],[0,0,0]];
			ctx.clearRect(0, 0, c.width, c.height);
			playSetUp();
		}

		if (playerTurn == "Player X") {
			for (let i=0; i<board.length; i++) { //Let player draw X
				for (let j=0; j<board.length; j++) {
					let slot = boardCO[i][j]
					if (board[i][j] == 0) {
						if (e.clientX >= slot[0] && e.clientX <= slot[1] &&
							e.clientY >= slot[2] && e.clientY <= slot[3]) {
							c.style.cursor = "default";
							drawXO(i, j);
						}
					}
				}
			}
		}

		setTimeout(() => {
		if (playerTurn == "Player O" && boardFull == false && winner == 0) {
			let computerChoice = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
			while (board[computerChoice[0]][computerChoice[1]] != 0) {
				computerChoice = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
			}
			drawXO(computerChoice[0], computerChoice[1]);
		} 
		}, 1000);

	}
});

//
c.addEventListener("mousemove", (ev) => {
	e = {
		clientX: ev.clientX - (window.innerWidth-c.width)/2,
		clientY: ev.clientY
	};

	if (gamemode == "menu") {
		if (e.clientX >= 126 && e.clientX <= 368 &&
			e.clientY >= 220 && e.clientY <= 274) {
			c.style.cursor = "pointer";
		} 
		else if (e.clientX >= 158 && e.clientX <= 332 &&
			     e.clientY >= 330 && e.clientY <= 387) {
			c.style.cursor = "pointer";
		}
		else {
			c.style.cursor = "default";
		}
	}

	else if (gamemode == "twoPlayers" || gamemode == "basicAI") {
		let boardSlot = -1;
		for (let i=0; i<board.length; i++) {
			for (let j=0; j<board.length; j++) {
				let slot = boardCO[i][j]
				if (e.clientX >= slot[0] && e.clientX <= slot[1] &&
					e.clientY >= slot[2] && e.clientY <= slot[3]) {
					boardSlot = board[i][j];
				}
			}
		}

		if (e.clientX >= 15 && e.clientX <= 155 && //Main Menu Button
			e.clientY >= 13 && e.clientY <= 44) {
			c.style.cursor = "pointer";
		} 
		else if (e.clientX >= 362 && e.clientX <= 463 && //Restart Button
				 e.clientY >= 12 && e.clientY <= 44) {
			c.style.cursor = "pointer";
		}
		else if (winner != 0) { //if someone won
			c.style.cursor = "default";
		}
		else if (boardSlot == 0) { //if slot is empty
			c.style.cursor = "pointer";
		} 
		else {
			c.style.cursor = "default"; 
		}
	}
})