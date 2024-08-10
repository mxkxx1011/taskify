function getRandomTagColor(content: string, cardId?: number) {
  const colors = ['violet', 'pink', 'green', 'orange', 'blue'];
  const combinedString = cardId?.toString() + content;

  let hash = 0;

  // 문자열의 해시 값을 생성합니다.
  for (let i = 0; i < combinedString.length; i++) {
    hash = (hash << 5) - hash + combinedString.charCodeAt(i);
    hash = hash & hash; // 32비트 정수로 변환
  }

  console.log('hash');
  console.log(hash);
  // 해시 값을 색상의 배열 인덱스로 변환합니다.
  const colorIndex = Math.abs(hash) % colors.length;
  console.log('color');
  console.log(colorIndex);
  return colors[colorIndex];
}

export default getRandomTagColor;
