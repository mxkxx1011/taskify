import Button from '@/components/Button';

import ModalPortal from '@/components/ModalPortal';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';
import { deleteColumn } from '@/services/columnService';

import useToast from '@/hooks/useToast';
import { useRouter } from 'next/router';
import useDeleteAlertModalStore from '@/stores/useDeleteAlertModalStore';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classNames';

function DeleteAlertModal({ columnId }: { columnId: number }) {
  const router = useRouter();
  const { id: dashboardId } = router.query;

  const { theme } = useTheme();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { AlertModalId, setCloseAlertModal } = useDeleteAlertModalStore();

  const deleteColumnMutation = useMutation({
    mutationFn: () => deleteColumn(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      setCloseAlertModal();
    },
    onError: (e) => toast('error', e.message),
  });

  const handleDeleteBtnClick = () => {
    deleteColumnMutation.mutate();
  };

  if (AlertModalId !== columnId) return <></>;
  return (
    <ModalPortal onClose={setCloseAlertModal}>
      <div className={classNames(styles['modal'], styles[theme])}>
        <div className={styles['modal-wrapper']}>
          <p className={styles['alert']}>
            해당 컬럼과 해당 컬럼의{' '}
            <span className={styles['line']}>모든 카드가 삭제됩니다.</span>
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
