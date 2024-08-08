import axios from './axios';

export const putCard = async (cardId: number, desColumnId: number) => {
  const formData = {
    columnId: desColumnId,
  };
  const response = await axios.put(`/cards/${cardId}`, formData);
  return response.data;
};
