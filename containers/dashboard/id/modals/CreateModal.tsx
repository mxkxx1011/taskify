import SmallModal from '@/components/SmallModal';
import ModalPortal from '@/components/ModalPortal';
import { useCreateModalStore } from '@/stores/modalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/services/axios';
import useColumnList from '@/hooks/useColumnList';
import useToast from '@/hooks/useToast';

// 커스텀 에러만 드게 하려고 만든 클래스 (gpt가 도와줬어요..)
class DuplicateColumnError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateColumnError';
  }
}

// 현재 대시보드 id를 받아옴
function CreateModal(id: any) {
  const { isModalOpen, setCloseModal } = useCreateModalStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { columnList } = useColumnList(id.id);

  // 컬럼 생성하는 mutate 함수
  const createColumnMutation = useMutation({
    mutationFn: (newTitle: string) => {
      if (columnList.some((column: IColumn) => column.title === newTitle)) {
        throw new DuplicateColumnError('이미 존재하는 컬럼 제목입니다.');
      }
      return axios.post(`/columns`, {
        title: newTitle,
        dashboardId: Number(id.id),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getColumnList', id.id] });
      setCloseModal();
      toast('success', '컬럼이 생성되었습니다.');
    },
    onError: (e: any) => {
      if (e instanceof DuplicateColumnError) {
        toast('error', e.message);
      }
    },
  });

  const handleCancelBtnClick = () => {
    setCloseModal();
  };

  const handleCreateBtnClick = (data: { title: string }) => {
    if (columnList.some((column: IColumn) => column.title === data.title)) {
      toast('error', '이미 존재하는 컬럼 제목입니다.');
    } else {
      createColumnMutation.mutate(data.title);
    }
  };

  if (!isModalOpen) return null;

  return (
    <ModalPortal onClose={setCloseModal}>
      <SmallModal
        type='create'
        handleLeftBtnClick={handleCancelBtnClick}
        handleRightBtnClick={handleCreateBtnClick}
        onSubmit={handleCreateBtnClick}
      />
    </ModalPortal>
  );
}

export default CreateModal;
