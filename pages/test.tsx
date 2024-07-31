import Card from '@/containers/dashboard/id/card/Card';
import ChipAdd from '@/containers/dashboard/id/chips/ChipAdd';
import ChipCard from '@/containers/dashboard/id/chips/ChipCard';
import ChipNum from '@/containers/dashboard/id/chips/ChipNum';
import ChipProgress from '@/containers/dashboard/id/chips/ChipProgress';

const mockCard: ICard = {
  id: 5,
  title: 'test',
  description: 'test',
  tags: ['test1', 'test2'],
  dueDate: '2024-07-30 16:00',
  assignee: {
    profileImageUrl: 'test',
    nickname: 'test',
    id: 4,
  },
  imageUrl: '/assets/card_image1.png',
  teamId: 'test',
  columnId: 4,
  createdAt: 'test',
  updatedAt: 'test',
};

function Test() {
  return (
    <>
      <br />
      <ChipNum num={3} />
      <br />
      <ChipAdd />
      <br />
      <ChipProgress title='To Do' />
      <ChipProgress title='Done' />
      <ChipProgress title='Donegreen' color='green' />
      <ChipProgress title='Donepink' color='pink' />
      <ChipProgress title='DoneOrange' color='orange' />
      <ChipProgress title='DoneBlue' color='blue' />
      <br />
      <ChipCard color='orange' content='개발1' />
      <ChipCard color='blue' content='개발2' />
      <br />
      <ChipCard color='pink' content='개발3' />
      <ChipCard color='green' content='개발4' />
      <Card card={mockCard} />
    </>
  );
}

export default Test;
