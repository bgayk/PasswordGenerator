// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  
}

/* generatePassword will prompt the user for the password criteria and generate a password
    In the unlikely event the password does not meet the user's criteria, an error message 
    will be displayed and the user will be prompted to try again. the routine will attempt
    to generate a password 100 times before giving up and displaying an error message. */
function generatePassword() {
  // prompt user for password length
  var nbrPWDLength = prompt("How many characters would you like your password to be starting from 8 and up to 128?");
  // if length is less than 8 or greater than 128, alert user to choose a number between 8 and 128
  if (nbrPWDLength < 8 || nbrPWDLength > 128) {
    alert("Please choose a number between 8 and 128.");
    return;
  }
  
  // creating arrays for each character type: Lowercase, Uppercase, Numbers, and Special characters
 
  // creating an array of blnLowercase letters
  var arrLowercaseChars = "abcdefghijklmnopqrstuvwxyz".split("");
  // creating an array of blnUppercase letters
  var arrUppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  // creating an array of numbers
  var arrNumbers = "0123456789".split("");
  // creating an array of Special characters
  var arrSpecialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=".split("");


  // prompt user for blnLowercase, blnUppercase, blnNumeric, and blnSpecial characters
  var blnLowercase = confirm("Include Lowercase letters?");
  var blnUppercase = confirm("Include Uppercase letters?");
  var blnNumeric = confirm("Include Numbers?");
  var blnSpecial = confirm("Include the Special Characters: " + "\n   ( " + arrSpecialCharacters.join("") + "  )?");

  // if user does not choose any of the character types, alert user to choose at least one character type
  if (!blnLowercase && !blnUppercase && !blnNumeric && !blnSpecial) {
    alert("Please choose at least one character type.");
    return;
  }


  // creating an empty array to store the user's selected character types
  // the selected character types will be appended/concatenated to the arrChosenCharacters array
  var arrChosenCharacters = [];

  if (blnLowercase) {
    arrChosenCharacters = arrChosenCharacters.concat(arrLowercaseChars);
  }

  if (blnUppercase) {
    arrChosenCharacters = arrChosenCharacters.concat(arrUppercaseLetters);
  }

  if (blnNumeric) {
    arrChosenCharacters = arrChosenCharacters.concat(arrNumbers);
  }

  if (blnSpecial) {
    arrChosenCharacters = arrChosenCharacters.concat(arrSpecialCharacters);
  }

  
 // creating an empty array to store the password
 var arrPassword = [];
 var nbrAttemptCount = 0;
 // loop until the password array contains the user selected characters and result is verified
 // in the unlikely event we cannot produce the requested result, we'll stop after 100 tries
  do { 
      arrPassword = [];
      
      nbrAttemptCount++;
      if (nbrAttemptCount > 100) {
        arrPassword.push("** Error. Please try again. **");
        break;
      }

      // creating a for loop to generate a random password based on the user's selected criteria
      for (var i = 0; i < nbrPWDLength; i++) {
        var nbrRandomIndex = Math.floor(Math.random() * arrChosenCharacters.length);
        var strRandomCharacter = arrChosenCharacters[nbrRandomIndex];
        arrPassword.push(strRandomCharacter);
      }

    // verifying that the password meets the user's selected criteria
    // by confirming that the password contains at least one of each 
    // selected character type
    // the password array will be initialized if it does not meet the user's selected criteria
    //  to force the loop to run again
    if (blnLowercase) {
        var blnContainsLowercase = false;
        for (var i = 0; i < arrLowercaseChars.length; i++) {
          if (arrPassword.includes(arrLowercaseChars[i])) {
            blnContainsLowercase = true;
            break;
          }
        } 
        if (!blnContainsLowercase) {
          arrPassword = [];
        }
      }

      if (blnUppercase) {
        var blnContainsUppercase = false;
        for (var i = 0; i < arrUppercaseLetters.length; i++) {
          if (arrPassword.includes(arrUppercaseLetters[i])) {
            blnContainsUppercase = true;
            break;
          }
        }
        if (!blnContainsUppercase) {
          arrPassword = [];
        }
      }

      if (blnNumeric) {
        var blnContainsNumeric = false;
        for (var i = 0; i < arrNumbers.length; i++) {
          if (arrPassword.includes(arrNumbers[i])) {
            blnContainsNumeric = true;
            break;
          }
        }
        if (!blnContainsNumeric) {
          arrPassword = [];
        }
      }

      if (blnSpecial) {
        var blnContainsSpecial = false;
        for (var i = 0; i < arrSpecialCharacters.length; i++) {
          if (arrPassword.includes(arrSpecialCharacters[i])) {
            blnContainsSpecial = true;
            break;
          }
        }
        if (!blnContainsSpecial) {
          arrPassword = [];
        }
      }
  } while (arrPassword.length != nbrPWDLength);

  console.log(" Password Length Req: " + nbrPWDLength + "\n" +
              "       UpperCase Req: " + blnUppercase + "\n" +
              "       LowerCase Req: " + blnLowercase + "\n" + 
              "         Numeric Req: " + blnNumeric   + "\n" +
              "         Special Req: " + blnSpecial  + "\n" +
              "       Attempt Count: " + nbrAttemptCount + "\n" + 
              "Resulting Pwd Length: " + arrPassword.length                          
              );

  console.log();
  // return the array arrPassword as a string
  return arrPassword.join(""); 
}









// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
