import JobListing from "@/src/screens/jobs/listing"
import MasterLayout from "@/src/screens/shared/layout/master-layout"

const { API_URI } = process.env

export default function Home(props) {
  return (
    <MasterLayout title="Latest Job">
      <main>
        <div className="slider-area ">

          <div className="slider-active slick-initialized slick-slider">
            <div className="slick-list draggable">
              <div className="slick-track" style={{ opacity: 1, width: '1473px' }}>
                <div className="single-slider slider-height d-flex align-items-center slick-slide slick-current slick-active"
                  data-background="assets/img/hero/h1_hero.jpg" data-slick-index="0" aria-hidden="false" tabIndex="0"
                  style={{ width: '1473px', position: 'relative', left: '0px', top: '0px', zIndex: 999, opacity: 1, backgroundImage: 'linear-gradient(to right, #ccf , #eee);' }}>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-lg-9 col-md-10">
                        <div className="hero__caption">
                          <h1>Find the most exciting startup jobs</h1>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-8">

                        <form action="#" className="search-box">
                          <div className="input-form">
                            <input type="text" placeholder="Job Tittle or keyword" tabIndex="0" />
                          </div>
                          <div className="select-form">
                            <div className="select-itms">
                              <select name="select" className="nice-select" id="select1" tabIndex="0">
                                <option defaultValue={''}>Location BD</option>
                                <option defaultValue={''}>Location PK</option>
                                <option defaultValue={''}>Location US</option>
                                <option defaultValue={''}>Location UK</option>
                              </select>
                            </div>
                          </div>
                          <div className="search-form">
                            <a href="#" tabIndex="0">Find job</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-area ">
          <div className="job-listing-area pt-120 pb-120">
            <div className="container">
              <div className="row">

                <div className="col-xl-3 col-lg-3 col-md-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="small-section-tittle2 mb-45">
                        <div className="ion"> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="20px" height="12px">
                          <path fillRule="evenodd" fill="rgb(27, 207, 107)"
                            d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z">
                          </path>
                        </svg>
                        </div>
                        <h4>Filter Jobs</h4>
                      </div>
                    </div>
                  </div>

                  <div className="job-category-listing mb-50">

                    <div className="single-listing">
                      <div className="small-section-tittle2">
                        <h4>Job Category</h4>
                      </div>

                      <div className="select-job-items2">
                        <select name="select" style={{ display: 'none' }}>
                          <option defaultValue={''}>All Category</option>
                          <option defaultValue={''}>Category 1</option>
                          <option defaultValue={''}>Category 2</option>
                          <option defaultValue={''}>Category 3</option>
                          <option defaultValue={''}>Category 4</option>
                        </select>
                        <div className="nice-select" tabIndex="0"><span className="current">All Category</span>
                          <ul className="list">
                            <li data-value="" className="option selected">All Category</li>
                            <li data-value="" className="option">Category 1</li>
                            <li data-value="" className="option">Category 2</li>
                            <li data-value="" className="option">Category 3</li>
                            <li data-value="" className="option">Category 4</li>
                          </ul>
                        </div>
                      </div>


                      <div className="select-Categories pt-80 pb-50">
                        <div className="small-section-tittle2">
                          <h4>Job Type</h4>
                        </div>
                        <label className="container">View Details
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Part Time
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Remote
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Freelance
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                    </div>

                    <div className="single-listing">
                      <div className="small-section-tittle2">
                        <h4>Job Location</h4>
                      </div>

                      <div className="select-job-items2">
                        <select name="select" style={{ display: 'none' }}>
                          <option defaultValue={''}>Anywhere</option>
                          <option defaultValue={''}>Category 1</option>
                          <option defaultValue={''}>Category 2</option>
                          <option defaultValue={''}>Category 3</option>
                          <option defaultValue={''}>Category 4</option>
                        </select>
                        <div className="nice-select" tabIndex="0"><span className="current">Anywhere</span>
                          <ul className="list">
                            <li data-value="" className="option selected">Anywhere</li>
                            <li data-value="" className="option">Category 1</li>
                            <li data-value="" className="option">Category 2</li>
                            <li data-value="" className="option">Category 3</li>
                            <li data-value="" className="option">Category 4</li>
                          </ul>
                        </div>
                      </div>


                      <div className="select-Categories pt-80 pb-50">
                        <div className="small-section-tittle2">
                          <h4>Experience</h4>
                        </div>
                        <label className="container">1-2 Years
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">2-3 Years
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">3-6 Years
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">6-more..
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                    </div>

                    <div className="single-listing">

                      <div className="select-Categories pb-50">
                        <div className="small-section-tittle2">
                          <h4>Posted Within</h4>
                        </div>
                        <label className="container">Any
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Today
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Last 2 days
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Last 3 days
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Last 5 days
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="container">Last 10 days
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                    </div>
                    <div className="single-listing">

                      <div className="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow">
                        <div className="small-section-tittle2">
                          <h4>Filter Jobs</h4>
                        </div>
                        <div className="widgets_inner" />
                        <div className="range_item">

                          <span className="irs js-irs-0"><span className="irs"><span className="irs-line" tabIndex="-1"><span
                            className="irs-line-left"></span><span className="irs-line-mid"></span><span
                              className="irs-line-right"></span></span><span className="irs-min"
                                style={{ visibility: 'hidden' }}>tk. 0</span><span className="irs-max"
                                  style={{ visibility: 'hidden' }}>tk. 1.000</span><span className="irs-from"
                                    style={{ visibility: 'visible', left: '0%' }}>tk. 0</span><span className="irs-to"
                                      style={{ visibility: 'visible', left: '76.7123%' }}>tk. 941</span><span className="irs-single"
                                        style={{ visibility: 'hidden', left: '27.8539%' }}>tk. 0 - tk. 941</span></span><span
                                          className="irs-grid"></span><span className="irs-bar"
                                            style={{ left: '3.42466%', width: '87.6548%' }}></span><span className="irs-shadow shadow-from"
                                              style={{ display: 'none' }}></span><span className="irs-shadow shadow-to"
                                                style={{ display: 'none' }}></span><span className="irs-slider from" style={{ left: '0%' }}></span><span
                                                  className="irs-slider to type_last" style={{ left: '87.6548%' }}></span></span><input type="text"
                                                    className="js-range-slider irs-hidden-input" defaultValue={''} readOnly="" />
                          <div className="d-flex align-items-center">
                            <div className="price_text">
                              <p>Price :</p>
                            </div>
                            <div className="price_value d-flex justify-content-center">
                              <input type="text" className="js-input-from" id="amount" readOnly="" />
                              <span>to</span>
                              <input type="text" className="js-input-to" id="amount" readOnly="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-8">

                  <section className="featured-job-area">
                    <div className="container">

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="count-job mb-35">
                            <span>39, 782 Jobs found</span>

                            <div className="select-job-items">
                              <span>Sort by</span>
                              <select name="select" style={{ display: 'none' }}>
                                <option defaultValue={''}>None</option>
                                <option defaultValue={''}>job list</option>
                                <option defaultValue={''}>job list</option>
                                <option defaultValue={''}>job list</option>
                              </select>
                              <div className="nice-select" tabIndex="0"><span className="current">None</span>
                                <ul className="list">
                                  <li data-value="" className="option selected">None</li>
                                  <li data-value="" className="option">job list</li>
                                  <li data-value="" className="option">job list</li>
                                  <li data-value="" className="option">job list</li>
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>


                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list2.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list3.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list4.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list3.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>

                      <div className="single-job-items mb-30 border">
                        <div className="job-items">
                          <div className="company-img">
                            <a href="#"><img src="assets/img/icon/job-list4.png" alt="" /></a>
                          </div>
                          <div className="job-tittle job-tittle2">
                            <a href="#">
                              <h4>Digital Marketer</h4>
                            </a>
                            <ul>
                              <li>Creative Agency</li>
                              <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
                              <li>$3500 - $4000</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link items-link2 f-right">
                          <a href="job_details.html">View Details</a>
                          <span>7 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </MasterLayout>
  )
}
