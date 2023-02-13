import JobListing from '@/src/screens/jobs/listing'
import fsPromises from 'fs/promises';
import path from 'path'

const { API_URI } = process.env

export default function Home(props) {
  var title = "Jobs In Pakistan";
  if (props.selectedNav && props.selectedNav != null) {
    title = props.selectedNav.title;
  }
  return (
    <JobListing jobs={props.jobs} title={title}></JobListing>
  )
}

export async function getServerSideProps(context) {
  const filePath = path.join(process.cwd(), 'navigation-data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  var selectedNav = null;
  var searchParam = 'pakistan';
  if (objectData && objectData.navigations && objectData.navigations.length > 0 && context.params.key) {
    const navLength = objectData.navigations.length;
    for (var i = 0; i < navLength; i++) {
      var navCategory = objectData.navigations[i];
      var innderNavList = navCategory.navs.filter(y => y.key.toLowerCase() == context.params.key.toLowerCase());
      if (innderNavList.length > 0) {
        selectedNav = innderNavList[0];
        break;
      }
    }
  }
  if (selectedNav != null)
    searchParam = selectedNav.search;

  const res = await fetch(`${API_URI}jobs/getJobs?searchkey=${searchParam.toLocaleLowerCase()}`)
  const jobs = await res.json();
  return {
    props: { jobs, selectedNav: selectedNav }
  }
}
