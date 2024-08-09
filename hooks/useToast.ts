import useToastStore from '@/stores/toastStore';
import { v4 as uuid } from 'uuid';

/**
 * @example onClick={() => toast(type, message)}
 * @type {type} success | error
 * @type {message} 토스트로 띄울 메시지 입력
 * @returns {toast} toast를 띄우는 함수
 */
export default function useToast() {
  const { addToastList } = useToastStore();

  const toast = (type: ToastType, message: string) => {
    const id = uuid(); // 각각의 고유한 id를 사용
    addToastList({ id, type, message }); // toastList에 추가
  };

  return { toast };
}
