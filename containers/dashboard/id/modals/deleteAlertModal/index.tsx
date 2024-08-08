import Button from '@/components/Button';
import ButtonSet from '@/components/ButtonSet';
import ModalPortal from '@/components/ModalPortal';
import { useCreateModalStore } from '@/stores/modalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';
import { deleteColumn } from '@/services/columnService';

function DeleteAlertModal() {
  // TODO: 임시 데이터들은 prop으로 받아오기
  const title = '임시 title'; // 임시
  const columnId = 1111; // 임시
  const dashboardId = 1111; // 임시

  const queryClient = useQueryClient();

  //임시 상태
  const { isModalOpen, setCloseModal } = useCreateModalStore();

  const deleteColumnMutation = useMutation({
    mutationFn: () => deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      setCloseModal();
    },
  });

  const handleDeleteBtnClick = () => {
    deleteColumnMutation.mutate();
  };

  if (!isModalOpen) return <></>;
  return (
    <ModalPortal onClose={setCloseModal}>
      <div className={styles['modal']}>
        <div className={styles['modal-wrapper']}>
          <p className={styles['alert']}>
            '{title}' 컬럼과 해당 컬럼의{' '}
            <span className={styles['line']}>모든 카드가 삭제됩니다.</span>
          </p>
          <div className={styles['button-wrapper']}>
            <Button
              type='button'
              buttonType='secondary'
              onClick={setCloseModal}
            >
              취소
            </Button>
            <Button
              buttonType='primary'
              type='button'
              onClick={handleDeleteBtnClick}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

export default DeleteAlertModal;
