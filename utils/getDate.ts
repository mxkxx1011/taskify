// yyyy-mm-dd 형식으로 반환하는 함수
// null일 경우 미정 반환

function getDate(dateString: string | null, time?: boolean): string {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff); // 한국 시간 구하기

  let formattedDate;
  if (typeof dateString == 'string') {
    const year = korNow.getFullYear();
    const month = String(korNow.getMonth() + 1).padStart(2, '0');
    const day = String(korNow.getDate()).padStart(2, '0');

    formattedDate = `${year}-${month}-${day}`;

    if (time) {
      const hours = String(korNow.getHours()).padStart(2, '0');
      const minutes = String(korNow.getMinutes()).padStart(2, '0');
      formattedDate += ` ${hours}:${minutes}`;
    }
    return formattedDate;
  }

  return '미정';
}

export default getDate;
