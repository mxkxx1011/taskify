import Button from '@/components/Button';
import Column from '@/containers/dashboard/id/column/Column';
import useColumnList from '@/hooks/useColumnList';
import {
  useCreateModalStore,
  useTodoCreateModalStore,
} from '@/stores/modalStore';
import { useRouter } from 'next/router';
import ModalPortal from '@/components/ModalPortal';
import TodoCreateModal from '@/containers/dashboard/id/modals/todoCreateModal/TodoCreateModal';

import styles from './index.module.scss';
import CreateModal from './modals/CreateModal';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQueryClient } from '@tanstack/react-query';
import { onDragEnd, onDragStart } from '@/services/dragService';

function DashboardId() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { isModalOpen, setOpenModal } = useCreateModalStore();
  const { columnList, isLoading, error } = useColumnList(id);
  const {
    isModalOpen: isTodoCreateModalOpen,
    setCloseModal: closeTodoCreateModal,
  } = useTodoCreateModalStore();

  const handleTodoCreateSubmit = (data: any) => {
    // 나중에 처리
    console.log('todo create modal submit');
    console.log(data);
    closeTodoCreateModal();
  };

  // 나중에 수정
  if (isLoading) return <h2>...loading</h2>;
  if (error) return <h2>error</h2>;

  const handleDragStart = () => {
    onDragStart();
  };

  const handleDragEnd = (result: any) => {
    onDragEnd(result, queryClient);
  };

  return (
    <DragDropContext
      // onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDragUpdate={}
    >
      <section className={styles['main-section']}>
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
        {isTodoCreateModalOpen && (
          <ModalPortal onClose={closeTodoCreateModal}>
            <TodoCreateModal
              onClose={closeTodoCreateModal}
              onSubmit={handleTodoCreateSubmit}
            />
          </ModalPortal>
        )}
      </section>
    </DragDropContext>
  );
}

export default DashboardId;
