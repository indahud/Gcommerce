import { useContext } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

import AuthContext from "../context/AuthContext";

export default () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };
  // Invoking useContext
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.nav}>
      {!isHome && (
        <div className={styles.back}>
          <a href="#" onClick={goBack}>
            {"< "}Back
          </a>
        </div>
      )}
      <div className={styles.title}>
        <Link href="/">
          <a>
            <h1>G Commerce</h1>
          </a>
        </Link>
      </div>
    </div>
  );
};
