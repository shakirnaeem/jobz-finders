import { useRouter } from 'next/router';
import KeywordForm from '@/src/screens/admin/keywords/keyword-form';
const { API_URI } = process.env

export default function Home(props) {
    var router = useRouter();
    const { id } = router.query;
    return (
        <>
            {id && <KeywordForm id={id}></KeywordForm>}
        </>
    )
}
