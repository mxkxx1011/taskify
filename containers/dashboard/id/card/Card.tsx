import Image from 'next/image';
import ChipCard from '../chips/ChipCard';
import styles from './Card.module.scss';
import { IconCalender } from '@/assets/icongroup';
import getDate from '@/utils/getDate';

import TodoModal from '../modals/todoModal/TodoModal';
import useTodoModalStore from '@/stores/todoModalStore';

function Card({ card }: { card: ICard }) {
  const { id, title, tags, dueDate, imageUrl } = card;
  const { TodoModalId, setOpenTodoModal } = useTodoModalStore();

  return (
    <>
      <div className={styles['card']} onClick={() => setOpenTodoModal(id)}>
        {imageUrl && (
          <Image src={imageUrl} alt='image' width={274} height={160} priority />
        )}
        <div className={styles['card-content']}>
          <p className={styles['title']}>{title}</p>
          <div className={styles['card-information']}>
            <div className={styles['tags']}>
              {tags.map((tag, idx) => (
                <ChipCard content={tag} color='orange' key={idx} />
              ))}
            </div>

            <div className={styles['card-bottom']}>
              <div className={styles['date']}>
                <IconCalender width={18} height={18} />
                <p>{getDate(dueDate)}</p>
              </div>
              <div className={styles['profile']}>J</div>
            </div>
          </div>
        </div>
      </div>
      {TodoModalId === id && <TodoModal card={card} />}
    </>
  );
}

export default Card;
