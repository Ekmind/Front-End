const emo = () => {
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
        const emotions = evt.detail.output.emotion;
      });
}

export {emo};