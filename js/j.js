var minesweeper = new MineSweeper();

function MineSweeper()
{
	this.start_minesweeperGame = start_minesweeperGame;
	this.restartGame     = restartGame;
	this.onDivClicked    = onDivClicked;
	this.timerStart      = timerStart;
    this.gameInstruction = gameInstruction;
	this.pop_close= pop_close;

			
	var Level_ROWS = 10;
	var Level_COLS = 10;
	
	function start_minesweeperGame()
	{
	
		$('.wrapper').hide();
		createDynamicBoard(Level_ROWS, Level_COLS);
		timerStart();
    $('#button_div').show();
    $('#score_count').show();
    $('#timer').show();

	}

    function createDynamicBoard(rowsCount, colsCount) 
	{
		$('#board').html(''); 
		var boardElement = $('#board');
       
    for (var i = 0; i < rowsCount; i++) 
		  {
			  var mainDivRow = $('<div>');
			  mainDivRow.addClass('row');


		for (var j = 0; j < colsCount; j++) 
			{
				var mainDivCol = $('<div>');
				mainDivCol.addClass('col hidden');
				mainDivCol.attr('id', i+"-"+j);
				mainDivCol.attr('onClick', 'minesweeper.onDivClicked(this)');

				if (Math.random() < 0.1) 
				{
					 mainDivCol.addClass('mine');
	      }

				mainDivRow.append(mainDivCol);
			}

			boardElement.append(mainDivRow);
    }
  }
     
	function onDivClicked(element)
	{
		var id = element.id;
		var row = id.split("-")[0]
		var col = id.split("-")[1]
		console.log(row,col);

		if($("#"+element.id).hasClass("mine"))
		{
			gameOver(false);
		}
		else
		{
			safePlayer(row, col);

			isPlayerWin();
		}
	}
	
	function isPlayerWin()
	{
		var saferBlockCount = $('.col.hidden').length;
		var totalmineBlockCount = $('.col.mine').length;


		if(saferBlockCount == totalmineBlockCount)
		{
			console.log("Game WIN");
			gameOver(true);
		}
	}

    function restartGame()
    {
      createBoard(Level_ROWS,Level_COLS);
    }
      
    function gameOver(isWin)
    {
      var message = "";
        
		  if(isWin)
        {
			     message = 'You Win\n Congru.....';
				 $('#bg_Layer_win').show();
				
        }
        else
        { 
			    message = 'You Lost.. \nsry plz try again';
				
        }
		$('#bg_Layer_loss').show();
		  var boombImage = $('<img>');
		  boombImage.attr('src','./img/over.PNG');
		  boombImage.css({'height':'25px','width':'25px'});
      	  setTimeout(restartGame,5000);

		
		$('.col.mine').append(boombImage);
    $('.col.hidden').removeClass('hidden');
		// alert(message); //Need To add popUp here
       
    }


    var count = 0;
    function safePlayer(rows, colms) 
	  {   
		  var clickedCell =  $("#"+rows+"-"+colms);
				
		  if (!clickedCell.hasClass('hidden') || clickedCell.hasClass('mine'))
		    {
		    	return;
		    }
	  
      clickedCell.removeClass('hidden');
      
		  count ++;
		  $('#score_count').text('Score:'+count);
		
    }

	var time_left = 10;
	function timerStart()
	{
		var timeDisplay = $('timer_Display');
		setInterval(() => {
			time_left -= 1;
			$('#timer_Display').val('Time Left'+time_left);
		}, 1000);
		// for(var i ;i<200;i++)
		// {
		// 	$('#timer').text(i);
		// 	if(i == 200)
		// 	{
		// 		gameOver(false);
		// 	}
		// }
		// //Timer Code here
	}

  function gameInstruction()
  {
    location.reload('.wrapper');
  }

  function pop_close()
  {
	$('#bg_Layer_win').hide();
	$('#bg_Layer_loss').hide();
	$('#lost_id').hide();
	$('#win_id').hide();
	$('.upper_Layer').hide();

  }

}


