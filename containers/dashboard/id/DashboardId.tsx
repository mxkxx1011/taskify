import Button from '@/components/Button';
import Column from '@/containers/dashboard/id/column/Column';
import useColumnList from '@/hooks/useColumnList';
import { useCreateModalStore } from '@/stores/modalStore';
import { useRouter } from 'next/router';

import styles from './index.module.scss';
import CreateModal from './modals/CreateModal';

function DashboardId() {
  const router = useRouter();
  const { id } = router.query;

  const { isModalOpen, setOpenModal } = useCreateModalStore();
  const { columnList, isLoading, error } = useColumnList(id);

  if (isLoading) return <h2>...loading</h2>;
  if (error) return <h2>error</h2>;

  return (
    <section className={styles['main-section']}>
      <>
        {columnList.map((column: IColumn) => {
          return <Column id={column.id} title={column.title} key={column.id} />;
        })}
      </>
      <div className={styles['etc-wrapper']}>
        <Button buttonType='add-column' onClick={setOpenModal}>
          새로운 컬럼 추가하기
        </Button>
        {isModalOpen && <CreateModal id={id} />}
      </div>
    </section>
  );
}

export default DashboardId;

//
