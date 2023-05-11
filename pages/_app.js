import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.css'
// import '@/public/css/nice-select.css'
// import '@/public/css/slick.css'
// import '@/public/css/style.css'
import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from 'react-redux';
import store from '@/src/store';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import navigationData from '@/pages/navigation-data.json';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    // on initial load - run auth check 
    authCheck(router.asPath);
    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    let publicPaths = [
      '/',
      '/account/login',
      '/details/[id]',
      '/job_type/[key]',
      '/job_search',
    ];
    if (navigationData && navigationData.navigations.length > 0) {
      const navLength = navigationData.navigations.length;
      for (var i = 0; i < navLength; i++) {
        var navCategory = navigationData.navigations[i];
        publicPaths = publicPaths.concat(navCategory.navs.map(x => `/job_type/${x.key}`));
      }
    }
    
    let path = url.split('?')[0];
    if (url.indexOf('/details/') > -1)
      path = `/details/[id]`;

    if (!localStorage.getItem('_token') && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: '' }
      });
    } else {
      setAuthorized(true);
    }
  }

  return <Provider store={store}>
    {authorized &&
      <Component {...pageProps} />
    }
  </Provider>
}

export default MyApp
