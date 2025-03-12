let words = [
    "Enlightenment",
    "sovereignty",
    "marx",
    //unit 1
    "Renaissance", "Secular", "Urban", "Rural", "Economics", "Florence", "Medici", "Papacy", "Castiglione", "Papal", "Machiavelli", "Humanism", "Petrarch", "Mirandola", "Guttenberg", "Giotto", "Masaccio", "DaVinci", "Raphael", "Michelangelo", "Ferdinand", "Isabella", "Hapsburg", "Wyclif", "Hus",
    //unit 2
    "More", "Indulgence", "Martin", "Sacraments", "Justification", "Pope", "Tetzel", "Theses", "Charles", "Lutheranism", "Peasants", "Priesthood", "Ecclesiastical", "Henry", "Act", "Edward", "Mary", "Tudor", "John", "Predestination", "Jesuits", "Bartholomew", "Edict", "Philip", "Elizabeth", "Armada",
    //unit 3
    "Geocentric", "Heliocentric", "Copernicus", "Brahe", "Kepler", "Galileo", "Newton", "Midwives", "Descartes", "Scientific", "Bacon", "Natural",
    //unit 4
    "Bohemian", "Ferdinand", "Danish", "Swedish", "Peace", "Absolutism", "LouisXIV", "Richelieu", "Fronde", "Versailles", "Colbert", "Succession", "Austrian", "Leopold", "Ivan", "Romanov", "Peter",
    //unit 5
    "Skepticism", "Natural", "Relativism", "Locke", "Newtonian", "Montesquieu", "Voltaire", "Deism", "Diderot", "Phisiocrats", "Laissez", "Smith", "Rousseau", "Woman", "Wollstonecraft", "Salons", "Rococo", "Neoclassicism", "Bach", "Handel", "Classical", "Mozart", "Popular", "Realschule", "Pogroms",
    //unit 6
    "Estates", "General", "Bourgeoisie", "Taille", "Oath", "Bastille", "Assembly", "Declaration", "Constitution", "Sans-cullottes", "Jacobins", "Convention", "Girondins", "Committee", "Robespierre", "Reign", "Thermidorean", "Napoleon", "Concordat", "Code", "Continental", "Nationalism",
    //IR
    "Agricultural", "Industrialization", "Capital", "Entrepreneurs", "Shuttle", "Jenny", "Water", "Mule", "Power", "Rocket", "Factory", "Exhibition", "Crystal", "Tariffs", "Stock", "Banks", "Continental", "Liability", "Labor", "Census", "Famine", "Emigrants", "Urbanization", "Tenements", "Commission", "Cholera", "Artisans", "Unions", "Combination", "Luddites",
    //Period 3
    "Quadruple", "Congress", "Metternich", "Legitimacy", "Balance", "Conservatism", "Burke", "Concert", "Intervention", "Tories", "Whigs", "Corn", "Peterloo", "Germanic", "Decembrists", "Liberalism", "Economic", "Political", "Nationalism", "Self-Determination", "Socialism", "July", "Philippe", "French", "Frankfurt", "Romanticism", "Gothic",
    "Realpolitik", "Anarchism", "Emigration", "Kulturkampf","Louis", "Napoleon", "Ottoman", "Empire", "Crimean", "War", "Piedmont", "Garibaldi", "Count", "Cavour", "King", "William", "Bismarck", "Second", "German", "Empire", "Tsar", "Alexander", "Queen", "Victoria", "Gladstone", "Proletariat", "Karl", "Marx", "Engels", "International", "Working", "Association", "Darwin", "Realism",
    //WWI
    "Serbia", "Black", "Hand", "Blank", "Check","Ultimatum", "Mobilization", "Schlieffen", "Trench", "Warfare", "Western", "Front", "Eastern", "Hindenburg", "Ludendorff", "Central", "Powers", "Allied", "U-Boats", "Unrestricted", "Submarine", "Lusitania", "Zeppelins", "Nationalization", "Clemenceau", "David", "Lloyd", "George", "Provisional", "Government", "Soviets", "Mensheviks", "Bolsheviks", "Lenin", "April", "Theses", "Trotsky", "November", "Revolution", "Treaty", "Brest-Litovsk", "Russian", "Communism", "Terror", "Generation",
    "Hyperinflation", "USSR", "Fascism", "Keynes", "Totalitarianism", "Propaganda", "Mussolini", "Fascio", "Hitler", "Hindenburg", "Weimar", "Nazi", "Mein", "SA", "Beer", "Lebensraum", "Chancellor", "Goring", "Reichstag", "Enabling", "Knight", "Nuremberg", "SS", "Himmler","Nuremberg", "Kristallnacht", "Stalin", "Trotsky", "General", "Politburo", "Agricultural", "Purges", "Spanish", "Goebbels",
    //Cold War
    "Diplomatic", "Appeasement", "Rhineland", "Chamberlain", "Sudetenland", "Munich", "Pact", "Blitzkrieg", "Marshall", "Churchill", "Luftwaffe", "Battle", "Mediterranean", "Grand", "Axis", "Stalingrad", "Coral", "Midway", "Eisenhower", "D-Day", "Roosevelt", "Truman", "Hiroshima", "Himmler", "Final", "Einsatzgruppen", "Death", "Great", "Red", "Mother", "Yalta", "United", "Potsdam", "Iron",
    "Buffer", "Containment", "Marshall", "NATO", "Warsaw", "Korean", "Mao", "ICBM", "Sputnik", "Khrushchev", "Berlin", "Cuban", "Vietnam", "Domino", "Détente", "Israel", "Gandhi", "Chiang", "Destalinization", "Hungarian", "Prague", "Gaulle", "European", "Welfare", "Baby",
    "Yeltsin", "Putin", "Czechoslovakia", "Berlin", "Solidarity", "Ethnic", "EU", "Euro", "Gulf", "Al-Qaeda", "Taliban", "Chernobyl", "Russian", "Radicalization", "Fundamentalism", "Digital", "Multinational", "Globalization", "Global", "Climate", "Developed"
//done!
  ];
  let container = document.querySelector(".container");
  let winScreen = document.querySelector(".win-screen");
  let inputCount, successCount, tryCount, inputRow;
  let randomWord, finalWord;
  
  window.addEventListener("beforeunload", (e) => {
  // Check if the game is in progress
  if (gameStarted) {
    // Cancel the unload event
    e.preventDefault();
    // Prompt the user with a message
    e.returnValue = "Are you sure you want to leave? Your progress will be lost.";
  }
});

  //Detect touch device
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };
  
  //Get random word
  const getRandom = () =>
    words[Math.floor(Math.random() * words.length)].toUpperCase();
  
  //Initial Setup
  const startGame = async () => {
    winScreen.classList.add("hide");
    container.innerHTML = "";
    inputCount = 0;
    successCount = 0;
    tryCount = 0;
    finalWord = "";
  
    randomWord = getRandom();
  
    //Creating the grid
    for (let i = 0; i < 6; i++) {
      let inputGroup = document.createElement("div");
      inputGroup.classList.add("input-group");
      for (let j = 0; j < randomWord.length; j++) {
        //Disabled by default. We will enable one by one
        inputGroup.innerHTML += `<input type="text" class="input-box" onkeyup="checker(event)" maxlength="1" disabled>`;
      }
      await container.appendChild(inputGroup);
    }
    inputRow = document.querySelectorAll(".input-group");
    updateDivConfig(inputRow[tryCount].firstChild, false);
    
    console.log(randomWord);
  };
  
  //Update input to disabled status and set focus
  const updateDivConfig = (element, disabledStatus) => {
    element.disabled = disabledStatus;
    if (!disabledStatus) {
      element.focus();
    }
  };
  
  //Logic for writing in the inputs
 //Logic for writing in the inputs
  const checker = async (e) => {
  let value = e.target.value.toUpperCase();
  //disable current input box
  //updateDivConfig(e.target, true);
  if (value.length <= 2) {
    //if the word is less than or equal to the length of the random word and the button isn't backspace
    if (inputCount < randomWord.length && e.key != "Backspace" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
      //Attach the letter to the final word
      finalWord += value;
     // if (inputCount < randomWord.length - 1) {
        //enable next
        updateDivConfig(e.target.nextSibling, false);
      //}
      inputCount++;
    } else if (e.key == "Backspace") {
      //If the user presses backspace and there are letters to delete
      if (finalWord.length >= 0) {
        // get the index of the input box with focus
        const inputIndex = Array.from(inputRow[tryCount].querySelectorAll(".input-box")).indexOf(e.target);
        // remove the character at that index from the finalWord string
        finalWord = finalWord.slice(0, inputIndex) + finalWord.slice(inputIndex + 1);
        //enable previous and decrement count
        if (!e.target.previousSibling.disabled)
        updateDivConfig(e.target.previousSibling, false);
        inputCount--;
      } 
    }
else if (e.key === "ArrowRight") {
  // move to next input box
  if (e.target.nextSibling) {
    updateDivConfig(e.target.nextSibling, false);
    e.target.nextSibling.focus();
  }
} /*else if (e.key === "ArrowLeft") {
  // move to previous input box
  if (e.target.previousSibling) {
    updateDivConfig(e.target.previousSibling, false);
    e.target.previousSibling.focus();
  }
}*/


    //if the word is too long
    if (inputCount > randomWord.length) {
      //delete the last letter and show a small window
      finalWord = finalWord.substring(0, finalWord.length - 1);
      inputCount--;
      const tooLong = document.createElement("div");
      tooLong.classList.add("too-long");
      container.appendChild(tooLong);
      setTimeout(() => {
        tooLong.remove();
      }, 1000);
    }
  } else if (value.length == 0 && e.key == "Backspace") {
    //Empty input box and user presses Backspace
    if (finalWord.length > 0) {
      finalWord = finalWord.substring(0, finalWord.length - 1);
    }
    if (inputCount == 0) {
      //For first inputbox
      updateDivConfig(e.target, false);
      return false;
    }
    updateDivConfig(e.target, true);
    e.target.previousSibling.value = "";
    //enable previous and decrement count
    updateDivConfig(e.target.previousSibling, false);
    inputCount--;
  } else {
    // if the value length is not equal to 1 (i.e. the user has entered something other than a letter) ignore it
    return false;
  }
};

