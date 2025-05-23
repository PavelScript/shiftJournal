import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from '../src/components/Header/Header'
import TableZayavki from './components/TableZayavki/TableZayavki'
import styles from './main.module.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header className={styles.header}/>
    <TableZayavki className={styles.tableContainer} />
  </StrictMode>,
)
