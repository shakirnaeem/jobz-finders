import JobList from '@/src/screens/admin/jobs/job-list';
const { API_URI } = process.env

export default function Home(props) {
    return (
        <JobList></JobList>
    )
}
