import SmallModal from '@/components/SmallModal';
import ModalPortal from '@/components/ModalPortal';
import { useCreateModalStore } from '@/stores/modalStore';

function CreateModal() {
  const { isModalOpen, setCloseModal } = useCreateModalStore();

  const handleCancelBtnClick = () => {
    setCloseModal();
  };

  const handleCreateBtnClick = () => {
    console.log('생성 버튼 클릭'); // 임시
  };

  if (!isModalOpen) return null;

  return (
    <ModalPortal onClose={setCloseModal}>
      <SmallModal
        type='create'
        handleLeftBtnClick={handleCancelBtnClick}
        handleRightBtnClick={handleCreateBtnClick}
      />
    </ModalPortal>
  );
}

export default CreateModal;
