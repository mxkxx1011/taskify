import styles from './Column.module.scss';
import { IconCircleChip, IconSetting } from '@/assets/icongroup';
import ChipNum from '@/containers/dashboard/id/chips/ChipNum';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Card from '@/containers/dashboard/id/card/Card';
import { useManageModalStore } from '@/stores/modalStore';
import ManageModal from '../modals/ManageModal';

// 컬럼 목록을 토대로 각 아이디를 통해 카드 목록 가져오기 이것도 저장

// 임시 mock 데이터
const cardList = [
  {
    id: 9769,
    title: '123',
    description: '123',
    tags: ['dsaf', 'z', 'df', 'f', 's'],
    dueDate: '2024-07-31 14:30',
    assignee: {
      id: 4358,
      nickname: '1234123213',
      profileImageUrl: null,
    },
    imageUrl: null,
    teamId: '6-13',
    dashboardId: 11342,
    columnId: 38317,
    createdAt: '2024-07-31T14:16:18.173Z',
    updatedAt: '2024-07-31T14:16:18.173Z',
  },
  {
    id: 9770,
    title: 'z',
    description: 'asfd',
    tags: ['mm', 'z', 'zdf', 'asdf', 'a'],
    dueDate: null,
    assignee: {
      id: 4358,
      nickname: '1234123213',
      profileImageUrl: null,
    },
    imageUrl: null,
    teamId: '6-13',
    dashboardId: 11342,
    columnId: 38317,
    createdAt: '2024-07-31T14:17:36.067Z',
    updatedAt: '2024-07-31T14:17:36.067Z',
  },
  {
    id: 9771,
    title: '123',
    description: '123',
    tags: ['dsaf', 'z', 'df', 'f', 's'],
    dueDate: '2024-07-31 14:30',
    assignee: {
      id: 4358,
      nickname: '1234123213',
      profileImageUrl: null,
    },
    imageUrl: null,
    teamId: '6-13',
    dashboardId: 11342,
    columnId: 38317,
    createdAt: '2024-07-31T14:16:18.173Z',
    updatedAt: '2024-07-31T14:16:18.173Z',
  },
  {
    id: 9772,
    title: '123',
    description: '123',
    tags: ['dsaf', 'z', 'df', 'f', 's'],
    dueDate: '2024-07-31 14:30',
    assignee: {
      id: 4358,
      nickname: '1234123213',
      profileImageUrl: null,
    },
    imageUrl: null,
    teamId: '6-13',
    dashboardId: 11342,
    columnId: 38317,
    createdAt: '2024-07-31T14:16:18.173Z',
    updatedAt: '2024-07-31T14:16:18.173Z',
  },
];

function Column({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const { isModalOpen, setOpenModal } = useManageModalStore();

  return (
    <div className={styles['column']}>
      <div className={styles['header']}>
        <div className={styles['header-left']}>
          <IconCircleChip />
          <div className={styles['title']}>
            <p className={styles['column-title']}>{title}</p>{' '}
            <ChipNum num={3} />
          </div>
        </div>
        <IconSetting
          className={styles['setting-icon']}
          onClick={setOpenModal}
        />
        {isModalOpen && <ManageModal />}
      </div>
      <div className={styles['card-list']}>
        <Button buttonType='add-todo' />
        {cardList.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
  // id를 통해서 카드 목록 가져오기
  // {cardList.map((card)=> <Card card={card}/>)}
}

export default Column;
