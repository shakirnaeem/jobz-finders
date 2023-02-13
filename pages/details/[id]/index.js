import JobDetails from "@/src/screens/jobs/details";

const { API_URI } = process.env

export default function Home(props) {
  return (
    <JobDetails id={props.id}></JobDetails>
  )
}

export async function getServerSideProps(context) {
  return {
      props: { id: context.params.id }
  }
}
