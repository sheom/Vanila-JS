//Game Vars
var level = 0;
var vPower = 1
var totalScore = 0;
var answerWeightage = [0,0,5,10,20,30,50,80];

//Level vars
var levelInfo =[];
var levelWord = '';
var jumbledWord ='';
var userAnswer = '';
var timeLimit = 0;
var timeLeft = 0;
var targetScore = 0;
var levelScore = 0;
var foundWords = [];
var pos = 0;
var countDown;
//GUI elements
const gameIntro_el = document.getElementById("gameIntro");
const startGame_el = document.getElementById("startGame");

const gameOver_el = document.getElementById("gameOver");
const btnReplay_el = document.getElementById("btnReplay");
const gameOverLevel_el = document.getElementById("gameOverLevel");
const gameOverLevelScore_el = document.getElementById("gameOverLevelScore");
const gameOverTotalScore_el = document.getElementById("gameOverTotalScore");

const levelIntro_el = document.getElementById("levelIntro");
const mLevelScore_el = document.getElementById("mLevelScore");
const mTotalScore_el = document.getElementById("mTotalScore");

const level_el = document.getElementById("level");
const btnNextLevel_el = document.getElementById("btnNextLevel");
const totalScore_el = document.getElementById("totalScore");
const targetScore_el = document.getElementById("targetScore");
const levelScore_el = document.getElementById("levelScore");
const timeLimit_el = document.getElementById("timeLimit");
//
const foundWords_el = document.getElementById("foundWords");
const answerContainer_el = document.getElementById("answer_container");
///
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");



////////////////////////////////////////Utility Functions////////////////////////////////
const doMyPower= (baseNumber, exponent)=> {
    if (baseNumber == 0){
        return (0);
    }else{
        return (Math.pow(baseNumber, exponent));
    }
}

const setPower = ()=>{
    vPower = 0.25 + level * 0.25;

    if (vPower > 0.95)
    {
        vPower = 0.95;
    }
    //console.log("vPower:"+vPower)
}


//////////////////////////////////////////////////////////////////////////////////////////////////

const checkLevelStatus = ()=>{
    if(levelScore >= targetScore ){
        //console.log("Level Completed:")
        mLevelScore_el.innerText = levelScore+timeLeft;
        totalScore += levelScore+timeLeft;
        mTotalScore_el.innerText = totalScore; 
        levelIntro_el.style.display = 'block';
    }
}
const charClick= ()=>{
    event.target.style.display = "none";
    let drop = document.getElementById("drop-char"+pos);
    drop.innerHTML = event.target.innerHTML;
    userAnswer += event.target.innerHTML
    pos++;
}

const makeOptions = ()=>{
    checkLevelStatus();

    let drop_char ='';
    let word_char = '';
    userAnswer ='';
    pos =0;

    for (let i = 0; i<jumbledWord.length; i++){
         drop_char += '<div class="drop-char" id="drop-char'+i+'"></div>';
         word_char += '<div class="click-char" id="click-char'+i+'" onclick = charClick()>'+jumbledWord[i]+'</div>';
    }
    fillup.innerHTML = drop_char;
    jumble_word.innerHTML = word_char
}

const onSubmit = ()=>{
    if(userAnswer.length<3){
        alert("Please make a three letter word, and click submit");
        return false;
    }
    //console.log("Submit Clicked: "+userAnswer);
    let match =0;
    for (i = 0; i < foundWords.length; i++){
        if (foundWords[i] == userAnswer){
            match = 2;
            alert("You have already identified this word.");
            makeOptions();
            return false;
        }
    }
    
    let dictString = '';
    if(userAnswer.length == 8 ){
        dictString = "aEight" + userAnswer[0] + "Dictionary";
    }else{
        dictString = "a" + userAnswer[0] + userAnswer[1]+ "Dictionary"
    }

    //console.log("dictToUse: "+dictString);
    let dictToUse = eval(dictString);


    for (let i = 0; i<dictToUse.length; i++){
        if (dictToUse[i] == userAnswer){
                match = 1;
                console.log("Found");
                break;           
        }
    }

    //console.log("Match String: "+match);

    if(match == 0 ){
        alert( userAnswer.toUpperCase() +" is not in my dictionary.");
    }else if(match ==1){
        foundWords.push(userAnswer);
        levelScore  += Number(answerWeightage[userAnswer.length-1]);
        matchFound();
    }
   

}

