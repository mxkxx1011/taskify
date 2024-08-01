type ModalType = 'create' | 'manage' | 'invite';
interface IModal {
  title: string;
  label: string;
  placeholder: string;
  leftBtn: string;
  rightBtn: string;
}
