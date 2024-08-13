import Button from '@/components/Button';
import Column from '@/containers/dashboard/id/column/Column';
import useColumnList from '@/hooks/useColumnList';
import { useCreateModalStore } from '@/stores/modalStore';
import { useRouter } from 'next/router';

import styles from './index.module.scss';
import CreateModal from './modals/CreateModal';
import { DragDropContext } from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';
import { onDragEnd } from '@/services/dragService';

import DashboardLayout from '@/containers/dashboardLayout';
import { useTheme } from '@/hooks/useThemeContext';
import Spinner from '@/components/Spinner';
import { useEffect } from 'react';
import useToast from '@/hooks/useToast';
import useDashboardMember from '@/hooks/useDashboardMember';
import { useUserStore } from '@/store/useUserStore';

function DashboardId() {
  const { theme } = useTheme();
  const { toast } = useToast();

  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { isModalOpen, setOpenModal } = useCreateModalStore();
  const { columnList, isLoading, error } = useColumnList(id);

  // 에러나면 다시 mydashboard로
  useEffect(() => {
    if (error) {
      router.push('/mydashboard');
      toast('error', '대시보드 로딩에 실패했습니다.');
    }
  }, [isLoading, error, id]);

  // 로딩일 경우 스피너
  if (isLoading)
    return (
      <DashboardLayout>
        <div className={`${styles['loading']} ${styles[theme]}`}>
          <Spinner />
        </div>
      </DashboardLayout>
    );

  const handleDragEnd = (result: any) => {
    onDragEnd(result, queryClient);
  };

  return (
    <DashboardLayout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className={`${styles['main-section']} ${styles[theme]}`}>
          <>
            {columnList.map((column: IColumn) => {
              return (
                <Column id={column.id} title={column.title} key={column.id} />
              );
            })}
          </>
          <div className={styles['etc-wrapper']}>
            <Button buttonType='add-column' onClick={setOpenModal}>
              새로운 컬럼 추가하기
            </Button>
            {isModalOpen && <CreateModal id={id} />}
          </div>
        </section>
      </DragDropContext>
    </DashboardLayout>
  );
}

export default DashboardId;
