import JobListing from "@/src/screens/jobs/listing"
import CommonService from "@/src/services/common-service";
import { JOB_LIST } from "@/src/constants/response-type-constants";
import RequestModel from "@/src/models/request-model";

const { API_URI } = process.env

export default function Home(props) {
  return (
    <JobListing jobs={props.jobs} title="Latest Job"></JobListing>
  )
}

export async function getServerSideProps(context) {
  var jobResponse = [];
  var request = new RequestModel();
  request.queryModel = {};
  request.responseType = JOB_LIST;

  var queryParam = CommonService.toQueryString(request);
  var url = `${API_URI}jobs?${queryParam}`;
  const res = await fetch(url)
  const jobs = await res.json();
  if (jobs.success) jobResponse = jobs.data;
  return {
    props: { jobs: jobResponse }
  }
}
