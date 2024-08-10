import styles from './TodoEditModal.module.scss';

import { useForm, SubmitHandler } from 'react-hook-form'; // 수정: SubmitHandler 추가
import { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import useImageStore from '@/stores/ImageInputStore';
import ModalPortal from '@/components/ModalPortal';
import useTodoEditModalStore from '@/stores/useTodoEditModalStore';
import useColumnList from '@/hooks/useColumnList';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';
import SelectProgressDropdown from '@/containers/dashboard/id/dropdown/SelectProgressDropdown';
import SelectAssigneeDropdown from '@/containers/dashboard/id/dropdown/SelectAssigneeDropdown';
import ImageInput from '@/components/Input/ImageInput';
import getDate from '@/utils/getDate';
import useToast from '@/hooks/useToast';

export default function TodoEditModal({ card }: { card: ICard }) {
  const {
    id: cardId,
    title,
    description,
    columnId, // 기존 컬럼
    dueDate,
    tags,
    imageUrl,
    assignee,
  } = card;
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(
    imageUrl,
  );

  const { toast } = useToast();
  const { imageUrl: storedImageUrl, setImage, clearImage } = useImageStore();
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      title: title,
      description: description,
      dueDate: dueDate ? dueDate.slice(0, 16) : '',
      tags: tags.length === 0 ? [] : tags,
      imageUrl: currentImageUrl ?? null,
    },
  });

  const queryClient = useQueryClient();
  const { setCloseEditModal } = useTodoEditModalStore();
  const router = useRouter();
  const { id: dashboardId } = router.query as { id: string };
  const { columnList } = useColumnList(dashboardId);
  const currentColumn = columnList.find(
    (column: IColumn) => columnId === column.id,
  );
  const [selectedProgressValue, setSelectedProgressValue] = useState<IColumn>(
    currentColumn!,
  );
  // 바뀐 컬럼

  const [selectedAssigneeValue, setSelectedAssigneeValue] = useState<
    IAssignee | IMember | null
  >(assignee ?? null);

  const postImageMutation = useMutation({
    mutationFn: (file: File) =>
      axios.post(`/columns/${columnId}/card-image`, file),
    onError: (error) => toast('error', error.message),
  });

  interface postType {
    imageUrl: string;
  }

  async function handlePostImage(file: File) {
    try {
      const res = await axios
        .post<postType>(
          `/columns/${columnId}/card-image`,
          { image: file },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => res.data)
        .then((data) => data.imageUrl);

      return res;
    } catch (e: any) {
      console.error(e.message);
      // toast('error', e.message);
    }
  }

  const handleImageChange = async (image: any) => {
    const newImageUrl = URL.createObjectURL(image);
    const res = await handlePostImage(image);

    if (res) {
      setCurrentImageUrl(res);
    }
    console.log('바꾸기');
    console.log(newImageUrl);
    console.log(handlePostImage(image));

    // setImage(newImageUrl); // zustand store 상태 업데이트
    // setValue('imageUrl', newImageUrlf); // useForm의 imageUrl 값 업데이트
  };

  const handleImageDelete = () => {
    console.log('지우기');

    // clearImage();
    setCurrentImageUrl(null);

    // setValue('imageUrl', null);
  };
  /*put*/

  const updateColumnMutation = useMutation({
    mutationFn: (data: IPostData) => {
      console.log('Request Data:', data);
      return axios.put(`/cards/${cardId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCardList', columnId],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCardList', selectedProgressValue.id],
      });

      setCloseEditModal();
    },
    onError: (error) => {
      console.error('Update Error:', error);
    },
  });

  // onSubmit 핸들러 추가
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { title, description, dueDate, imageUrl, tags } = data;

    const requestData: IPostData = {
      title: title,
      description: description,
      columnId: selectedProgressValue.id,
      assigneeUserId:
        'userId' in selectedAssigneeValue!
          ? selectedAssigneeValue?.userId ?? null
          : selectedAssigneeValue?.id ?? 0,
      tags: tags,
      dueDate: dueDate ? getDate(dueDate, true) : null,
      imageUrl: currentImageUrl ?? null,
    };

    updateColumnMutation.mutate(requestData);
  };

  return (
    <ModalPortal onClose={setCloseEditModal}>
      <div className={styles['container']}>
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
          {' '}
          <p className={styles['modal-title']}>할 일 수정</p>
          <div className={styles['status-and-owner']}>
            <div
              className={`${styles['top-form']} ${styles['label-and-form']}`}
            >
              <label className={styles['form-label']}>상태</label>
              <SelectProgressDropdown
                columnList={columnList}
                selectedValue={selectedProgressValue}
                setSelectedValue={setSelectedProgressValue}
              />
            </div>
            <div
              className={`${styles['top-form']} ${styles['label-and-form']}`}
            >
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
              {...register('title')}
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
              {...register('description')}
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
              name='user-profile'
              value={storedImageUrl} // 수정: storedImageUrl 상태 전달
              onChange={handleImageChange} // 수정: handleImageChange 함수 전달
              onDeleteClick={handleImageDelete} // 수정: handleImageDelete 함수 전달
            />
          </div>
          <div className={styles['button-group']}>
            <button
              type='reset'
              className={styles['button']}
              onClick={setCloseEditModal}
            >
              취소
            </button>
            <button
              type='submit'
              className={`${styles['button']} ${styles['yellow']}`}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </ModalPortal>
  );
}
