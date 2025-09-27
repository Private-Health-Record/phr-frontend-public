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

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {

    //         const response = await axios.post('', {
    //             username: Username,
    //             password: Password
    //         });

    //         if (response.data.success){
    //             navigate('/game', { replace: true, state: { username: Username } }); 
    //         }

    //         else {
    //             seterrorMessage('Incorrect credentials');
    //         }

    //     } catch (error) { 
    //         seterrorMessage('Incorrect credentials');
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
                    <input type = 'password' value = {Password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'Password' name = 'Password' className = 'PasswordBox' />
                    <br />
                    <button name = 'LoginButton' type = 'submit' className = 'LoginButton' >
                        Login
                    </button>

                </form>

            </div>

            <div className = 'CreateAccountBox'>
                <p>
                    Dont have an account? <Link to = '/CreateAccOptions'> Sign Up! </Link>
                </p>
            </div>

        </div>

    );

};

export default Login;