//When user presses enter/backspace and all the inputs are filled
window.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    validateWord();
  }
});
;
    
    //Comparison Logic
    const validateWord = async () => {
      if (isTouchDevice()) {
        submitButton.classList.add("hide");
      }
      let failed = false;
      //Get all input boxes of current row
      let currentInputs = inputRow[tryCount].querySelectorAll(".input-box");
      //Check if it is a valid english word
      /*await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${finalWord}`
      ).then((response) => {
        if (response.status == "404") {
          console.clear();
          alert("Please Enter Valid Word");
          failed = true;
        }
      });
    */
      //If not then stop here
      if (failed) {
        return false;
      }
      //Initially set these
      let successCount = 0;
      let successLetters = "";
      //Checks for both words
      for (let i in randomWord) {
        //if same then green
        if (finalWord[i] == randomWord[i]) {
          currentInputs[i].classList.add("correct");
          successCount += 1;
          successLetters += randomWord[i];
        } else if (
          randomWord.includes(finalWord[i]) &&
          !successLetters.includes(finalWord[i])
        ) {
          //If the letter exist in the chosen word and is not present in the success array then yellow
          currentInputs[i].classList.add("exists");
        } else {
          currentInputs[i].classList.add("incorrect");
        }
      }
      //Increment try count
      tryCount += 1;
      //If all letters are correct
      if (successCount == randomWord.length) {
        //Display the win banner after 1 second
        setTimeout(() => {
          winScreen.classList.remove("hide");
          winScreen.innerHTML = `
            <span>Total guesses: ${tryCount}</span>
            <span>Answer: "${randomWord}"<span>
            <button onclick="startGame()">New Game</button>
            `;
        }, 1000);
      } else {
        //unsuccessful so next attempt
        inputCount = 0;
        finalWord = "";
        if (tryCount == 6) {
          //all attempts wrong
          tryCount = 0;
          winScreen.classList.remove("hide");
          winScreen.innerHTML = ` <span>You lose :(</span>
          <span>Answer: "${randomWord}"<span>
          <span>       <span>
            <button onclick="startGame()">New Game</button>`;
          return false;
        }
        //for next attempt move to first child of next row
        updateDivConfig(inputRow[tryCount].firstChild, false);
      }
      inputCount = 0;
    };
    
    window.onload = startGame();
    
