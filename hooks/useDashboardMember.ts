import { useQuery } from '@tanstack/react-query';
import axios from '@/services/axios';

function useDashboardMember(dashboardId: number) {
  const SIZE = 20;

  const {
    data: dashboardMemberList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getDashboardMember', dashboardId],
    queryFn: async () =>
      await axios
        .get(`/members?page=1&size=${SIZE}&dashboardId=${dashboardId}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data.members);
          return data.members;
        }),
    enabled: !!dashboardId,
  });

  return { dashboardMemberList: dashboardMemberList || [], isLoading, error };
}

export default useDashboardMember;
