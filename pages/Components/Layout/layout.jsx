// components/Layout.js (or wherever your Layout component is)

import Sidebar from '../Sidebar/Sidebar';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.body}> 
      <div className={styles.rootlayout}>
        <Sidebar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}