import { emotions } from "../constants/object";

class SceneController {
  constructor() {
    this.pageDispatcher = null;
    this.charDispatcher = null;
  }

  setPageDispatcher(dispatcher) {
    this.pageDispatcher = dispatcher;
  }

  setCharDispatcher(dispatcher) {
    this.charDispatcher = dispatcher;
  }

  setPage(page) {
    if (this.pageDispatcher) {
      const emotion = emotions[page];

      this.pageDispatcher(emotion);
      this.charDispatcher("heart" || page);
    }
  }
}

const sceneController = new SceneController();

export default sceneController;
