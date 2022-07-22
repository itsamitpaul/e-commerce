import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from '../helpers/AxiosInstance';
import Loader from '../helpers/Spinner';
import './Login.css';

const Login = (props) =>{

    let history = useHistory();
    let location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const validateForm = () => {
        let error = {};
        let formIsValid = true;
    
        if (typeof email !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );
          if (!pattern.test(email)) {
            formIsValid = false;
            error["email"] = "*Please enter valid email-ID.";
          }
        }
    
        if (!email) {
          formIsValid = false;
          error["email"] = "*Please enter your email-ID.";
        }
    
        if (!password) {
          formIsValid = false;
          error["password"] = "*Please enter your password.";
        }
    
        setErrors(error);
        return formIsValid;
    };

    const adminLogin = (e) =>{
        e.preventDefault();
        if(validateForm()){
            const userData = {
                email: email,
                password: password,
                userLoggedIn: true
            }
            localStorage.setItem('userData',JSON.stringify(userData));
            props.setUserLoggedIn(true);
            history.push('/');
        }
    }
    return (
        <div className="login_container">
            {showLoader && <div className='general_loader_one'><Loader showLoader={showLoader}/></div>}
            <form onSubmit={adminLogin} className="login_form">
                <div className="login_heading">Log In (Admin)</div>
                <div>
                <label className="login_label">Enter your Email</label>
                <input
                    className="login_input"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    value={email}
                />
                <div className="login_error">{errors.email}</div>
                </div>
                <div>
                <label className="login_label">Enter your Password</label>
                <input
                    className="login_input"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    value={password}
                />
                <div className="login_error">{errors.password}</div>
                </div>
                <button type="submit" className="login_button">
                    LOG IN
                </button>
            </form>
        </div>
    );
}

export default Login;