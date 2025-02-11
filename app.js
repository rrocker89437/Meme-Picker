import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const getImageBtn = document.getElementById("get-image-btn");
const imagesContainerInner = document.getElementById("images-container-inner");
const resetImageBtn = document.getElementById("reset-btn");

emotionRadios.addEventListener("change", highlightSelectedEmotion);
getImageBtn.addEventListener("click", renderCat);

// --------------------------------------------------------------

function highlightSelectedEmotion(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    // Remove the highlight class from each radio
    radio.classList.remove("highlight");
  }
  //   Add the highlight class to the selected radio
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// --------------------------------------------------------------

resetImageBtn.addEventListener("click", resetImages);
function resetImages() {
  imagesContainerInner.innerHTML = ""; // Clear the image container
}

function renderCat() {
  console.log("Btn Clicked");
  const catObject = getSingleCatObject();

  let images = ``;
  images = `
        <img
        class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
      `;

  imagesContainerInner.innerHTML = images;
}

// --------------------------------------------------------------

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  //   If there is only one cat in the array, return it
  if (catsArray.length === 1) {
    return catsArray[0];
    // If there are more cats in the array, return a default cat
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

// --------------------------------------------------------------

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    return catsData.filter((cat) =>
      isGif
        ? cat.emotionTags.includes(selectedEmotion) && cat.isGif
        : cat.emotionTags.includes(selectedEmotion)
    );
  }
  return []; // Return an empty array if nothing is selected
}

// --------------------------------------------------------------

function getEmotionsArray(cats) {
  return [...new Set(cats.flatMap((cat) => cat.emotionTags))];
}

// --------------------------------------------------------------

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
