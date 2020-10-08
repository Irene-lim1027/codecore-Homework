

const names = process.argv.slice(2);

const TOP_LINE = 'top_line';
const MIDDLE_LINE = 'middle_line';
const BOTTOM_LINE = 'bottom_line';

let isFirstLineDraw = false;
function getLongestName(names) {
  let longestLength = 0;
  for (let name of names) {
    if (name.length > longestLength) longestLength = name.length;
  }
  return longestLength;
}
function createPadding(spaces) {
  let result = '';
  for (let i = 0; i < spaces; i++) {
    result += ' ';
  }
  return result;
}
function drawLine(lineType, length) {
  let horizontalLine = '';
  for (let i = 0; i < length + 2; i++) {
    horizontalLine = horizontalLine + '━';
  }
  if (lineType === TOP_LINE) {
    console.log(`┏${horizontalLine}┓`);
  } else if (lineType === MIDDLE_LINE) {
    console.log(`┣${horizontalLine}┫`);
  } else if (lineType === BOTTOM_LINE) {
    console.log(`┗${horizontalLine}┛`);
  } else {
    console.log('ERROR: Invalid Line Type: ', lineType);
  }
}
function drawName(name, maxLength) {
  const padding = createPadding(maxLength - name.length + 1);
  const result = `┃ ${name}${padding}┃`;
  console.log(result);
}
function drawTable(names) {
  if (names.length === 0) return;
  let lineLength = getLongestName(names);

  for (let name of names) {
    const lineTypeToDraw = isFirstLineDraw ? MIDDLE_LINE : TOP_LINE;
    drawLine(lineTypeToDraw, lineLength);
    drawName(name, lineLength);
    isFirstLineDraw = true;
  }
  drawLine(BOTTOM_LINE, lineLength);
}
drawTable(names);