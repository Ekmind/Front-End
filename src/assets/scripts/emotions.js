CY.loader()
   .licenseKey("01edb44ef69dda1600fe7dc0577770e331d2ce351f64")
   .addModule(CY.modules().FACE_AGE.name)
   .addModule(CY.modules().FACE_GENDER.name)
   .addModule(CY.modules().FACE_EMOTION.name)
   .load()
   .then(({ start, stop }) => start());
const age_div = document.querySelector("#age");
const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");
window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
 age_div.innerHTML = 'Age: ' + evt.detail.output.numericAge;
});
window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
 gen_div.innerHTML = 'Gender: ' + evt.detail.output.mostConfident;
});
window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
   emo_div.innerHTML = 'Emotion: ' + evt.detail.output.dominantEmotion;
  
  const emotions = evt.detail.output.emotion;
  const labels = [];
  const data = [];
    
  Object.keys(emotions).forEach(k => {
        labels.push(k);
        data.push(parseInt((emotions[k] * 100).toFixed(0)));
      });
  });