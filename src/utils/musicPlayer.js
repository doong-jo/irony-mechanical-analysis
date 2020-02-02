import Songs from "../constants/songs";
import { NLP_EMOTION } from "../constants/string";
import { requestGoogleNlpApi } from "../utils/googleApi";
import sceneController from "../utils/sceneController";
import { getEmotion } from "../utils/emotionAnalyzer";

class MusicPlayer {
  constructor() {
    this.sentencesHand = 0;
    this.songIndex = 0;
    this.emotionsOfSongs = {};
    this.subtitleDispatcher = null;
  }

  setSubTitleDispatcher(dispatcher) {
    this.subtitleDispatcher = dispatcher;
  }

  flattenSentences({ sentences }) {
    return sentences.map(({ content }) => `${content}. `).join("");
  }

  async researchEmotion(songIndex) {
    const { name } = Songs[songIndex];
    if (this.emotionsOfSongs[name]) {
      return;
    }

    const { sentences } = await requestGoogleNlpApi(
      this.flattenSentences(Songs[songIndex]),
      NLP_EMOTION
    );
    this.emotionsOfSongs[name] = sentences;
  }

  playIntervalCallback() {
    this.sentencesHand++;
    this.playInterval(this.songIndex);
  }

  playInterval(songIndex) {
    this.songIndex = songIndex;

    const { name, sentences } = Songs[songIndex];
    if (this.sentencesHand === sentences.length) {
      return;
    }

    const { content, length } = sentences[this.sentencesHand];
    const { score } = this.emotionsOfSongs[name][this.sentencesHand];
    const emotion = getEmotion(score);
    sceneController.setPage(emotion);
    this.subtitleDispatcher(content);

    console.log(score);
    console.log("emotion", emotion);
    console.log(name, content);

    setTimeout(() => {
      this.playIntervalCallback();
    }, length);
  }

  async play(songIndex = 0) {
    this.sentencesHand = 0;
    await this.researchEmotion(songIndex);
    this.playInterval(songIndex);
  }
}

const musicPlayer = new MusicPlayer();

export default musicPlayer;
