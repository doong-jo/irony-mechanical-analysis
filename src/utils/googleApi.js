import { NLP_EMOTION, NLP_ENTITY } from "../constants/string";

const { REACT_APP_GOOGLE_API_SERVER_URL } = process.env;

const emotionApiUrl = text =>
  `${REACT_APP_GOOGLE_API_SERVER_URL}/api/gcp-lang/emotion?text=${text}`;
const entityApiUrl = text =>
  `${REACT_APP_GOOGLE_API_SERVER_URL}/api/gcp-lang/entity?text=${text}`;

console.log(REACT_APP_GOOGLE_API_SERVER_URL);

export async function requestGoogleNlpApi(text, mode) {
  let response;

  switch (mode) {
    case NLP_EMOTION:
      response = await fetch(emotionApiUrl(text));
      break;

    case NLP_ENTITY:
      response = await fetch(entityApiUrl(text));
      break;

    default:
      return;
  }

  const json = await response.json();
  return json;
}
