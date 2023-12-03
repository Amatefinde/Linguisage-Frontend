export default function cleanText(text) {
  text = text.toLowerCase();
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  return text;
}
