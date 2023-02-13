const { API_URI } = process.env
import { useRouter } from 'next/router';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Home() {
    const errorNotify = () => toast.error("Invalid user name or password");
    const router = useRouter()

    const signinUser = async event => {
        event.preventDefault()

        var userModel = {
            userName: event.target.userName.value,
            password: event.target.password.value
        }
        const url = `${process.env.API_URI}login`

        const res = await fetch(url,
            {
                body: JSON.stringify(userModel),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        const result = await res.json()
        if (result.success) {
            localStorage.setItem('_token', result.token);
            router.push('/private/control-panel/jobs')
        }
        else {
            errorNotify();
        }

    }
    return (
        <div className="container mt-5 pt-5">
            <div className="row d-flex justify-content-center">
                <ToastContainer position="top-right" />
                <div className="col-6">
                    <form onSubmit={signinUser}>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" name="userName" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control" />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary float-right">Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
