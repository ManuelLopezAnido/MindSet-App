//import { useEffect, useState } from 'react';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <section className={styles.container}>
      <li>
        <lu>Admins</lu>
        <lu>Applications</lu>
        <lu>Clients</lu>
        <lu>Counselors</lu>
      </li>
    </section>
  );
}

export default Navbar;
