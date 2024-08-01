import Button from '@/components/Button';
import styles from './index.module.scss';

const modalValues: Record<ModalType, IModal> = {
  create: {
    title: '새 컬럼 생성',
    label: '이름',
    placeholder: '새 컬럼의 이름을 입력하세요',
    leftBtn: '취소',
    rightBtn: '생성',
  },
  manage: {
    title: '컬럼 관리',
    label: '이름',
    placeholder: '변경할 컬럼 이름을 입력하세요',
    leftBtn: '취소',
    rightBtn: '생성',
  },
  invite: {
    title: '초대하기',
    label: '이메일',
    placeholder: '초대할 이메일을 입력하세요',
    leftBtn: '취소',
    rightBtn: '초대',
  },
};

function Modal({
  type = 'create',
  handleLeftBtnClick,
  handleRightBtnClick,
}: {
  type: ModalType;
  handleLeftBtnClick: any;
  handleRightBtnClick: any;
}) {
  return (
    <div className={styles['modal']}>
      <div>
        <p className={styles['title']}>{modalValues[type].title}</p>
      </div>
      <div className={styles['input-wrapper']}>
        <label>{modalValues[type].label}</label>
        <input type='text' placeholder={modalValues[type].placeholder} />
      </div>
      <div className={styles['button-wrapper']}>
        {/* 버튼 컴포넌트에 없어서 직접 작성 */}
        <button className={styles['left-btn']} onClick={handleLeftBtnClick}>
          {modalValues[type].leftBtn}
        </button>
        <button className={styles['right-btn']} onClick={handleRightBtnClick}>
          {modalValues[type].rightBtn}
        </button>
      </div>
    </div>
  );
}

export default Modal;
