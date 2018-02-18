var canvas = document.getElementById("myCanvas"); 
var ctx = canvas.getContext("2d");
var init = false; 
var game_values = [
	['','',''],
	['','',''],
	['','',''], 
]

var pos_val = [125,300,475];

var winner = ''; 


function game(){
	// clear the frame 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// draw the grid 
	drawGrid(); 
	playerMove();
}	
var computerChance = false; 
var playerChance = true; 
var playerChoice = 'O'; 
var computerChoice = 'X'; 

function playerMove(){
	canvas.addEventListener('click',function(event){

		if(playerChance == true && winner == ''){
			var rect = canvas.getBoundingClientRect();
			var x = event.clientX - rect.left; 
			var y = event.clientY - rect.top; 
			var coords =  getCoordinates(x,y); 
			if(coords != undefined){
				coords_x = parseInt(coords.split(',')[0]); 
				coords_y = parseInt(coords.split(',')[1]); 
	

				// note that the index values are 
				// reverse of actual coordinate
				// values 
				index_x = pos_val.indexOf(coords_y, 0); 
				index_y = pos_val.indexOf(coords_x, 0); 
				

				if(game_values[index_x][index_y] == ''){
					setValue(coords_x, coords_y,playerChoice); 
					game_values[index_x][index_y] = playerChoice;
					playerChance = false; 
					computerChance = true; 
					setTimeout(computerMove, 500);  
					computerMove(); 
				} 
			} 

		}
	}); 
	
}
function computerMove(){
	if(computerChance == true && checkTie(game_values) == false && winner == ''){
		var opt_move = minmax(game_values, computerChoice); 
		console.log(opt_move); 
		console.log(game_values);
		var opt_i = opt_move.index_x; 
		var opt_j = opt_move.index_y; 

		// index is reverse of coordinates so a swap here to j and i
		setValue(pos_val[opt_j],pos_val[opt_i], computerChoice); 
		game_values[opt_i][opt_j] = computerChoice; 
		computerChance = false;
		playerChance = true; 
	}
	checkWinner(game_values, computerChoice); 
}


function drawGrid(){
	ctx.lineWidth=8; 
	ctx.strokeStyle = "#fff"; 
	ctx.lineCap="round";

	ctx.beginPath();
	ctx.moveTo(200,50);
	ctx.lineTo(200,550);
	ctx.stroke();


	ctx.beginPath();
	ctx.moveTo(400,50);
	ctx.lineTo(400,550);
	ctx.stroke();


	ctx.beginPath();
	ctx.moveTo(50,200);
	ctx.lineTo(550,200);
	ctx.stroke();



	ctx.beginPath();
	ctx.moveTo(50,400);
	ctx.lineTo(550,400);
	ctx.stroke();

}

function drawX(x, y) {
    ctx.beginPath();

    ctx.moveTo(x - 40, y - 40);
    ctx.lineTo(x + 40, y + 40);

    ctx.moveTo(x + 40, y - 40);
    ctx.lineTo(x - 40, y + 40);
    ctx.stroke();
}


function drawO(x,y){
	ctx.beginPath(); 
	ctx.arc(x,y,40,0,2*Math.PI);
	ctx.stroke();
}


function setValue(x,y,ch){
	if(ch == 'X'){
		drawX(x,y); 
	}else{
		drawO(x,y); 
	}
}




// converts the index values into coordinates for canvas sketch
function getCoordinates(x,y){
		// ROW 1 
		if((x >= 50 && x < 200) && (y >= 50 && y < 200)){
			return (pos_val[0] + ',' + pos_val[0]); 
		}
		else if((x >= 200 && x < 350) && (y >= 50 && y < 200)){
			return (pos_val[1] + ',' + pos_val[0]); 
		}


		else if((x >= 350 && x < 500) && (y >= 50 && y < 200)){
			return (pos_val[2] + ',' + pos_val[0]); 
		}


		// ROW 2 
		else if((x >= 50 && x < 200) && (y >= 200 && y < 350)){
			return (pos_val[0] + ',' + pos_val[1]); 
		}


		else if((x >= 200 && x < 350) && (y >= 200 && y < 350)){
			return (pos_val[1] + ',' + pos_val[1]); 

		}


		else if((x >= 350 && x < 500) && (y >= 200 && y < 350)){
			return (pos_val[2] + ',' + pos_val[1]); 

		}

		// ROW 3
		else if((x >= 50 && x < 200) && (y >= 350 && y < 500)){
			return (pos_val[0] + ',' + pos_val[2]); 
		}


		else if((x >= 200 && x < 350) && (y >= 350 && y < 500)){
			return (pos_val[1] + ',' + pos_val[2]); 
		}


		else if((x >= 350 && x < 500) && (y >= 350 && y < 500)){
			return (pos_val[2] + ',' + pos_val[2]); 
		}
}





