import Button from '@/components/Button';
import styles from './index.module.scss';
import { modalValues } from '@/constants/ModalConstant';

function Modal({
  type = 'create',
  handleLeftBtnClick,
  handleRightBtnClick,
}: {
  type: ModalType;
  handleLeftBtnClick: any; // 타입 any는 나중에 수정 예정
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
