import { useRouter } from 'next/router'
import CommonService from '@/src/services/common-service'
import Layout from '@/src/screens/shared/layout/Layout'

export default function JobListing(props) {
    const router = useRouter()
    function gotoDetails(id) {
        router.push(`/details/${id}`)
    }

    const renderJobs = () => {
        if (props.jobs instanceof Array) {
            return props.jobs.map(function (item, i) {
                return <div key={i} className="col-md-12 mb-2">
                    <div className="border rounded p-3">
                        <h5>{item.title}</h5>
                        <div className="text-muted mb-4">{formatPositions(item.positions)}</div>
                        <div className="d-flex justify-content-between text-success"><div>{item.locations}<br />{CommonService.toDateString(new Date(item.adDate))}</div>
                            <div><button className="btn btn-danger" onClick={x => gotoDetails(item._id)}>View Details</button></div></div>
                    </div>
                </div>
            }, this)
        }
    }

    const formatPositions = (positions) => {
        var positionResponse = '';
        var positionsList = positions.split('\n');
        positionsList.forEach(item => {
            if (item.indexOf('===') == -1) {
                var positionItems = item.split(' ');
                if (positionItems.length > 1)
                    positionResponse += `${positionItems[1].trim()} (${positionItems[0].trim()}) | `
            }
        });
        if (positionResponse != '') {
            positionResponse = positionResponse.substr(0, positionResponse.length - 3);
        }
        return positionResponse;
    }

    return (
        <Layout>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <h4 className="ml-3 mr-3 border-bottom pb-2 mt-3">{props.title}</h4>
                <div className="row m-0">
                    {props.jobs.length > 0 && renderJobs()}
                    { props.jobs.length == 0 &&
                        <div className="col-md-12 mb-2">
                            <div className="border rounded p-3">
                                <h6 className="text-center">No jobs found.</h6>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}