import {
  ANTICIPATED,
  SUPRISE,
  HAPPY,
  CALM,
  ANGRY,
  SAD
} from "../constants/string";

export function getEmotion(score, magnitude) {
  if (score >= 0.5) {
    if (magnitude > 0.1) {
      return `${HAPPY}1`;
    } else if (magnitude > 0.2) {
      return `${HAPPY}2`;
    } else {
      return `${HAPPY}3`;
    }
  }

  if (score >= 0.3) {
    if (magnitude > 0.1) {
      return `${SUPRISE}1`;
    } else {
      return `${SUPRISE}2`;
    }
  }

  if (score > 0) {
    if (magnitude > 0.1) {
      return `${ANTICIPATED}1`;
    } else {
      return `${ANTICIPATED}2`;
    }
  }

  if (score <= -0.5) {
    if (magnitude > 0.1) {
      return `${ANGRY}1`;
    } else {
      return `${ANGRY}2`;
    }
  }

  if (score <= -0.3) {
    if (magnitude > 0.1) {
      return `${SAD}1`;
    } else {
      return `${SAD}2`;
    }
  }

  if (score <= 0) {
    if (magnitude > 0.1) {
      return `${CALM}1`;
    } else {
      return `${CALM}2`;
    }
  }
}
