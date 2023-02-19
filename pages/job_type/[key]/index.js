import JobListing from '@/src/screens/jobs/listing'
import { useRouter } from 'next/router';
import navigationData from '@/pages/navigation-data.json';
import path from 'path'

const { API_URI } = process.env

export default function Home(props) {
  var title = "Jobs In Pakistan";
  const router = useRouter()
  const { key } = router.query;
  var selectedNav = null;
  var searchParam = 'pakistan';
  if (navigationData && navigationData.navigations.length > 0 && key) {
    const navLength = navigationData.navigations.length;
    for (var i = 0; i < navLength; i++) {
      var navCategory = navigationData.navigations[i];
      var innderNavList = navCategory.navs.filter(y => y.key.toLowerCase() == key.toLowerCase());
      if (innderNavList.length > 0) {
        selectedNav = innderNavList[0];
        break;
      }
    }
  }
  if (selectedNav != null)
    searchParam = selectedNav.search;

  if (selectedNav && selectedNav != null) {
    title = selectedNav.title;
  }
  return (
    <JobListing searchParam={searchParam} title={title}></JobListing>
  )
}
