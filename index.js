//load boards from file or manually
//sudoku pattern string and their solution
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

  var timer;
  var timerRemaining;
  var lives=3;
  var selectedNum;
  var selectedTile;
  var disableSelect;
  var display = document.getElementById("timer");

  window.onload=function()
  {
    //run startgame function when clicked
    id("start-btn").addEventListener("click",startGame);

    //add event listener to add numbers
    for(let i=0;i<id("number-container").children.length;i++)
    {
        id("number-container").children[i].addEventListener("click",function()
        {
            //if selecting is not disabled
            if(!disableSelect)
            {
                if(this.classList.contains("selected"))
                {
                    this.classList.remove("selected");
                    selectedNum=null;
                }
                else
                {
                    //deselect all other numbers
                    for(let i=0;i<9;i++)
                    {
                        id("number-container").children[i].classList.remove("selected");

                    }
                    this.classList.add("selected");
                    selectedNum=this;
                    updateMove();
                }
            }
        });
    }

  }

  function startGame()
  {
    //choose board difficulty
    let board;
    if(id("diff-1").checked)
    board=easy[0];
    else if(id("diff-2").checked)
    board=medium[0];
    else
    board=hard[0];

    //set lives to 3 and enable selecting numbers tile
    lives=3;
    disableSelect=false;
    id("lives").textContent="Lives Remaining: 3";

    //creates board based on difficulty

    generateBoard(board);
    startTimer();

    if(id("theme-1").checked)
    {
        qs("body").classList.add("dark");
    }
    else
    {
        qs("body").classList.remove("dark");
    }

  }
  function id(id)
  {
    return document.getElementById(id);
  }

  function generateBoard(board)
  {
    //clear previous board
    clearPrevious();

    let idCount =0;
    for(let i=0;i<81;i++)
    {
        //create new paragraph
        let tile=document.createElement("p");
        if(board.charAt(i)!="-")
        {
            //set tiles text to correct
            tile.textContent=board.charAt(i);

        }
        else
        {
            tile.addEventListener("click",function()
            {
                if(!disableSelect)
                {
                    if(tile.classList.contains("selected"))
                    {
                        tile.classList.remove("selected");
                        selectedTile=null;
                    }
                    else
                    {
                        for(let i=0;i<81;i++)
                        {
                            qsa(".tile")[i].classList.remove("selected");

                        }
                        //add selection and update
                        tile.classList.add("selected");
                        selectedTile=tile;
                        updateMove();
                    }
                }
            });
        }
        tile.id=idCount;
        //increment for next tile
        idCount++;

        tile.classList.add("tile");

        if((tile.id > 17 && tile.id <27) || (tile.id>44 && tile.id<54))
        {
            tile.classList.add("bottomBorder");
        }
        if((tile.id+1)%9 == 3||(tile.id+1)%9 == 6)
        {
            tile.classList.add("rightBorder");
        }

        //add tile to board
        id("board").appendChild(tile);

        //starts the timer 
        startTimer();

        //show number container
        id("number-container").classList.remove("hidden");

    }
  }

  function updateMove()
  {
    //ifa tile and a number is selected
    if(selectedTile && selectedNum)
    {
        //set tile to the correct 
        selectedTile.textContent=selectedNum.textContent;

        //if the number matches the solution
        if(checkCorrect(selectedTile))
        {
            //deselect the tiles
             selectedTile.classList.remove("selected");
             selectedNum.classList.remove("selected");

             selectedNum=null;
             selectedTile=null;

             //if number is not corrrect solution
        }
        else
        {
            //disable selecting number for 1 second
             disableSelect=true;

             selectedTile.classList.add("incorrect");

             setTimeout(function()
             {
                //decrement lives
                lives--;
                if(lives===0)
                
                {
                    window.alert("Oops you have lost !!");
                    setInterval(() => {
                        
                    }, 2000);
                   location.reload();
                    
                }
                else
                {
                    id("lives").textContent="Lives Remaining: " +lives;
                    disableSelect=false;

                }
            selectedTile.classList.remove("incorrect");
            selectedTile.classList.remove("selected");
            selectedTile.classList.remove("selected");

            selectedTile.textContent="";
            selectedTile=null;
            selectedNum=null;
             },1000);
        }
    }
  }

  function endGame()
  {
    disableSelect=true;
    clearTimeout(timer);

    //dispaly win or loss
    if(lives===0)
    {
        id("lives").textContent="You Lost !!";
    }
    else if(lives!==0 )
    {
        id("lives").textContent="You Won";
    }
  }
  function checkCorrect(tile)
  {
    let solution;
    if(id("diff-1").checked)solution=easy[1];
    else if(id("diff-2").checked)solution=medium[1];
    else solution=hard[1];

    //check tiles number and solution number
    if(solution.charAt(tile.id)===tile.textContent)
    return true;
    else return false;
  }

  function startTimer()
  {
    if(id("time-1").checked) timerRemaining=180;
    else if(id("time-2").checked) timerRemaining=300;
    else timerRemaining=600;
   //set timer for first second
    id("timer").textContent=timeConversion(timerRemaining);
   
    timer=setInterval(function()
    {
        timerRemaining--;
         //set timer for every second
        if(timerRemaining==0)
        {
            
        }
        id("timer").textContent=timeConversion(timerRemaining);
    },1000) 
  }

  function timeConversion(time)
  {
    let minutes = parseInt(timer / 60, 10);
    
    if(minutes<10) minutes="0"+minutes;
    let seconds = parseInt(timer % 60, 10);
    if(seconds<10)seconds="0"+seconds;
    return minutes + ":" +seconds;
  }

  function clearPrevious()
  {
    //access all of tiles
    let tiles=qsa(".tile");

    //remove each tile
    for(let i=0;i<tiles.length;i++)
    {
        tiles[i].remove();
    }

    //if there is times clear it
    if(timer)clearTimeout(timer);
    //deselect any numbers

    for(let i=0;i<id("number-container").children.length;i++)
    {
        id("number-container").children[i].classList.remove("selected");
    }

    //clear selected var
    selectedTile =null;
    selectedNum=null;
  }

  function qs(selector)
  {
    return document.querySelector(selector);
  }

  function qsa(selector)
  {
    return document.querySelectorAll(selector);
  }