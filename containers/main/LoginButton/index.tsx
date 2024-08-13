import styles from './index.module.scss';
import Login from '@/assets/logos/login.svg';
import Link from 'next/link';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';

function LoginButton() {
  const { theme } = useTheme();
  return (
    <Link
      href='/signin'
      className={classNames(styles['button'], styles[theme])}
    >
      <div className={styles['svg-wrapper-1']}>
        <div className={styles['svg-wrapper']}>
          <svg
            className={styles['plane']}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path
              fill='current'
              d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
            ></path>
          </svg>
        </div>
      </div>
      <Login width={80} className={styles['login']} />
    </Link>
  );
}

export default LoginButton;
