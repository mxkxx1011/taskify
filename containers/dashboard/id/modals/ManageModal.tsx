import ModalPortal from '@/components/ModalPortal';
import SmallModal from '@/components/SmallModal';
import { useManageModalStore } from '@/stores/modalStore';

function ManageModal() {
  const { isModalOpen, setCloseModal } = useManageModalStore();

  const handleDeleteBtnClick = () => {
    console.log('삭제 버튼 클릭'); // 임시
  };

  const handleChangeBtnClick = () => {
    console.log('변경 버튼 클릭'); // 임시
  };

  if (!isModalOpen) return null;

  return (
    <ModalPortal onClose={setCloseModal}>
      <SmallModal
        type='manage'
        handleLeftBtnClick={handleDeleteBtnClick}
        handleRightBtnClick={handleChangeBtnClick}
      />
    </ModalPortal>
  );
}

export default ManageModal;
