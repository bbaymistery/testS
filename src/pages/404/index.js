import React from "react";
import style from "./styles.module.scss";
const CustomError = () => {
  return (
    <div className={style.main_box}>
      <div className={style.container}>
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We {`can't`} find the page {`you're`} looking for.</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/new-booking">Go back home</a>
      </div>

    </div>
  );
};

export default CustomError;
