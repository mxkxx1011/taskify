import styles from './TodoCreateModal.module.scss';
import Image from 'next/image';
import putImg from '@/assets/images/img_todoSample.png';
export default function TodoCreateModal() {
  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <p className={styles['modal-title']}>할 일 생성</p>
        <div className={styles['owner']}>
          <div className={styles['label-and-form']}>
            <label className={styles['form-label']}>담당자</label>
            <select className={styles['dropdown-preview']}>
              <option>장아영</option>
              <option>최민경</option>
            </select>
          </div>
        </div>
        <div className={styles['label-and-form']}>
          <div className={styles['label-with-star']}>
            <label className={styles['form-label']}>제목</label>
            <label className={styles['essential']}>*</label>
          </div>
          <textarea
            className={styles['form-input']}
            placeholder='제목을 입력해주세요'
          ></textarea>
        </div>
        <div className={styles['label-and-form']}>
          <div className={styles['label-with-star']}>
            <label className={styles['form-label']}>설명</label>
            <label className={styles['essential']}>*</label>
          </div>
          <textarea
            className={`${styles['form-input']} ${styles['form-description']}`}
            placeholder='설명을 입력해주세요'
          ></textarea>
        </div>
        <div className={styles['label-and-form']}>
          <label className={styles['form-label']}>마감일</label>
          <input className={styles['date-input']} type='date' />
        </div>
        <div className={styles['label-and-form']}>
          <label className={styles['form-label']}>태그</label>
          <textarea className={styles['date-input']} placeholder='라벨칩' />
        </div>
        <div className={styles['label-and-form']}>
          <label className={styles['form-label']}>이미지</label>
          <Image
            className={styles['sampleImg']}
            src={putImg}
            alt='이미지 넣기'
          />
        </div>
      </form>
      <div>
        <div className={styles['button-group']}>
          <button type='reset' className={styles['button']}>
            취소
          </button>
          <button
            type='submit'
            className={`${styles['button']} ${styles['violet']}`}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
