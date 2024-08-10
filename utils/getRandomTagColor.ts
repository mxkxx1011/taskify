function getRandomTagColor(content: string, cardId?: number) {
  const colors = ['violet', 'pink', 'green', 'orange', 'blue'];
  const combinedString = cardId?.toString() + content;

  let hash = 0;

  for (let i = 0; i < combinedString.length; i++) {
    hash = (hash << 5) - hash + combinedString.charCodeAt(i);
    hash = hash & hash;
  }

  const colorIndex = Math.abs(hash) % colors.length;

  return colors[colorIndex];
}

export default getRandomTagColor;
