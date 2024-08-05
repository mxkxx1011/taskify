import { useQuery } from '@tanstack/react-query';
import axios from '@/services/axios';

function useCommentList(id: number) {
  const SIZE = 5;

  const {
    data: commentList,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`getCommentList${id}`],
    queryFn: async () =>
      await axios
        .get(`/comments?size${SIZE}&cardId=${id}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data.comments);
          return data.comments;
        }),
  });

  return { commentList: commentList || [], isLoading, error };
}

export default useCommentList;
