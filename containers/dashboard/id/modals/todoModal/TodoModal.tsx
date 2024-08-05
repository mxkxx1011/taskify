import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './TodoModal.module.scss';
import { IconKebab, IconClose } from '@/assets/icongroup';

import ModalPortal from '@/components/ModalPortal';
import ChipCard from '@/containers/dashboard/id/chips/ChipCard';
import ChipProgress from '@/containers/dashboard/id/chips/ChipProgress';
import KebabDropdown from '@/containers/dashboard/id/dropdown/kebabDropdown/KebabDropdown';
import ManagerCard from './managerCard/ManagerCard';
import Comment from './Comment';

import useColumnList from '@/hooks/useColumnList';
import useCommentList from '@/hooks/useCommentList';
import useTodoModalStore from '@/stores/todoModalStore';

export default function TodoModal({ card }: { card: ICard }) {
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);
  const { TodoModalId, setCloseTodoModal } = useTodoModalStore();

  const router = useRouter();
  const { id: dashboardId } = router.query;

  const {
    id,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    columnId,
    createdAt,
    updatedAt,
  } = card;

  const { columnList, isLoading } = useColumnList(dashboardId);
  const { commentList, isLoading: isCommentLoading } = useCommentList(id);

  const currentColumn = columnList.filter(
    (column: IColumn) => column.id === columnId,
  );

  // 나중에 에러처리 하기
  if (!TodoModalId) return <></>;
  if (isLoading) return <>todomodal loading</>;
  if (isCommentLoading) return <>comment loading</>;

  return (
    <ModalPortal onClose={setCloseTodoModal}>
      <div className={styles['modal-container']}>
        <div className={styles['title-and-icons']}>
          <p className={styles['title']}>{title}</p>
          <div className={styles['empty-block']}></div>
          <div className={styles['kebab-and-close']}>
            <div
              className={styles['kebab']}
              onBlur={() => setIsKebabOpen(false)}
            >
              <button
                type='button'
                onClick={() => setIsKebabOpen((prev) => !prev)}
                className={styles['top-button']}
              >
                <IconKebab className={styles['icon']} />
              </button>
              {isKebabOpen && <KebabDropdown isOpen={isKebabOpen} />}
            </div>
            <button
              type='button'
              onClick={setCloseTodoModal}
              className={styles['top-button']}
            >
              <IconClose className={styles['icon']} />
            </button>
          </div>
        </div>
        <p className={styles['title-mobile']}>{title}</p>
        <div className={styles['modal-wrapper']}>
          <div className={styles['contents']}>
            <div className={styles['chips']}>
              <ChipProgress title={currentColumn[0].title} />
              <div className={styles['border']} />
              <div className={styles['chip-card-list']}>
                {tags.map((tag, idx) => (
                  <ChipCard color='orange' content={tag} key={idx} />
                ))}
              </div>
            </div>
            <p className={styles['contents-text']}>{description}</p>
            {imageUrl && (
              <Image
                className={styles['content-img']}
                src={imageUrl}
                width={445}
                height={260}
                alt='일정 사진'
              />
            )}
            <div className={styles['comment-input-container']}>
              <p className={styles['comment-title']}>댓글</p>
              <textarea
                className={styles['comment-input']}
                placeholder='댓글 작성하기'
              />
            </div>
            <div className={styles['comment-list']}>
              {commentList.map((comment: IComment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
          <ManagerCard assignee={assignee} dueDate={dueDate} />
        </div>
      </div>
    </ModalPortal>
  );
}
