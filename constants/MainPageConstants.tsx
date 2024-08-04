import Image from 'next/image';

import LandingImage03 from '@/assets/landing/landing3.png';
import LandingImage04 from '@/assets/landing/landing4.png';
import LandingImage05 from '@/assets/landing/landing5.png';

const Landing03 = () => {
  return (
    <Image src={LandingImage03} alt='setting-image' width={300} height={124} />
  );
};
const Landing04 = () => {
  return (
    <Image src={LandingImage04} alt='setting-image' width={300} height={231} />
  );
};
const Landing05 = () => {
  return (
    <Image
      src={LandingImage05}
      alt='setting-image'
      width={300}
      height={195.5}
    />
  );
};

const SettingListValues = [
  {
    image: Landing03,
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
  },
  {
    image: Landing04,
    title: '초대',
    description: '새로운 팀원을 초대할 수 있어요.',
  },
  {
    image: Landing05,
    title: '구성원',
    description: '구성원을 초대하고 내보낼 수 있어요.',
  },
];

export { SettingListValues };
