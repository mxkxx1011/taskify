import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './404.module.scss';

// TODO: 다크모드시 404white 로 변경하게
function NotFound() {
  const router = useRouter();

  return (
    <div className={styles['main']}>
      <Image src='/404.png' priority width={600} height={400} alt='404 image' />
      <h2 className={styles['title']}>
        죄송합니다.{' '}
        <span className={styles['line']}>
          현재 해당 페이지를 찾을 수 없습니다.
        </span>
      </h2>
      <p className={styles['content']}>
        페이지가 존재하지 않거나,{' '}
        <span className={styles['line']}>
          현재 권한으로 사용할 수 없는 페이지입니다.
        </span>
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>

      <div className={styles['button-wrapper']}>
        <Button
          buttonType='secondary'
          type='button'
          onClick={() => router.push('/')}
        >
          메인페이지로
        </Button>
        <Button
          onClick={() => router.back()}
          buttonType='primary'
          type='button'
        >
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
