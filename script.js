import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')

emotionRadios.addEventListener('change', highlightCheckedOption)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){

  const radios = document.getElementsByClassName('radio')

  for (let radio of radios){
    radio.classList.remove('highlight')
  }

  document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
  memeModal.style.display = 'none'
}

function renderCat() {
  const catObject = getSingleCatObject()
  memeModalInner.innerHTML = `
  <img
  class="cat-img"
  src="/images/${catObject.image}"
  alt="${catObject.alt}"
  >`
  memeModal.style.display = 'flex'
  isVisible()
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray()
  if(catsArray.length === 1){
    return catsArray[0]
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomNumber]
  }
}

function getMatchingCatsArray(){

  if(document.querySelector('input[type="radio"]:checked')){
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
    const isGif = gifsOnlyOption.checked

      const matchingCatsArray = catsData.filter(function(cat){
        if (isGif) {
          return cat.isGif && cat.emotionTags.includes(selectedEmotion)
        } else {
          return cat.emotionTags.includes(selectedEmotion)
        }
      })
    return matchingCatsArray
  }
}

function isVisible() {
  document.removeEventListener('click', closeModal)
  setTimeout(function(){
    if (memeModal.style.display === 'flex'){
      document.addEventListener('click', closeModal)
    }
  }, 1)
}

function renderEmotionsRadios(cats){
  const emotions = getEmotionsArray(cats)
  let radioItems = ``
  for (let emotion of emotions){
    radioItems += `
    <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
        >
    </div>
    `
  }
  emotionRadios.innerHTML = radioItems
}

function getEmotionsArray(cats){
  const emotionsArray = []
  for (let cat of cats){
    for (let emotion of cat.emotionTags){
      if(!emotionsArray.includes(emotion)){
        emotionsArray.push(emotion)
      }
    }
  }
  return emotionsArray
}

renderEmotionsRadios(catsData)
