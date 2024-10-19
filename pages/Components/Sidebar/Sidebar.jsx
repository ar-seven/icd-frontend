'use client'
import styles from './sidebar.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {

  const router = useRouter();

  const currentRoute = router.pathname;

  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar__heading}>
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={37}
              height={37}
            />
            <span className={styles.sidebar__heading_title}>Medi Cure</span>
        </div>

        <div className={styles.sidebar__nav}>
          
          <Link href='/'>
            <div className={`${styles.sidebar__nav_page} ${currentRoute === '/' && styles.sidebar__nav_page_active}`}>
              <Image 
                src='/icons/upload.svg'
                alt='upload'
                width={24}
                height={24}
              />
              <span className={styles.sidebar__nav_page_text}>Upload </span>
              <span className={styles.sidebar__nav_page_right}>
                <Image
                  src='/icons/right.svg'
                  alt='right'
                  width={16}
                  height={16}
                />
              </span>
            </div>
          </Link>

            <Link href='/prediction'>
              <div className={`${styles.sidebar__nav_page} ${currentRoute === '/prediction' && styles.sidebar__nav_page_active}`}>
                <Image 
                  src='/icons/image.svg'
                  alt='image'
                  width={24}
                  height={24}
                />
                <span className={styles.sidebar__nav_page_text}>ICD/CPT</span>
                <span className={styles.sidebar__nav_page_right}>
                <Image
                  src='/icons/right.svg'
                  alt='right'
                  width={16}
                  height={16}
                />
              </span>
              </div>
            </Link>

            <Link href='/cross'>
              <div className={`${styles.sidebar__nav_page} ${currentRoute === '/cross' && styles.sidebar__nav_page_active}`}>
                <Image 
                  src='/icons/prediction.svg'
                  alt='predict'
                  width={24}
                  height={24}
                />
                <span className={styles.sidebar__nav_page_text}>Prediction</span>
                <span className={styles.sidebar__nav_page_right}>
                <Image
                  src='/icons/right.svg'
                  alt='right'
                  width={16}
                  height={16}
                />
              </span>
              </div>
            </Link>

            <Link href='/Patient'>
              <div className={`${styles.sidebar__nav_page} ${currentRoute === '/Patient' && styles.sidebar__nav_page_active}`}>
                <Image 
                  src='/icons/patient.svg'
                  alt='patient'
                  width={24}
                  height={24}
                />
                <span className={styles.sidebar__nav_page_text}>Patients Table</span>
                <span className={styles.sidebar__nav_page_right}>
                <Image
                  src='/icons/right.svg'
                  alt='right'
                  width={16}
                  height={16}
                />
              </span>
              </div>
            </Link>            


        </div>
    </div>
  )
}

export default Sidebar
