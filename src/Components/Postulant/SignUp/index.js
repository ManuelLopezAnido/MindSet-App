import React from 'react';
import styles from './signUp.module.css';

const SignUp = () => {
  return (
    <section className={styles.signUp}>
      <form className={styles.signUpForm}>
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="text" />
        </div>
        <div>
          <label>Address</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" />
        </div>
        <div>
          <label>Repeat Password</label>
          <input type="text" />
        </div>
        <button>Send</button>
      </form>
    </section>
  );
};

export default SignUp;
