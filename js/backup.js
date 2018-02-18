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
		// setTimeout(function(){ alert("TIE"); }, 500);
		// setTimeout(function(){document.location.reload();}, 600);
		return true;
	}
}



function checkWinner(){
	for(var i = 0; i < 3; i++){
		if(checkRow(i) != undefined || checkColumn(i) != undefined){
			// setTimeout(function(){ alert(winner + " wins "); }, 500);
			// setTimeout(function(){document.location.reload();}, 600);
			return true; 
		}
	}
	        


	// Diagonal top left to bottom right
	if(game_values[0][0] != ''){
		if(game_values[0][0] == game_values[1][1] &&
		   game_values[1][1] == game_values[2][2]){
			winner = game_values[0][0]; 
			// setTimeout(function(){ alert(winner + " wins "); }, 500);
			// setTimeout(function(){document.location.reload();}, 600);
			return true; 

		}
	}

	// Diagonal top right to bottom left 
	if(game_values[0][2] != ''){
		if(game_values[0][2] == game_values[1][1] &&
			game_values[1][1] == game_values[2][0]){
			winner = game_values[0][2];
			// setTimeout(function(){ alert(winner + " wins "); }, 500);
			// setTimeout(function(){document.location.reload();}, 600);
			return true; 
		}
	}

	checkTie(); 
}


function checkRow(row){
	if(game_values[row][0] != '' && 
	   game_values[row][0] == game_values[row][1] &&
	   game_values[row][1] == game_values[row][2]){
	   		winner = game_values[row][0];
	   		return winner; 
		}
}


function checkColumn(col){
	if(game_values[0][col] != '' && 
	   game_values[0][col] == game_values[1][col] &&
	   game_values[1][col] == game_values[2][col]){
	   		winner = game_values[0][col]; 
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
		// setTimeout(function(){ alert("TIE"); }, 500);
		// setTimeout(function(){document.location.reload();}, 600);
		return true;
	}
}