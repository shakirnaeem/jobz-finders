import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Footer({ children, ...pageProps }) {
    const router = useRouter()
    return <footer>
        <div className="footer-bottom-area footer-bg">
            <div className="container">
                <div className="footer-border">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-xl-10 col-lg-10 ">
                            <div className="footer-copy-right">
                                <p>
                                    Copyright ©2023 All rights reserved
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2">
                            <div className="footer-social f-right">
                                <a href="https://preview.colorlib.com/theme/jobfinderportal/#"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://preview.colorlib.com/theme/jobfinderportal/#"><i className="fab fa-twitter"></i></a>
                                <a href="https://preview.colorlib.com/theme/jobfinderportal/#"><i className="fas fa-globe"></i></a>
                                <a href="https://preview.colorlib.com/theme/jobfinderportal/#"><i className="fab fa-behance"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}