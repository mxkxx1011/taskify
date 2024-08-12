import styles from './Chip.module.scss';
import classNames from 'classnames';
import { useTheme } from '@/hooks/useThemeContext';

function ChipCard({ color, content }: { color: string; content: string }) {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles['card'], styles[color], styles[theme])}>
      {content}
    </div>
  );
}

export default ChipCard;
