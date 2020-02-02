import { emotions } from "../constants/object";

class SceneController {
  constructor() {
    this.pageDispatcher = null;
  }

  setPageDispatcher(dispatcher) {
    this.pageDispatcher = dispatcher;
  }

  setPage(page) {
    this.pageDispatcher(emotions[page]);
  }
}

const sceneController = new SceneController();

export default sceneController;
