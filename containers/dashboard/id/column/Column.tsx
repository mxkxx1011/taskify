import { IconCircleChip, IconSetting } from '@/assets/icongroup';
import ChipNum from '@/containers/dashboard/id/chips/ChipNum';
import Button from '@/components/Button';
import Card from '@/containers/dashboard/id/card/Card';
import ManageModal from '@/containers/dashboard/id/modals/ManageModal';

import { useManageModalStore } from '@/stores/modalStore';
import styles from './Column.module.scss';
import EmptyColumn from './EmptyColumn';
import { Droppable } from '@hello-pangea/dnd';

import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useToast from '@/hooks/useToast';
import TodoCreateModal from '../modals/todoCreateModal/TodoCreateModal';
import useTodoCreateModalStore from '@/stores/TodoCreateModalStore';
import DeleteAlertModal from '../modals/deleteAlertModal';
import useDeleteAlertModalStore from '@/stores/useDeleteAlertModalStore';
import { useTheme } from '@/hooks/useThemeContext';

function Column({ id, title }: { id: number; title: string }) {
  const { toast } = useToast();

  const { theme } = useTheme();

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

  const { AlertModalId } = useDeleteAlertModalStore();
  const { ManageModalId, setOpenManageModal } = useManageModalStore();
  const { TodoCreateModalId, setOpenTodoCreateModal } =
    useTodoCreateModalStore();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!cardList)
    return (
      <div
        className={classNames(
          styles['column'],

          styles[theme],
        )}
      >
        <div className={styles['header']}>
          <div className={styles['header-left']}>
            <IconCircleChip className={styles['circle-chip']} />
            <div className={styles['title']}>
              <p className={styles['column-title']}>{title}</p>{' '}
              <ChipNum num={totalCount} />
            </div>
          </div>
          <IconSetting className={styles['setting-icon']} />
        </div>
        <div className={styles['card-list']}>
          <Button buttonType='add-todo' />
          <div className={styles['column-empty']}>
            <EmptyColumn />
          </div>
        </div>
      </div>
    );

  return (
    <Droppable droppableId={String(id)}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            styles['column'],
            snapshot.isDraggingOver ? styles['is-dragging-over'] : null,
            styles[theme],
          )}
        >
          <div className={styles['header']}>
            <div className={styles['header-left']}>
              <IconCircleChip className={styles['circle-chip']} />
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
            {AlertModalId === id && <DeleteAlertModal columnId={id} />}
          </div>

          <div
            className={styles['card-list']}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Button
              buttonType='add-todo'
              onClick={() => setOpenTodoCreateModal(id)}
            />
            {TodoCreateModalId == id && <TodoCreateModal columnId={id} />}

            {cardList.length === 0 ? (
              <div className={styles['column-empty']}>
                <EmptyColumn />
              </div>
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