function checkRow(board,row){
	if(board[row][0] != '' && 
	   board[row][0] == board[row][1] &&
	   board[row][1] == board[row][2]){
	   		winner = board[row][0];
	   		return winner; 
		}
}


function checkColumn(board,col){
	if(board[0][col] != '' && 
	   board[0][col] == board[1][col] &&
	   board[1][col] == board[2][col]){
	   		winner = board[0][col]; 
	   		return winner; 
		}
}





function checkTie(){
	var bool = true;  
	for(var k = 0; k < 3; k++){
		for(var j = 0; j < 3; j++){
			if(game_values[k][j] == ''){
				bool = false; 
			}
		}
	}

	if(bool && winner == ''){
		setTimeout(function(){ alert("TIE"); }, 500);
		setTimeout(function(){document.location.reload();}, 600);
		return true;
	}
}


function checkWinner(board,player){
	for(var i = 0; i < 3; i++){
		if(checkRow(board,i) != undefined || checkColumn(board,i) != undefined){
			setTimeout(function(){ alert(winner + " wins "); }, 500);
			setTimeout(function(){document.location.reload();}, 600);
			return true; 
		}
	}

	// Diagonal top left to bottom right
	if(board[0][0] != ''){
		if(board[0][0] == board[1][1] &&
		   board[1][1] == board[2][2]){
			winner = board[0][0]; 
			createCross(pos_val[0], pos_val[0], pos_val[2], pos_val[2],'dl'); 
			setTimeout(function(){ alert(winner + " wins! "); }, 500);
			setTimeout(function(){document.location.reload();}, 800);
			return true; 

		}
	}

	// Diagonal top right to bottom left 
	if(board[0][2] != ''){
		if(board[0][2] == board[1][1] &&
			board[1][1] == board[2][0]){
			winner = board[0][2];
			createCross(pos_val[2], pos_val[0], pos_val[0], pos_val[2],'dr'); 
			setTimeout(function(){ alert(winner + " wins! "); }, 500);
			setTimeout(function(){document.location.reload();}, 800);
			return true; 
		}
	}
	return false; 
}


function createCross(x1,y1,x2,y2,side){
		if(side == 'r'){
			ctx.beginPath();
			ctx.strokeStyle = "#FF5722"; 
			ctx.moveTo(x1-70,y1);
			ctx.lineTo(x2+70,y2);
			ctx.stroke();
		}

		if(side == 'c'){
			ctx.beginPath();
			ctx.strokeStyle = "#FF5722"; 
			ctx.moveTo(x1,y1-70);
			ctx.lineTo(x2,y2+70);
			ctx.stroke();
		}

		if(side == 'dl'){
			ctx.beginPath();
			ctx.strokeStyle = "#FF5722"; 
			ctx.moveTo(x1-70,y1-70);
			ctx.lineTo(x2+70,y2+70);
			ctx.stroke();
		}
		if(side == 'dr'){
			ctx.beginPath();
			ctx.strokeStyle = "#FF5722"; 
			ctx.moveTo(x1+70,y1-70);
			ctx.lineTo(x2-70,y2+70);
			ctx.stroke();
		}

}

function checkRow(board,row){
	if(board[row][0] != '' && 
	   board[row][0] == board[row][1] &&
	   game_values[row][1] == board[row][2]){
	   		winner = board[row][0];
	   		createCross(pos_val[0], pos_val[row], pos_val[2], pos_val[row],'r'); 
	   		return winner; 
		}
}


function checkColumn(board,col){
	if(board[0][col] != '' && 
	   board[0][col] == board[1][col] &&
	   board[1][col] == board[2][col]){
	   		winner = board[0][col];
	   		createCross(pos_val[col], pos_val[0], pos_val[col], pos_val[2],'c'); 
	   		return winner; 
		}
}


