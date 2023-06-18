import JobListing from "@/src/screens/jobs/listing";

const { API_URI } = process.env

export default function Home(props) {
  return (
    <>
      <JobListing title="Latest Job"></JobListing>
    </>
  )
}
