// yyyy-mm-dd 형식으로 반환하는 함수
// null일 경우 미정 반환

function getDate(dateString: string | null, time?: boolean): string {
  if (typeof dateString == 'string') {
    const now = new Date(dateString);

    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    // const now = new Date(now.getTime() + koreaTimeDiff); // 한국 시간 구하기

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;

    if (time) {
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      formattedDate += ` ${hours}:${minutes}`;
    }
    return formattedDate;
  }

  return '미정';
}

export default getDate;
