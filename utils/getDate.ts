// yyyy-mm-dd 형식으로 반환하는 함수
// null일 경우 미정 반환

function getDate(dateString: string | null): string {
  if (typeof dateString == 'string') {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  return '미정';
}

export default getDate;
