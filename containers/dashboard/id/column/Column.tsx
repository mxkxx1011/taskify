import { useQuery } from '@tanstack/react-query';
import axios from '@/services/axios';

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
import useCardList from '@/hooks/useCardList';
import classNames from 'classnames';

function Column({ id, title }: { id: number; title: string }) {
  const { cardList, isLoading, error } = useCardList(id);

  const { ManageModalId, setOpenManageModal } = useManageModalStore();
  const { setOpenModal } = useTodoCreateModalStore();

  if (isLoading) return <h2>loading</h2>;
  if (error) return <h2>error</h2>;

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
                <ChipNum num={cardList.length} />
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
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Column;
