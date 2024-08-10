import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import useColumnList from '@/hooks/useColumnList';
import axios from '@/services/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SelectAssigneeDropdown from '../../dropdown/SelectAssigneeDropdown';
import ModalPortal from '@/components/ModalPortal';
import styles from './TodoCreateModal.module.scss';
import ImageInput from '@/components/Input/ImageInput';
import { useState } from 'react';
import useToast from '@/hooks/useToast';

import getDate from '@/utils/getDate';
import useTodoCreateModalStore from '@/stores/TodoCreateModalStore';

export default function TodoCreateModal({ columnId }: { columnId: number }) {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id: dashboardId } = router.query;
  const { columnList } = useColumnList(dashboardId);

  const { TodoCreateModalId, setCloseTodoCreateModal } =
    useTodoCreateModalStore();

  const [selectedAssigneeValue, setSelectedAssigneeValue] =
    useState<IMember | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const postTodoMutation = useMutation({
    mutationFn: (formData: FormValues) => {
      return axios.post(`/cards`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCardList', columnId],
      });

      toast('success', '데이터 넣기 성공');
      reset(); // 폼 초기화
      setCloseTodoCreateModal();
    },
    onError: (error) => {
      console.error('Create Error:', error);
      toast('error', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { title, description, tags, dueDate } = data;
    console.log('selectedAssigneeValue');
    console.log(selectedAssigneeValue);

    // 선택된 담당자의 ID 추가
    const assigneeUserId =
      selectedAssigneeValue?.userId ?? selectedAssigneeValue?.id;

    // 전송할 데이터 생성
    const requestData: FormValues = {
      assigneeUserId,
      dashboardId: Number(dashboardId),
      columnId: columnId, // 필요한 경우 columnId 추가
      title,
      description,
      tags: tags.length === 0 ? [] : tags,
    };

    if (dueDate) {
      requestData.dueDate = getDate(dueDate, true);
    }
    if (imageUrl) {
      requestData.imageUrl = imageUrl;
    }

    console.log('Form Data:', requestData); // 디버깅을 위한 콘솔 출력

    postTodoMutation.mutate(requestData); // 폼 데이터 전송
  };

  if (TodoCreateModalId !== columnId) return <></>;
  return (
    <ModalPortal onClose={setCloseTodoCreateModal}>
      <div className={styles['container']}>
        <form
          className={styles['form']}
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => {
            reset(); // 폼 리셋
            setCloseTodoCreateModal();
          }}
        >
          <p className={styles['modal-title']}>할 일 생성</p>
          <div className={styles['owner']}>
            <div className={styles['label-and-form']}>
              <label className={styles['form-label']}>담당자</label>
              <SelectAssigneeDropdown
                selectedAssigneeValue={selectedAssigneeValue}
                setSelectedAssigneeValue={setSelectedAssigneeValue}
                dashboardId={dashboardId}
              />
            </div>
          </div>
          <div className={styles['label-and-form']}>
            <div className={styles['label-with-star']}>
              <label className={styles['form-label']}>제목</label>
              <label className={styles['essential']}>*</label>
            </div>
            <textarea
              className={styles['form-input']}
              placeholder='제목을 입력해주세요'
              {...register('title', { required: true })}
            ></textarea>
          </div>
          <div className={styles['label-and-form']}>
            <div className={styles['label-with-star']}>
              <label className={styles['form-label']}>설명</label>
              <label className={styles['essential']}>*</label>
            </div>
            <textarea
              className={`${styles['form-input']} ${styles['form-description']}`}
              placeholder='설명을 입력해주세요'
              {...register('description', { required: true })}
            ></textarea>
          </div>
          <div className={styles['label-and-form']}>
            <label className={styles['form-label']}>마감일</label>
            <input
              className={styles['date-input']}
              type='datetime-local'
              {...register('dueDate')}
            />
          </div>
          <div className={styles['label-and-form']}>
            <label className={styles['form-label']}>태그</label>
            <textarea
              className={styles['date-input']}
              placeholder='라벨칩'
              {...register('tags')}
            />
          </div>
          <div className={styles['label-and-form']}>
            <label className={styles['form-label']}>이미지</label>
            <ImageInput
              name='task-image'
              value={imageUrl}
              onChange={(file) => {
                const url = URL.createObjectURL(file);
                setImageUrl(url); // 이미지 URL 상태 업데이트
              }}
              onDeleteClick={() => setImageUrl(null)}
            />
          </div>
          <div className={styles['button-group']}>
            <button type='reset' className={styles['button']}>
              취소
            </button>
            <button
              type='submit'
              className={`${styles['button']} ${styles['yellow']}`}
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </ModalPortal>
  );
}
