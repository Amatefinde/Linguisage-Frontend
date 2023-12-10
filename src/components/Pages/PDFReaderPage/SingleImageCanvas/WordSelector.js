import WordService from "../../../../services/WordService";

export default class WordSelector {
  constructor(
    canvas,
    pageObj,
    scale,
    setCurrentWord,
    setCurrentContext,
    setModalActive,
  ) {
    this.ctx = canvas.getContext("2d");
    this.pageObj = pageObj;
    this.canvas = canvas;
    this.listen();
    this.scale = scale;
    this.setCurrentWord = setCurrentWord;
    this.setModalActive = setModalActive;
    this.setCurrentContext = setCurrentContext;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.width && this.height) {
      const words = this.findInterception(this.currentSelection, true);
      if (words.length) {
        this.setModalActive(true);
        this.setCurrentWord(words);
        this.setCurrentContext(this.pageObj.text_info.words);
      }
    }
  }

  mouseDownHandler(e) {
    this.width = undefined;
    this.height = undefined;
    this.mouseDown = true;
    this.ctx.beginPath();
    const rect = e.target.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const rect = e.target.getBoundingClientRect();
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
      this.currentSelection = {
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
      };
      this.findInterception(this.currentSelection);
    }
  }

  draw(x, y, w, h) {
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#5280DB";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
  }

  word2obj({ start, end, top, bottom }) {
    const x = start * this.scale;
    const width = (end - start) * this.scale;
    const y = top * this.scale;
    const height = (bottom - top) * this.scale;
    return { x, y, width, height };
  }

  drawWord(wordObj) {
    const { x, y, width, height } = wordObj;
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "rgba(96,140,225,0.7)";
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();

    this.ctx.fillStyle = "rgba(82,128,219,0.25)";
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fill();
  }

  findInterception(currentSelection, returnFoundWords = false, threshold = 75) {
    if (returnFoundWords) {
      const matchedWord = [];
      for (let word of this.pageObj.text_info.words) {
        const wordObj = this.word2obj(word);
        if (calculateOverlapPercentage(currentSelection, wordObj) > threshold) {
          this.drawWord(wordObj);
          matchedWord.push(word);
        }
      }
      return matchedWord;
    } else {
      for (let word of this.pageObj.text_info.words) {
        const wordObj = this.word2obj(word);
        if (calculateOverlapPercentage(currentSelection, wordObj) > threshold) {
          this.drawWord(wordObj);
        }
      }
    }
  }
}

function calculateOverlapPercentage(rectangle1, rectangle2) {
  // Коррекция отрицательных значений ширины и высоты
  if (rectangle1.width < 0) {
    rectangle1.x = rectangle1.x + rectangle1.width;
    rectangle1.width = Math.abs(rectangle1.width);
  }
  if (rectangle1.height < 0) {
    rectangle1.y = rectangle1.y + rectangle1.height;
    rectangle1.height = Math.abs(rectangle1.height);
  }

  if (rectangle2.width < 0) {
    rectangle2.x = rectangle2.x + rectangle2.width;
    rectangle2.width = Math.abs(rectangle2.width);
  }
  if (rectangle2.height < 0) {
    rectangle2.y = rectangle2.y + rectangle2.height;
    rectangle2.height = Math.abs(rectangle2.height);
  }

  // Проверка наличия пересечения между прямоугольниками
  if (
    rectangle2.x >= rectangle1.x + rectangle1.width ||
    rectangle2.x + rectangle2.width <= rectangle1.x ||
    rectangle2.y >= rectangle1.y + rectangle1.height ||
    rectangle2.y + rectangle2.height <= rectangle1.y
  ) {
    // Прямоугольники не пересекаются
    return 0;
  }

  // Вычисление области пересечения
  const intersectionX = Math.max(rectangle1.x, rectangle2.x);
  const intersectionY = Math.max(rectangle1.y, rectangle2.y);
  const intersectionWidth =
    Math.min(rectangle1.x + rectangle1.width, rectangle2.x + rectangle2.width) -
    intersectionX;
  const intersectionHeight =
    Math.min(
      rectangle1.y + rectangle1.height,
      rectangle2.y + rectangle2.height,
    ) - intersectionY;

  // Вычисление площадей прямоугольников
  const areaRectangle1 = rectangle1.width * rectangle1.height;
  const areaRectangle2 = rectangle2.width * rectangle2.height;
  const areaIntersection = intersectionWidth * intersectionHeight;

  // Вычисление процента площади второго прямоугольника внутри первого
  const percentageOverlap = (areaIntersection / areaRectangle2) * 100;

  return percentageOverlap;
}
