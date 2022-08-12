const emo = () => {
  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotions = evt.detail.output.emotion;
  });
}


function emotionalData() {

  sessionStorage.removeItem('emotional data');

  let emotionalArray = [];
  let saveEmotions = new Array();

  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotions = evt.detail.output.emotion;

    if (emotions) {
      emotionalArray.push(emotions);
      sessionStorage.setItem('emotional data', JSON.stringify(emotionalArray));
    }
  })


  console.log(emotionalArray);
}
