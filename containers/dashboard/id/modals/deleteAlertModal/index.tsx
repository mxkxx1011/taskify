import Button from '@/components/Button';
import ButtonSet from '@/components/ButtonSet';
import ModalPortal from '@/components/ModalPortal';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';
import { deleteColumn } from '@/services/columnService';
import useToast from '@/hooks/useToast';
import { useRouter } from 'next/router';
import useDeleteAlertModalStore from '@/stores/useDeleteAlertModalStore';

function DeleteAlertModal({ columnId }: { columnId: number }) {
  const router = useRouter();
  const { id: dashboardId } = router.query;

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { AlertModalId, setCloseAlertModal } = useDeleteAlertModalStore();

  const handleDelete = async () => {
    try {
      return await deleteColumn(columnId);
    } catch (e: any) {
      toast('error', e.message as string);
      // 에러 뜨면 토스트에 해당 에러메시지가 뜨도록
    }
  };

  const deleteColumnMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      setCloseAlertModal();
    },
  });

  const handleDeleteBtnClick = () => {
    deleteColumnMutation.mutate();
  };

  if (AlertModalId !== columnId) return <></>;
  return (
    <ModalPortal onClose={setCloseAlertModal}>
      <div className={styles['modal']}>
        <div className={styles['modal-wrapper']}>
          <p className={styles['alert']}>
            해당 컬럼과 해당 컬럼의{' '}
            <span className={styles['line']}>
              모든 카드를 삭제하시겠습니까?
            </span>
          </p>
          <div className={styles['button-wrapper']}>
            <Button
              type='button'
              buttonType='secondary'
              onClick={setCloseAlertModal}
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
