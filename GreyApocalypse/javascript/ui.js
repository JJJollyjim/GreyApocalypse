var getColour = function (value) {
	var brightness = value + 127;
	return 'rgb(' + brightness + ',' + brightness + ',' + brightness + ')';
}

var drawUI = function () {
	ctx.fillStyle = 'rgb(127,127,127)';
	ctx.fillRect(0, 0, 320, 320);
	if (!env.loaded) {
		return;
	}
	for (var i = 0; i < 10; ++i) {
		for (var j = 0; j < 10; ++j) {
			var currentValue = env.gameState[i][j];
			var colour = getColour(currentValue);
			ctx.fillStyle = colour;
			ctx.fillRect(i*30 + 10, j*30 + 10, 30, 30);
		}
	}
	ctx.lineWidth = 5;
	// player 1
	ctx.strokeStyle = 'white';
	ctx.strokeRect(env.program1.x*30 + 10, env.program1.y*30 + 10, 30, 30);
	// player 2
	ctx.strokeStyle = 'black';
	ctx.strokeRect(env.program2.x*30 + 10, env.program2.y*30 + 10, 30, 30);

	if (env.stage == 1) {
		$('#progressBar1').attr('value', env.stepCount);
		$('#progressBar2').attr('value', 0);
		$('#progressBarTotal').attr('value', env.stepCount);
		highlightTableColoumn(2);
	} else {
		$('#progressBar1').attr('value', env.maxStepCount);
		$('#progressBar2').attr('value', env.stepCount);
		$('#progressBarTotal').attr('value', env.stepCount + env.maxStepCount);
		highlightTableColoumn(3);
	}
	if (gameState != 1 && gameState != 2) {
		// Game not running
		highlightTableColoumn(1000); // Remove highlight
	}
	var formatScore = function (score) {
		//var score = env.stage == 1 ? score : -score;
		//var player = score > 0 ? 1 : 2;
		return '' + (score < 0 ? -score : score);
	};
	$('#gameSum1').html(formatScore(env.sum[0]));
	$('#gameSum2').html(formatScore(-env.sum[1]));
	$('#gameSumTotal').html(formatScore(env.sum[0] - env.sum[1]));
	$('#winner1').html(env.sum[0]>0?'Program 1':env.sum[0]==0?'Tie':'Program 2');
	$('#winner2').html((-env.sum[1])>0?'Program 1':(-env.sum[1])==0?'Tie':'Program 2');
	$('#winnerTotal').html((env.sum[0]-env.sum[1])>0?'Program 1':(env.sum[0]-env.sum[1])==0?'Tie':'Program 2');
}

var rows = null;
var highlightTableColoumn = function (index) {
	if (!rows) {
		rows = $('table tr');
	}
	rows.children().removeClass('currentRoundHighlight');
	rows.find(':nth-child(' + index + ')').addClass('currentRoundHighlight');
}

// -1: stopped (first run)
// 0: stopped (reset)
// 1: running
// 2: paused
// 3: game over
var gameState = 0;
var onLoadFunction = function () {
	// Used to set game state, also updates all controls
	var setGameState = function (state) {
		gameState = state;
		switch (state) {
			case -1: // game stopped (first run)
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').attr('disabled', 'disabled');
				$('#resetButton').attr('disabled', 'disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
			case 0: // game stopped
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').attr('disabled', 'disabled');
				$('#resetButton').attr('disabled', 'disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
			case 1: // running
				$('#startButton').attr('disabled', 'disabled');
				$('#pauseButton').removeAttr('disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').attr('disabled', 'disabled');
				$('#p1textarea').attr('disabled', 'disabled');
				$('#p2textarea').attr('disabled', 'disabled');
				$('#roundLength').attr('disabled', 'disabled');
			break;
			case 2: // paused
				$('#startButton').removeAttr('disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').removeAttr('disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').attr('disabled', 'disabled');
				$('#p1textarea').attr('disabled', 'disabled');
				$('#p2textarea').attr('disabled', 'disabled');
				$('#roundLength').attr('disabled', 'disabled');
			break;
			case 3: // game over
				$('#startButton').attr('disabled', 'disabled');
				$('#pauseButton').attr('disabled', 'disabled');
				$('#stepButton').attr('disabled', 'disabled');
				$('#restartButton').removeAttr('disabled');
				$('#resetButton').removeAttr('disabled');
				$('#validateButton').removeAttr('disabled');
				$('#p1textarea').removeAttr('disabled');
				$('#p2textarea').removeAttr('disabled');
				$('#roundLength').removeAttr('disabled');
			break;
		}
	};
	var stepOnce = function () {
		if (step()) {
			drawUI();
			var winnerMessage = "Game over! ";
			var winnerProgram = (env.sum[0]-env.sum[1])>0?1:(env.sum[0]-env.sum[1])==0?0:2;
			if (winnerProgram == 0) {
				winnerMessage += 'It\' a draw! ';
			} else {
				winnerMessage += 'Player ' + winnerProgram + ' won the game! ';
			}
			alert(winnerMessage);
			setGameState(3); // game over
		} else {
			drawUI();
		}
	};
	var loadProgramsFromTextArea = function () {
		var p1 = $('#p1textarea').val();
		var p2 = $('#p2textarea').val();
		localStorage.program1 = p1;
		localStorage.program2 = p2;
		if (!validateProgramsAndShowErrors()) {
			return false;
		}
		initPrograms(p1, p2);
		env.maxStepCount = parseInt($('#roundLength>option:selected').text());
		$('#progressBar1').attr('max', env.maxStepCount);
		$('#progressBar2').attr('max', env.maxStepCount);
		$('#progressBarTotal').attr('max', env.maxStepCount * 2);
		return true;
	};
	$('#stepButton').click(stepOnce);
	$('#startButton').click(function () {
		var programErrors = false;
		if (gameState == -1 || gameState == 0 || gameState == 3) { 
			// if game is stopped or if game is over
			// Game has already ended, load programs and start
			programErrors = !loadProgramsFromTextArea();
		}
		if (!programErrors) {
			setGameState(1);
		}
	});
	$('#pauseButton').click(function () { setGameState(2); });
	$('#validateButton').click(function () { 
		if (validateProgramsAndShowErrors()) { 
			alert('No errors found!'); 
		}
	});
	$('#restartButton').click(function () {
		loadProgramsFromTextArea();
		setGameState(1);
	});
	$('#resetButton').click(function () {
		initPrograms('.', '.');
		setGameState(0);
		drawUI();
	});
	var infiniteRunLoop = function () {
		if (gameState == 1) { // running
			stepOnce();
		}
		var delay = 50 - $('#speedSlider').val();
		setTimeout(infiniteRunLoop, delay);
	};
	
	// Pressing the tab key inserts two spaces
	// from http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
	$(document).delegate('textarea', 'keydown', function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 9) {
			e.preventDefault();
			var start = $(this).get(0).selectionStart;
			var end = $(this).get(0).selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			$(this).val($(this).val().substring(0, start)
						+ "  "
						+ $(this).val().substring(end));

			// put caret at right position again
			$(this).get(0).selectionStart =
			$(this).get(0).selectionEnd = start + 2;
		}
	});
	
	// Code to initialise the game
	var initialiseGame = function () {
		window.ctx = document.getElementById('gameStateCanvas').getContext('2d');
		infiniteRunLoop();
		setGameState(-1); // stopped
		drawUI(ctx);
		if (localStorage.program1)
			$('#p1textarea').val(localStorage.program1);
		if (localStorage.program2)
			$('#p2textarea').val(localStorage.program2);
		};
	initialiseGame();
};