function checkTie(board){
	var bool = true;  
	for(var k = 0; k < 3; k++){
		for(var j = 0; j < 3; j++){
			if(board[k][j] == ''){
				bool = false; 
			}
		}
	}

	if(bool && winner == ''){
		setTimeout(function(){ alert("Tie: Occurs when both players play optimally"); }, 200);
		setTimeout(function(){document.location.reload();}, 500);
		return true;
	}

	return false; 
}



function getEmptyIndices(board){
	result = []


	for(var k = 0; k < 3; k++){
		for(var j = 0; j < 3; j++){
			if(board[k][j] == ''){
				result.push([k,j]); 
			}
		}
	}

	return result; 

}


function minmax_winner(board, player){
 if (
 (board[0][0] != '' && board[0][0] == player && board[0][1] == player && board[0][2] == player) || // row 1
 (board[1][0] != '' && board[1][0] == player && board[1][1] == player && board[1][2] == player) || // row 2
 (board[2][0] != '' && board[2][0] == player && board[2][1] == player && board[2][2] == player) || // row 3 
 (board[0][0] != '' && board[0][0] == player && board[1][0] == player && board[2][0] == player) || // col 1
 (board[0][1] != '' && board[0][1] == player && board[1][1] == player && board[2][1] == player) || 
 (board[0][2] != '' && board[0][2] == player && board[1][2] == player && board[2][2] == player) ||
 (board[0][0] != '' && board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
 (board[0][2] != '' && board[0][2] == player && board[1][1] == player && board[2][0] == player) 
 ) {
 return true;
 } else {
 return false;
 }
}

function minmax(board, player){


	// get empty indices for checking all possible choices 
	var available_indices = getEmptyIndices(board); 
	// conditions to terminate the recursive minmax function 
	if(minmax_winner(board, playerChoice)){
		// we give -10 score to human player 
		// Human player is the minimizer 
		return {score: -10}; 
	}

	else if(minmax_winner(board, computerChoice)){
		// we give +10 score to computer player 
		// Computer player is the maximizer 
		return {score: 10}; 
	}

	else if(available_indices.length === 0){
		// If there is no available space return 
		// It means we have tested all the conditions 
		return {score: 0}; 
	}

	var moves = []; // contains: move dictionary 
	for(var i = 0; i < available_indices.length; i++){
		var move = {}; // keys: index_x and index_y and score 


		// collect index of each move 
		move.index_x =available_indices[i][0]; 
		move.index_y =available_indices[i][1]; 

		// putting player value at available spots 
		board[move.index_x][move.index_y] = player; 
		// if the currentNode is a maximizer
		if(player === computerChoice){
			// then the child node is a minimizer 
			var result = minmax(board, playerChoice); 
			move.score = result.score; 
		}
		// if the currentNode is a minimizer 
		else{
			// then child node is a maximizer 
			var result = minmax(board,computerChoice); 
			move.score = result.score; 
		}


		// reset the the position to empty after completion 
		board[move.index_x][move.index_y] = ''; 


		// push the object to the array 
		moves.push(move);
	}


	var best_move; 
	if(player == computerChoice){
		// minus infinity for maximizer
		var best_score = -1000; 

		for(var i = 0; i < moves.length; i++){
			// change best score to new maximum 
			if(moves[i].score > best_score){
				best_score = moves[i].score;
				best_move = i; 
			}
		}
	}else if(player == playerChoice){
		// positive infinity for the minimizer 
		var best_score = 1000; 

		for(var i = 0; i < moves.length; i++){
			if(moves[i].score < best_score){
				best_score = moves[i].score;
				best_move = i; 

			}
		}
	}
	winner = ''; 

	// finally returning the best move to parent node 
	return moves[best_move]; 
}
if(init == false){
	$('#myCanvas').hide(); 
	$('#reset').hide(); 
}


$('#o').click(function() {
	playerChoice = 'O';
	computerChoice = 'X'; 
	$('#myCanvas').show(); 
	init = true; 
	game(); 
	$('#player_res').hide(); 
	$('#reset').show(); 

});



$('#x').click(function() {
	playerChoice = 'X';
	computerChoice = 'O'; 
	$('#myCanvas').show(); 
	init = true; 
	game(); 
	$('#player_res').hide(); 
	$('#reset').show(); 
});

$('#reset').click(function() {
	document.location.reload(); 
	$('#reset').hide(); 
});




