import { useRouter } from 'next/router';
import JobForm from '@/src/screens/admin/jobs/job-form';
const { API_URI } = process.env

export default function Home(props) {
    var router = useRouter();
    const { id } = router.query;
    return (
        <JobForm id={id}></JobForm>
    )
}
