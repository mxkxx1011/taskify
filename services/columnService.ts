import axios from './axios';

const deleteColumn = async (columnId: number) => {
  try {
    await axios.delete(`/columns/${columnId}`);
  } catch (e: any) {
    throw new Error(e.response.data.message);
    // 에러 발생시켜서 컴포넌트에서 에러 캐치하도록
  }
};

// 아래는 나중에 수정..
const getColumnList = async (dashboardId: string | string[] | null) => {
  const data = await axios
    .get(`/columns?dashboardId=${dashboardId}`)
    .then((res) => res.data)
    .then(
      (resData) => resData.data, // 배열만 저장하는 것
    );

  return data;
};

const putColumn = async (columnId: number, newTitle: string) => {
  const formData = {
    title: newTitle,
  };

  const res = await axios.put(`/columns/${columnId}`, formData);
  return res;
};

export { deleteColumn, getColumnList, putColumn };
