let score = (JSON.parse(localStorage.getItem('score'))) || 
     {   
        wins : 0, 
        losses : 0,
        tie : 0
      };


      updateScore();

      let isAutoPlaying = false;
      let intervalId;

    function autoPlay(){
      if(!isAutoPlaying){
       intervalId = setInterval(function(){
          const computeRmove = pickedcomputermove();
        playResult(computeRmove);
        },1000);
        isAutoPlaying = true;
      }
      else{
        clearInterval(intervalId);
        isAutoPlaying = false;
      }

    }

    // eventListerners implementation

    document.querySelector('.rock-button').addEventListener('click',() => {playResult('Rock')});

    document.querySelector('.paper-button').addEventListener('click',() => {playResult('Paper')});

    document.querySelector('.scissors-button').addEventListener('click',() => {playResult('Scissors')});

    document.querySelector('.js-reset').addEventListener('click',()=>{
      score.wins = 0;
      score.losses = 0;
      score.tie = 0;
      updateScore();
      localStorage.removeItem('score');
    });

    document.querySelector('.css-auto-play').addEventListener('click',()=>{autoPlay();});

    document.body.addEventListener('keydown',(event)=>{
      if(event.key === 'r'){
        playResult('Rock');
      }
      else if(event.key === 'p'){
        playResult('Paper');
      }
      else if(event.key === 's'){
        playResult('Scissors');
      }
    });



    function playResult(playerMove){

      const computerMove =  pickedcomputermove();
      //console.log(computerMove);

      let result = '';

      if (playerMove === 'Scissors'){
        if(computerMove === 'Scissors'){
          result = 'Tie.';
        }
        else if(computerMove === 'Rock'){
          result = 'You lose :(';
        }
        else{
          result = 'You win :)';
        }
      }

       else if (playerMove === 'Paper'){
        if(computerMove === 'Paper'){
          result = 'Tie.';
        }
        else if(computerMove === 'Rock'){
          result = 'You win :)';
        }
        else{
          result = 'You lose :(';
        }
      }

      else{
        if(computerMove === 'Rock'){
          result = 'Tie.';
        }
        else if(computerMove === 'Paper'){
          result = 'You lose :(';
        }
        else{
          result = 'You win :)';
        }
      }

      if(result === 'You win :)'){
        score.wins++;
      }
      else if(result === 'You lose :('){
        score.losses++;
      }
      else if(result === 'Tie.'){
        score.tie++;
      }

      localStorage.setItem('score',JSON.stringify(score));
      
      updateScore();
   
      document.querySelector('.display-result').innerHTML = result;

      document.querySelector('.display-moves').innerHTML = `You
    <img src="${playerMove}-emoji.png" class="game-icon">
    <img src="${computerMove}-emoji.png" class="game-icon">
    Computer`;

    }

    function updateScore(){
      document.querySelector('.display-score')
      .innerHTML =`Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.tie}`;
    }


            /*computer's move(choice)*/

    function pickedcomputermove(){
      const randomNumber2 = Math.random();

      let computerMove = '';

      if(randomNumber2 > 0  &&  randomNumber2 <= 1/3){
        computerMove = 'Rock';
      }else if(randomNumber2 >1/3  &&  randomNumber2 <=2/3){
        computerMove = 'Paper';
      }else{
        computerMove = 'Scissors';
      }
      return computerMove;
    }