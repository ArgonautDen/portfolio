import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

const greetings = [
  'Привет',
  'Hello',
  '你好',
  'Bonjour',
  'Ciao',
  'Hola',
  'Amour',
];

const LoadingScreen = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const isLast = index === greetings.length - 1;
    const holdTime = 120;

    const hideTimer = setTimeout(() => {
      setVisible(false);

      const nextTimer = setTimeout(() => {
        if (isLast) {
          setExit(true);
          setTimeout(onFinish, 900); // ждём пока шторка уедет вверх
        } else {
          setIndex(i => i + 1);
          setVisible(true);
        }
      }, 120);

      return () => clearTimeout(nextTimer);
    }, holdTime);

    return () => clearTimeout(hideTimer);
  }, [index, onFinish]);

  return (
    <>
      <div className={`${styles.screen} ${exit ? styles.exit : ''}`}>
        <span
          className={`${styles.word} ${visible ? styles.show : styles.hide} ${index === greetings.length - 1 ? styles.last : ''}`}
        >
          {greetings[index]}
        </span>
      </div>
      <div className={`${styles.arc} ${exit ? styles.exit : ''}`} />
    </>
  );
};

export default LoadingScreen;