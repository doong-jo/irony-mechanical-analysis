import Songs from "../constants/songs";
import { NLP_EMOTION } from "../constants/string";
import { requestGoogleNlpApi } from "../utils/googleApi";
import sceneController from "../utils/sceneController";
import { getEmotion } from "../utils/emotionAnalyzer";
import songs from "../constants/songs";

class MusicPlayer {
  constructor() {
    this.sentencesHand = 0;
    this.playTimeout = null;
    this.songIndex = 0;
    this.emotionsOfSongs = {};
    this.subtitleDispatcher = null;
    this.playIndexDispatcher = null;
  }

  setSubTitleDispatcher(dispatcher) {
    this.subtitleDispatcher = dispatcher;
  }

  setPlayIndexDispatcher(dispatcher) {
    this.playIndexDispatcher = dispatcher;
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

    let { name, sentences } = Songs[songIndex];
    if (this.sentencesHand === sentences.length) {
      this.songIndex = (this.songIndex + 1) % songs.length;
      this.play(this.songIndex);
      return;
    }

    const { content, length } = sentences[this.sentencesHand];
    const { score, magnitude } = this.emotionsOfSongs[name][this.sentencesHand];
    const emotion = getEmotion(score, magnitude);
    sceneController.setPage(emotion);
    this.subtitleDispatcher(content);

    this.playTimeout = setTimeout(() => {
      this.playIntervalCallback();
    }, length);
  }

  async play(songIndex = 0) {
    this.sentencesHand = 0;
    await this.researchEmotion(songIndex);
    this.playInterval(songIndex);
    this.playIndexDispatcher(songIndex);
  }

  playByIndex(songIndex) {
    clearTimeout(this.playTimeout);
    this.play(songIndex);
  }
}

const musicPlayer = new MusicPlayer();

export default musicPlayer;
