import {
  ANTICIPATED,
  SUPRISE,
  HAPPY,
  CALM,
  ANGRY,
  SAD
} from "../constants/string";

export function getEmotion(score) {
  if (score >= 0.5) {
    return HAPPY;
  }

  if (score >= 0.3) {
    return SUPRISE;
  }

  if (score > 0) {
    return ANTICIPATED;
  }

  if (score <= -0.5) {
    return ANGRY;
  }

  if (score <= -0.3) {
    return SAD;
  }

  if (score <= 0) {
    return CALM;
  }
}
