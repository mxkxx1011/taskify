import { useQuery } from '@tanstack/react-query';
import axios from '@/services/axios';

function useCardList(columnId: number) {
  const {
    data: cardList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getCardList', columnId],
    queryFn: () =>
      axios
        .get(`/cards?size=10&columnId=${columnId}`)
        .then((res) => res.data)
        .then((data) => data.cards),
  });

  return { cardList: cardList || [], isLoading, error };
}

export default useCardList;
