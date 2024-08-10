import axios from './axios';

const deleteColumn = async (columnId: number) => {
  try {
    await axios.delete(`/columns/${columnId}`);
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

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
