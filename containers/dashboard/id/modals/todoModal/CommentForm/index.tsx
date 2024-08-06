import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';

function CommentForm({
  cardId,
  dashboardId,
  columnId,
}: {
  cardId: number;
  dashboardId: number;
  columnId: number;
}) {
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });

  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: (newComment: string) =>
      axios.post('comments', {
        content: newComment,
        cardId: cardId,
        columnId: columnId,
        dashboardId: dashboardId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCommentList', cardId] });
      setValue('content', '');
    },
  });

  const onSubmit = (data: { content: string }) => {
    postCommentMutation.mutate(data.content);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['comment-input-container']}
      >
        <label htmlFor='comment' className={styles['comment-title']}>
          댓글
        </label>
        <textarea
          id='comment'
          className={styles['comment-input']}
          placeholder='댓글 작성하기'
          {...register('content')}
        />
        <button className={styles['submit-btn']}>제출</button>
      </form>
    </>
  );
}

export default CommentForm;
