import { emotions } from "../constants/object";

class SceneController {
  constructor() {
    this.pageDispatcher = null;
    this.charDispatcher = null;
    this.emotionDispatcher = null;
  }

  setPageDispatcher(dispatcher) {
    this.pageDispatcher = dispatcher;
  }

  setCharDispatcher(dispatcher) {
    this.charDispatcher = dispatcher;
  }

  setEmotionDispatcher(dispatcher) {
    this.emotionDispatcher = dispatcher;
  }

  setPage(emotionName) {
    if (this.pageDispatcher && this.charDispatcher && this.emotionDispatcher) {
      const pageIndex = emotions[emotionName];

      this.pageDispatcher(pageIndex);
      // heart => test svg image
      this.charDispatcher(emotionName);
      this.emotionDispatcher(emotionName);
    }
  }
}

const sceneController = new SceneController();

export default sceneController;
