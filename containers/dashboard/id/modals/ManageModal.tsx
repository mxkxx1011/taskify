import ModalPortal from '@/components/ModalPortal';
import SmallModal from '@/components/SmallModal';
import { useManageModalStore } from '@/stores/modalStore';
import useDeleteAlertModalStore from '@/stores/useDeleteAlertModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';

function ManageModal({ defaultValue }: { defaultValue: string }) {
  const { ManageModalId, setCloseManageModal } = useManageModalStore();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id: dashboardId } = router.query;
  const { setOpenAlertModal } = useDeleteAlertModalStore();
  const { toast } = useToast();

  // 컬럼 이름 변경하는 mutate 함수
  const updateColumnMutation = useMutation({
    mutationFn: (newTitle: string) => {
      return axios.put(`/columns/${ManageModalId}`, { title: newTitle });
    },
    onSuccess: () => {
      // 해당 쿼리 키 값을 가진 데이터를 새로 get
      queryClient.invalidateQueries({
        queryKey: ['getColumnList', dashboardId],
      });
      setCloseManageModal();
      toast('success', '컬럼 이름이 변경되었습니다.');
    },
    onError: (e: any) => {
      toast('error', '컬럼 이름 변경에 실패하셨습니다.');
    },
  });

  const handleDeleteBtnClick = () => {
    setCloseManageModal();
    setOpenAlertModal(ManageModalId);
  };

  const handleChangeBtnClick = (data: { title: string }) => {
    updateColumnMutation.mutate(data.title);
  };

  if (!ManageModalId) return null;

  return (
    <ModalPortal onClose={setCloseManageModal}>
      <SmallModal
        type='manage'
        handleLeftBtnClick={handleDeleteBtnClick}
        handleRightBtnClick={handleChangeBtnClick}
        manageDefaultValue={defaultValue}
        onSubmit={handleChangeBtnClick}
      />
    </ModalPortal>
  );
}

export default ManageModal;
