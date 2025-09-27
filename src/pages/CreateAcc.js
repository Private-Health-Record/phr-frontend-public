import { useState, useRef, useEffect } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


function Login() {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const userRef = useRef();
    const [errorMessage, seterrorMessage] = useState('');

    const navigate = useNavigate();

    // link this with database

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {

    //         const response = await axios.post('', {
    //             newUsername: Username,
    //             newPassword: Password
    //         });
 
    //         if (response.data.success){

    //             seterrorMessage('Account created, going to login!');

    //             setTimeout(() => {
    //                 navigate('/login', { replace: true }); 
    //             }, 2000);                
    //         }

    //         else {
    //             seterrorMessage(response.data.message);
    //         }

    //     } catch (error) {
            
    //         if (error.response && error.response.data && error.response.data.message) {
    //             seterrorMessage(error.response.data.message);
    //         } else {
    //             seterrorMessage("Something went wrong :/");
    //         }
    //         console.error(error);
    //     }
    // };  
    
    //useEffect to focus on username
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //useEffect to scroll room to top after each render
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth' });
    }, [])

    return(

        <div className = 'OuterBox'>

            <div className = 'LoginBox'>

                {errorMessage && <div className = "ErrorMessage"> {errorMessage} </div>}

                <form name = 'formx'>

                    <input type = 'text' value = {Username} onChange = {(e) => setUsername(e.target.value)} placeholder = 'Username / Email Address' name = 'Username' ref = {userRef} className = 'UsernameBox' required autoComplete = 'off'/>
                    <input type = 'password' value = {Password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'Password' name = 'Password' className = 'PasswordBox' required/>
                    <br />
                    <button name = 'LoginButton' type = 'submit' className = 'LoginButton' >
                        Sign Up! 
                    </button>

                </form>

            </div>

            <div className = 'CreateAccountBox'>
                <p>
                    Back to <Link to = '/'> Login </Link>
                </p>
            </div>

        </div>

    );

};

export default Login;