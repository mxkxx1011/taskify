import useEditCommentStore from '@/stores/EditCommentStore';
import getDate from '@/utils/getDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { IconKebab } from '@/assets/icongroup';
import { useUserStore } from '@/store/useUserStore';

function Comment({ comment }: { comment: IComment }) {
  const {
    id: commentId,
    content,
    createdAt,
    updatedAt,
    cardId,
    author,
  } = comment;

  const { id: authorId, nickname, profileImageUrl } = author;
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { CommentId, setOpenEditComment, setCloseEditComment } =
    useEditCommentStore();

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      comment: content,
    },
  });

  // 댓글 수정 mutate
  const editCommentMutation = useMutation({
    mutationFn: (comment: string) =>
      axios.put(`/comments/${commentId}`, { content: comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCommentList', cardId],
      });
      setCloseEditComment();
    },
  });

  // 댓글 삭제 mutate
  const deleteCommentMutation = useMutation({
    mutationFn: () => axios.delete(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCommentList', cardId],
      });
    },
  });

  const onEditCommentSubmit = (data: { comment: string }) => {
    editCommentMutation.mutate(data.comment);
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  // unmount 되면 닫히도록
  useEffect(() => {
    return () => setCloseEditComment();
  }, []);

  if (!user) return <></>;

  return (
    <>
      <div className={styles['comment-card']}>
        {profileImageUrl ? (
          <Image
            className={styles['profile-img']}
            src={profileImageUrl}
            alt='프로필이미지'
          />
        ) : (
          <div className={styles['profile-img']}></div>
        )}
        <div className={styles['comment-contents']}>
          <div className={styles['writer-and-date']}>
            <p className={styles['writer']}>{nickname}</p>
            <p className={styles['date']}>{getDate(createdAt, true)}</p>
            {createdAt !== updatedAt && (
              <p className={styles['date']}>(수정됨)</p>
            )}
          </div>
          {CommentId === commentId ? (
            <form
              onSubmit={handleSubmit(onEditCommentSubmit)}
              className={`${styles['comment-text']} ${styles['edit-comment']}`}
            >
              <textarea
                id='comment'
                {...register('comment', {
                  required: '수정할 댓글을 입력해주세요',
                })}
              />

              <div className={styles['button-wrapper']}>
                <button onClick={setCloseEditComment}>취소</button>
                <button>수정</button>
              </div>
            </form>
          ) : (
            <p className={styles['comment-text']}>{content}</p>
          )}
          {user.id === authorId && !(CommentId === commentId) && (
            <div className={styles['edit-and-delete']}>
              <button
                className={styles['button']}
                onClick={() => setOpenEditComment(commentId)}
              >
                수정
              </button>
              <button
                className={styles['button']}
                onClick={handleDeleteComment}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Comment;
