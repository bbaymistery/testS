import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/global.scss";
import localFont from '@next/font/local';
import { createWrapper } from "next-redux-wrapper";
const myFont = localFont({ src: '../../public/googleFonts/92zatBhPNqw73oTd4g.woff2' })
export const MyApp = ({ Component, pageProps }) => {
  //it comes from index js serVerSide props
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (<Provider store={store}>
    <main style={{ fontFamily: myFont.style.fontFamily, }} id="general_main_container" >
      <Component {...pageProps} />
    </main>
  </Provider>);
}
const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);
