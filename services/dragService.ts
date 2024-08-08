import { putCard } from '@/services/cardService';

//  드래그 시작할때 함수
const onDragStart = () => {
  //   document.body.style.opacity = '0.5';
};

// 드래그 끝나고 함수
const onDragEnd = async (result: any, queryClient: any) => {
  //   document.body.style.opacity = '1.0';
  const { destination, source, draggableId } = result;

  // 도착(내려놓은 부분)이 없으면 return
  if (!destination) return;

  // 이동 안했으면 그냥 return
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  // 같은 컬럼내 이동
  if (destination.droppableId === source.droppableId) {
    // 어떻게 해야할까..
    const cardList = queryClient.getQueryData([
      'getCardList',
      Number(destination.droppableId),
    ]);
    console.log('cardList');
    console.log(cardList);
  }

  // 다른 컬럼 이동
  if (destination.droppableId !== source.droppableId) {
    const res = await putCard(
      Number(source.index),
      Number(destination.droppableId),
    );

    queryClient.invalidateQueries({
      queryKey: ['getCardList', Number(source.droppableId)],
    });
    queryClient.invalidateQueries({
      queryKey: ['getCardList', Number(destination.droppableId)],
    });
  }
};

// 드래그 중간?
const onDragUpdate = (update: any) => {
  const { destination } = update;
};

export { onDragStart, onDragEnd, onDragUpdate };
