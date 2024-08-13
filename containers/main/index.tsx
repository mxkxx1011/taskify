import Image from 'next/image';
import classNames from 'classnames';
import Header from '@/components/Header/HeaderMain';
import styles from './index.module.scss';

// 히어로 섹션
import Logo from '@/assets/logos/LogoYellowBorder.svg';
import LoginButton from '@/containers/main/LoginButton';

//중간 섹션
import LandingImage02 from '@/assets/landing/landing2.png';

import SettingList from './SettingList';
import Footer from './Footer';
import { SettingListValues } from '@/constants/MainPageConstants';
import { useTheme } from '@/hooks/useThemeContext';

function MainPage() {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <main className={classNames(styles['main'], styles[theme])}>
        <section className={classNames(styles['hero-section'])}>
          <Image
            src='/hero-black.png'
            className={styles['hero-img-black']}
            width={1024}
            height={768}
            alt='메인 히어로 이미지'
            priority
          />

          <Image
            src='/hero-gray.png'
            className={styles['hero-img-gray']}
            width={1024}
            height={768}
            alt='메인 히어로 이미지'
            priority
          />

          <div className={classNames(styles['hero-title'])}>
            <Image
              src='/manage-black.png'
              alt='manage text'
              width={500}
              height={50}
              className={styles['manage-black']}
            />
            <Image
              src='/manage-gray.png'
              alt='manage text'
              width={500}
              height={50}
              className={styles['manage-gray']}
            />
            <Logo className={styles['logo']} />
          </div>

          <LoginButton />
        </section>

        <div className={styles['section-list']}>
          <section
            className={`${styles['section-background']} ${styles['section-01']}`}
          >
            <div className={styles['section-title']}>
              <p>Point 1</p>

              <h2 className={styles['section-title-content']}>
                일의 <span className={styles['strong']}>우선순위</span>를
                <br />
                관리하세요
              </h2>
            </div>
            <div className={styles['img-wrapper']}>
              <Image
                className={styles['landing-img-01']}
                src='/landing1.svg'
                alt='랜딩이미지'
                width={591}
                height={498}
              />
            </div>
          </section>

          <section
            className={`${styles['section-background']} ${styles['section-02']}`}
          >
            <div className={styles['img-wrapper']}>
              <Image
                className={styles['landing-img-02']}
                src={LandingImage02}
                alt='랜딩이미지'
              />
            </div>
            <div className={styles['section-title']}>
              <p>Point 2</p>

              <h2 className={styles['section-title-content']}>
                해야 <span className={styles['strong']}>할 일</span>을
                <br />
                <span className={styles['strong']}>등록</span>하세요
              </h2>
            </div>
          </section>

          <section className={styles['bottom-section']}>
            <h2 className={styles['section-setting-title']}>
              생산성을 높이는 다양한 설정 ⚡️
            </h2>

            <div className={styles['list']}>
              {SettingListValues.map((list, idx) => (
                <SettingList list={list} key={idx} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
