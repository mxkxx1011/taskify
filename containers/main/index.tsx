import Image from 'next/image';
import Header from '@/components/Header/HeaderMain';
import styles from './index.module.scss';

// 히어로 섹션
import ManageText from '@/assets/logos/manage.svg';
import HeroImage from '@/assets/landing/hero-image.svg';
import Logo from '@/assets/logos/LogoYellowBorder.svg';
import LoginButton from '@/containers/main/LoginButton';

//중간 섹션
import LandingImage01 from '@/assets/landing/landing1.png';
import LandingImage02 from '@/assets/landing/landing2.png';

import SettingList from './SettingList';
import Footer from './Footer';
import { SettingListValues } from '@/constants/MainPageConstants';

function MainPage() {
  return (
    <>
      <Header />
      <main className={styles['main']}>
        <section className={styles['hero-section']}>
          <HeroImage className={styles['hero-img']} />

          <div className={styles['hero-title']}>
            <ManageText className={styles['manage']} />
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

              <h2>
                일의 <span className={styles['strong']}>우선순위</span>를
                <br />
                관리하세요
              </h2>
            </div>
            <div className={styles['img-wrapper']}>
              <Image
                className={styles['landing-img-01']}
                src={LandingImage01}
                alt='랜딩이미지'
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

              <h2>
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
              {SettingListValues.map((list) => (
                <SettingList list={list} />
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
