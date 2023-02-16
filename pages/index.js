import JobListing from "@/src/screens/jobs/listing"
import CommonService from "@/src/services/common-service";
import { JOB_LIST } from "@/src/constants/response-type-constants";
import RequestModel from "@/src/models/request-model";

const { API_URI } = process.env

export default function Home(props) {
  return (
    <JobListing title="Latest Job"></JobListing>
  )
}
