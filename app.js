import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      // If the emotion is not already in the array, add it
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      } else {
        // If the emotion is already in the array
        console.log("No duplicates");
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);

  //   Loop through the emotions array
  for (let emotion of emotions) {
    // Create a radio button for each emotion
    radioItems += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input 
        type="radio" 
        id="${emotion}" 
        name="emotion" 
        value="${emotion}">
    </div>
    `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);

// Get the checked radio button
emotionRadios.addEventListener("change", highlightSelectedEmotion);
function highlightSelectedEmotion(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    // Remove the highlight class from each radio
    radio.classList.remove("highlight");
  }
  //   Add the highlight class to the selected radio
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

getImageBtn.addEventListener("click", getMatchingCatsArray);
function getMatchingCatsArray() {
  // Check if a radio button is selected
  if (document.querySelector('input[type="radio"]:checked')) {
    // Get the selected emotion value
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    console.log(selectedEmotion);
  } else {
    alert("Please select an emotion");
    return;
  }
}
