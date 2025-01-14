import styles from './EditMember.module.scss';
import MemberListItem from './MemberListItem/MemberListItem';
import instance from '@/services/axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '@/components/Pagination';
import { useTheme } from '@/hooks/useThemeContext';
import Spinner from '@/components/Spinner';

function EditMember({ id }: { id: string | string[] | undefined }) {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const themeStyle = styles[`${theme}`];

  const fetchDashboardMember = async (id: string | string[] | undefined) => {
    const response = await instance.get(
      `/members?page=${page}&size=5&dashboardId=${id}`,
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['dashboardMember', id, page],
    queryFn: () => fetchDashboardMember(id),
    enabled: !!id,
  });

  const { totalPage, handleNextPage, handlePreviousPage } = usePagination(
    data,
    page,
    setPage,
    'members',
  );
  if (isLoading)
    return (
      <div className={`${styles['container']} ${themeStyle}`}>
        <Spinner />
      </div>
    );

  return (
    <div className={`${styles['container']} ${themeStyle}`}>
      <div className={styles['section-header']}>
        <h2 className={styles['section-header-title']}>구성원</h2>
        <Pagination
          page={page}
          totalPage={totalPage}
          onNext={handleNextPage}
          onPrev={handlePreviousPage}
        />
      </div>
      <div className={styles['member-list']}>
        <p className={styles['member-list-header-title']}>이름</p>
        {//타입정리 필요
        data?.members.map((item: any) => (
          <MemberListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default EditMember;
