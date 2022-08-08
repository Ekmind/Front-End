const emo = () => {
  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotions = evt.detail.output.emotion;
  });
}

function emotions() {
  window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
    const emotionsList = evt.detail.output.emotion;

    alert('The function is working')
  })
}

export default { emotions };
