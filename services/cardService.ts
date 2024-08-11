import axios from './axios';

export const putCard = async (cardId: number, desColumnId: number) => {
  const formData = {
    columnId: desColumnId,
  };
  const response = await axios.put(`/cards/${cardId}`, formData);
  return response.data;
};

export const deleteCard = async (cardId: number) => {
  try {
    await axios.delete(`cards/${cardId}`);
  } catch (e: any) {
    throw new Error(e);
  }
};
