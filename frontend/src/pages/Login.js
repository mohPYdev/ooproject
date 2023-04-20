import React, {useState} from 'react';
import './Login.css'

import { useLogin } from '../hooks/useLogin'

function Login() {
    const {login, isPending, error} = useLogin()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const clearForm = () => {
      setUsername('')
      setPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
        clearForm()
    }
    return ( <>
    <div className="auth-wrapper login text-end">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3 className='fw-bold'>ورود</h3>
          <div className="mb-3">
            <label className='fw-bold'>نام کاربری</label>
            <input type="text" className="form-control text-end" placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label className='fw-bold'>رمزعبور</label>
            <input
              type="password"
              className="form-control text-end"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="d-grid mt-4 fw-bold">
            <button type="submit" className="btn btn-primary">
              ورود
            </button>
          </div>
          {error && <p className="btn btn-danger mt-2">
            {error}
          </p>}
        </form>
      </div>
    </div>
    </> );
}

export default Login;