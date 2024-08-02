type ModalType = 'create' | 'manage' | 'invite';
interface IModal {
  id: string;
  title: string;
  label: string;
  placeholder: string;
  leftBtn: string;
  rightBtn: string;
}
