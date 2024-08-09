import { IconCircleChip, IconSetting } from '@/assets/icongroup';
import ChipNum from '@/containers/dashboard/id/chips/ChipNum';
import Button from '@/components/Button';
import Card from '@/containers/dashboard/id/card/Card';
import ManageModal from '@/containers/dashboard/id/modals/ManageModal';

import {
  useManageModalStore,
  useTodoCreateModalStore,
} from '@/stores/modalStore';
import styles from './Column.module.scss';
import EmptyColumn from './EmptyColumn';
import { Droppable } from 'react-beautiful-dnd';

import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useToast from '@/hooks/useToast';

function Column({ id, title }: { id: number; title: string }) {
  const { toast } = useToast();

  const {
    data: cardList,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteScroll('card', ['getCardList', id]);

  const { ref, inView } = useInView();

  const { ManageModalId, setOpenManageModal } = useManageModalStore();
  const { setOpenModal } = useTodoCreateModalStore();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // TODO: 로딩 처리하기
  if (isLoading) return <h2>loading</h2>;
  if (error) return toast('error', error.message);
  if (!cardList) return <></>;

  return (
    <Droppable droppableId={String(id)}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            styles['column'],
            snapshot.isDraggingOver ? styles['is-dragging-over'] : null,
          )}
        >
          <div className={styles['header']}>
            <div className={styles['header-left']}>
              <IconCircleChip />
              <div className={styles['title']}>
                <p className={styles['column-title']}>{title}</p>{' '}
                <ChipNum num={totalCount} />
              </div>
            </div>
            <IconSetting
              className={styles['setting-icon']}
              onClick={() => setOpenManageModal(id)}
            />
            {ManageModalId === id && <ManageModal defaultValue={title} />}
          </div>

          <div
            className={styles['card-list']}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Button buttonType='add-todo' onClick={setOpenModal} />
            {cardList.length === 0 ? (
              <EmptyColumn />
            ) : (
              cardList.map((card: ICard) => <Card card={card} key={card.id} />)
            )}
            {provided.placeholder}
            {hasNextPage && (
              <div ref={ref} className={styles['view']}>
                .
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
