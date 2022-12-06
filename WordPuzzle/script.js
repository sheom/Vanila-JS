var words = ['cows', 'tracks', 'arrived', 'located', 'sir', 'seat',
               'division', 'effect', 'underline', 'view', 'annual',
               'anniversary', 'centennial', 'millennium', 'perennial',
               'artisan', 'apprentice', 'meteorologist', 'blizzard', 'tornado',
               'intensify','speed','count','consonant','someone',
               'sail','rolled','bear','wonder','smiled','angle', 'absent',
               'decadent', 'excellent', 'frequent', 'impatient', 'cell',
               'cytoplasm', 'organelle', 'diffusion', 'osmosis',
               'respiration'
           ];


const container = document.getElementById("container");
const fillup = document.getElementById("fillup");
const jumble_word = document.getElementById("jumble_word");

const submit = document.getElementById("submit");
const pass = document.getElementById("pass");
const reset = document.getElementById("reset");

const score_el = document.getElementById("score")
//
var selectedWord, jumbledWord, userAnswer = "";
var pos, score = 0 ;
//
const resetVars = ()=> {
    selectedWord = jumbledWord = userAnswer ="";
    pos = 0;
    score_el.innerText = score;  
}

const getRandomWord = () => {
    let num = Math.round(Math.random()*words.length);
    return words[num];
}


const wordClick= ()=>{
    event.target.style.display = "none";
    let drop = document.getElementById("drop-char"+pos);
    drop.innerHTML = event.target.innerHTML;
    userAnswer+=event.target.innerHTML
    pos++;
}

const makeWord = ()=>{
    selectedWord = getRandomWord();
    jumbledWord = selectedWord.split('').sort(function(){return 0.5-Math.random()}).join('');
}
//////////////////////////////////////////////////////////////////////////////////////////////////
submit.onclick = ()=>{
    if(userAnswer==selectedWord){
        alert("Match");
        score += selectedWord.length;
    }else{
        alert("Wrong");
        score -= selectedWord.length/4;
    }
    makeGUI();
}
pass.onclick = ()=>{
    makeGUI();
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function makeGUI(){
    resetVars(); 
    makeWord();
    score_el.innerText = score;

    len = jumbledWord.length;
    console.log(selectedWord +":"+len)

    let drop_char ='';
    let word_char = '';
    for (let i = 0; i<len; i++){
         drop_char += '<div class="drop-char" id="drop-char'+i+'"></div>';
         word_char += '<div class="click-char" id="click-char'+i+'" onclick = wordClick()>'+jumbledWord[i]+'</div>';
    }
    fillup.innerHTML = drop_char;
    jumble_word.innerHTML = word_char

}

makeGUI();
