import JobListing from '@/src/screens/jobs/listing'
import { useRouter } from 'next/router';
import path from 'path'

const { API_URI } = process.env

export default function Home(props) {
  var title = "All Jobs";
  const router = useRouter()
  const { search } = router.query;

  return (
    <JobListing searchParam={search} title={title}></JobListing>
  )
}