const matchFound = () =>{

    let items='';
    foundWords.map((words)=>{
        items +=words +'<br/>';
    })
    foundWords_el.innerHTML = items;
    levelScore_el.innerText = levelScore;
    makeOptions();
}

///////////////////////////////////////////////////////////////////////////////////////////////
const resetLevel = ()=>{
    levelIntro_el.style.display = "none";
    gameOver_el.style.display = "none";
    levelInfo =[];
    levelWord = '';
    jumbledWord ='';
    userAnswer = '';
    timeLimit = 0;
    timeLeft = 0;
    targetScore = 0;
    levelScore = 0;
    foundWords = [];
    pos = 0;
    clearInterval(countDown);
    /////////////////////////////////////////////
    foundWords_el.innerHTML = '';
    levelScore_el.innerHTML = '';
    totalScore_el.innerHTML = totalScore;
}
const makeLevelGUI = ()=>{
    makeOptions();
    //
    countDown = setInterval(()=>{
        timeLimit_el.innerText = timeLeft;
        timeLeft--;
        if (timeLeft < 0){
            timeLeft = 0;
            clearInterval(countDown);
            gameOverLevel_el.innerText = level;
            gameOverLevelScore_el.innerText = levelScore +"/"+ targetScore;
            gameOverTotalScore_el.innerText = totalScore;
            gameOver_el.style.display = "block";

        }
    }, 1000)
    //////////////////////////////////////////////////////////////
}
//////////////////////////////////////////////////////////////////////////////////////////////
const newGame = ()=>{
    gameIntro_el.style.display = "none";
    totalScore = 0;
    level = 0;
    answerWeightage = [0,0,5,10,20,30,50,80];
    /////
    setPower();
    newLevel();
}

const newLevel = ()=>{
    level++;
    resetLevel();
    let num = Math.round(Math.random()*charDictionary.length);
    levelInfo = charDictionary[num].split("|");
    levelWord = levelInfo[0];
    //console.log("levelInfo: "+levelInfo)
    jumbledWord = levelWord.split('').sort(function(){return 0.5-Math.random()}).join('');
    console.log("levelWord: "+levelWord +" JumbledWord: "+jumbledWord)
    //
    targetScore = Math.floor(
        doMyPower(levelInfo[1], vPower) * answerWeightage[2] + 
        doMyPower(levelInfo[2], vPower) * answerWeightage[3] + 
        doMyPower(levelInfo[3], vPower) * answerWeightage[4] + 
        doMyPower(levelInfo[4], vPower) * answerWeightage[5] + 
        doMyPower(levelInfo[5], vPower) * answerWeightage[6]
        );

    let timeStartMultiple = 17;
    let timeMultiple = 0;
    if (level > 15) {
        timeMultiple = timeStartMultiple - (level - 15) * 4.000000E-001;
    }else{
        timeMultiple = timeStartMultiple + (15 - level) * 4.000000E-001;
    }

    timeLimit = Math.floor((
        doMyPower(levelInfo[1], vPower) * 7.000000E-001 + 
        doMyPower(levelInfo[2], vPower) * 7.000000E-001 + 
        doMyPower(levelInfo[3], vPower) * 8.000000E-001 + 
        doMyPower(levelInfo[4], vPower) + 
        doMyPower(levelInfo[5], vPower)
        ) * timeMultiple);

        console.log("timeLimit: "+timeLimit)
        console.log("targetScore: "+targetScore)
        
        if (timeLimit < 60){
            timeLimit = 60;
        }
        if (targetScore < 50){
            targetScore = 50;
        }
    //
    targetScore_el.innerHTML = targetScore;
    level_el.innerHTML = level;
    //console.log("levelInfo: "+levelInfo);
    timeLeft = timeLimit;
    makeLevelGUI();
}



const makeCharset = ()=>{
    return words[num];
}

const showIntro = ()=>{
    console.log("Starting the game");
    gameIntro_el.style.display = "block";
}

///////////////////////////////////////////////////////////////////////////////////////
startGame_el.onclick = newGame;
btnReplay_el.onclick = newGame;
reset.addEventListener('click' , makeOptions);
submit.onclick = onSubmit;
btnNextLevel_el.onclick = newLevel;
document.body.onload = showIntro;