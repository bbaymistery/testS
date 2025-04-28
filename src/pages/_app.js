import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import "../styles/global.scss";
import localFont from '@next/font/local';
import { createWrapper } from "next-redux-wrapper";
import { useRouter } from "next/router";
import { loadFromLocalStorage } from "../helpers/localstorageHelper";
const myFont = localFont({ src: '../../public/googleFonts/92zatBhPNqw73oTd4g.woff2' })
export const MyApp = ({ Component, pageProps }) => {
  //it comes from index js serVerSide props
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const router = useRouter()
  const dispatch = useDispatch()
  // Save scroll position in localStorage
  const saveScrollPosition = () => {
    const currentScrollPosition = window.scrollY;
    localStorage.setItem('scrollPosition', currentScrollPosition); // Persist to localStorage
  };

  // Restore scroll position from localStorage
  const restoreScrollPosition = () => {
    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
      const parsedPosition = parseInt(savedPosition, 10);
      window.scrollTo(0, parsedPosition);
      localStorage.removeItem('scrollPosition'); // Optional cleanup
    }
  };


  //scrolling useEffect
  useEffect(() => {
    // Restore scroll position on page load
    restoreScrollPosition();

    // Save scroll position before navigation
    router.events.on('routeChangeStart', saveScrollPosition);

    // Restore scroll position after navigation
    router.events.on('routeChangeComplete', restoreScrollPosition);

    return () => {
      // Cleanup event listeners
      router.events.off('routeChangeStart', saveScrollPosition);
      router.events.off('routeChangeComplete', restoreScrollPosition);
    };
  }, [router]);

  useEffect(() => {
    // Load:
    const sebet = loadFromLocalStorage('sebet');
    const totalPrice = loadFromLocalStorage('totalPrice');
    console.log({ sebet });
    console.log({ totalPrice });

    if (sebet && totalPrice) {
      dispatch({ type: 'SET_LOCALSTORAGE_ITEMS', data: { sebet, totalPrice } });
    }

  }, []);

  return (<Provider store={store}>
    <main style={{ fontFamily: myFont.style.fontFamily, }} id="general_main_container" >
      <Component {...pageProps} />
    </main>
  </Provider>);
}
const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);
