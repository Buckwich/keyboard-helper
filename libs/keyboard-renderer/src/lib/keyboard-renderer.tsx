import styles from './keyboard-renderer.module.css';

/* eslint-disable-next-line */
export interface KeyboardRendererProps {}

export function KeyboardRenderer(props: KeyboardRendererProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to KeyboardRenderer!</h1>
    </div>
  );
}

export default KeyboardRenderer;
