import ModalPortal from '@/components/ModalPortal';
import SmallModal from '@/components/SmallModal';
import { useManageModalStore } from '@/stores/modalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';

function ManageModal({ defaultValue }: { defaultValue: string }) {
  const { ManageModalId, setCloseManageModal } = useManageModalStore();
  const queryClient = useQueryClient();

  // 컬럼 이름 변경하는 mutate 함수
  const updateColumnMutation = useMutation({
    mutationFn: (newTitle: string) =>
      axios.put(`/columns/${ManageModalId}`, { title: newTitle }),
    onSuccess: () => {
      // 해당 쿼리 키 값을 가진 데이터를 새로 get
      queryClient.invalidateQueries({ queryKey: ['getColumnList'] });
      setCloseManageModal();
    },
  });

  // 컬럼 삭제하는 mutate 함수
  const deleteColumnMutation = useMutation({
    mutationFn: () => axios.delete(`/columns/${ManageModalId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getColumnList'] });
      setCloseManageModal();
    },
  });

  const handleDeleteBtnClick = () => {
    deleteColumnMutation.mutate();
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
