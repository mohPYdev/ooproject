import React ,{ useState}  from 'react'
import './SignUp.css'
import {useSignup } from '../hooks/useSignup'
import  Alert  from 'react-bootstrap/Alert';

function SignUp() {
  // const Alert = React.lazy(()=>import('react-bootstrap/Alert'))
  const { signup, isPending, error } = useSignup()
  const [fname,
    setFname] = useState('');
  const [lname,
    setLname] = useState('');
  const [username,
    setUsername] = useState('');
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [phone_number,
    setPhoneNumber] = useState('');
  const clearForm = () => {
    setFname('')
    setLname('')
    setUsername('')
    setEmail('')
    setPassword('')
    setPhoneNumber('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, username, fname, lname, phone_number)
    clearForm()
  }
  return (<>
    {isPending ?
      (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) :
      <div className="auth-wrapper signup text-end">
        <div className="auth-inner" id='form'>
          <form onSubmit={handleSubmit} className='p-3 bg-white rounded-3'>
            <h3 className='text-center fw-bold'>ثبت نام</h3>
            <div className='row mt-4'>
              <div className='col'>
                <div className="mb-3">
                  <label className='fw-bold'>
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    className="form-control text-end"
                    placeholder="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className='fw-bold'>ایمیل</label>
                  <input
                    type="email"
                    className="form-control text-end"
                    placeholder="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label className='fw-bold'>رمز عبور</label>
                  <input
                    type="password"
                    className="form-control text-end"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className='fw-bold'>شماره تلفن</label>
                  <input
                    type="number"
                    className="form-control text-end"
                    placeholder="شماره تلفن"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fw-bold" disabled={email && password && username && phone_number ? false : true}>
                ثبت نام
              </button>
            </div>
            <br />
            {error && <Alert variant={"danger"}>

              {Object.values(error)[0][0] == 'This field may not be blank.' ? 'فیلد های خالی را پر کنید' :
                Object.values(error)[0][0] == 'Enter a valid email address.' ? 'ایمیل وارد شده معتبر نمی باشد' :
                  Object.values(error)[0][0] == 'This password is too short. It must contain at least 8 characters.' ? '(رمز عبور وارد شده کوتاه می باشد ( رمز عبور می بایست حداقل از ۸ کاراکتر تشکیل شود' :
                  Object.values(error)[0][0] == 'This password is entirely numeric.' ? 'رمزعبور باید از حروف و عدد تشکیل شده باشد':
                  ''}
            </Alert>
            }

          </form>
        </div>
      </div>}
  </>);
}
export default SignUp;