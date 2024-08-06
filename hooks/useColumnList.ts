import { useQuery } from '@tanstack/react-query';
import axios from '@/services/axios';

function useColumnList(id: string | string[] | undefined) {
  const {
    data: columnList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getColumnList', id],
    queryFn: () =>
      axios
        .get(`/columns?dashboardId=${id}`)
        .then((res) => res.data)
        .then((resData) => {
          return resData.data; // 배열만 저장하는 것
        }),
  });

  return { columnList: columnList || [], isLoading, error };
}

export default useColumnList;
