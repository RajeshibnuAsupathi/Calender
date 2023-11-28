export const toAppSpecificDateString = (date) => {
    return date.toISOString().split('T')[0]
}


export function getRandomHexColor() {
    let randomColor, luminance;
  do {
    // Generate a random hex color code
    randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Calculate the relative luminance of the color
    luminance =
      (0.299 * parseInt(randomColor.slice(1, 3), 16) +
        0.587 * parseInt(randomColor.slice(3, 5), 16) +
        0.114 * parseInt(randomColor.slice(5, 7), 16)) / 255;
  } while (luminance <= 0.5);

  return randomColor;
}
