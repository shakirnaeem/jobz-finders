import AdSense from "@/src/components/adsence";
import JobListing from "@/src/screens/jobs/listing";

const { API_URI } = process.env

export default function Home(props) {
  return (
    <>
      <AdSense></AdSense>
      <JobListing title="Latest Job"></JobListing>
    </>
  )
}
