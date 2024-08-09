function getBackgroundColor(nickname: string) {
  const len = nickname.length;
  const etc = len % 7;

  // 적당한 파스텔톤 넣었습니다..~
  if (etc === 0) {
    return '#FDD446';
  } else if (etc === 1) {
    return '#A3C4A2';
  } else if (etc === 2) {
    return '#FFC85A';
  } else if (etc === 3) {
    return '#9DD7ED';
  } else if (etc === 4) {
    return '#C4B1A2';
  } else if (etc === 5) {
    return '#F4D7DA';
  } else if (etc === 6) {
    return '#5534DA';
  }
}

export default getBackgroundColor;
