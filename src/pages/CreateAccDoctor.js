
import { useState, useRef, useEffect } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function CreateAccDoctor() {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const userRef = useRef();
    const [errorMessage, seterrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('http://127.0.0.1:5000/doctors/', {
                email: Email,
                password: Password,
                name: "Dr. John Doe",
                specialization: "General",
                contact: "9999999999",
                hospital: "Default Hospital",
                experience: 2
            });
 
            if (response.data.status === "doctor added successfully") {
                seterrorMessage('Account created, going to login!');

                setTimeout(() => {
                    navigate('/login', { replace: true }); 
                }, 2000);                
            } else {
                seterrorMessage("Something went wrong!");
            }

        } catch (error) {
         console.error(error.response); // logs backend response for debugging
         seterrorMessage(error.response?.data?.error || "Something went wrong :/");
        }
    };  
    
    //useEffect to focus on email
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

                <form name = 'formx' onSubmit={handleSubmit}>

                    <text>
                        Doctor Sign Up
                    </text>

                    <input type = 'text' value = {Email} onChange = {(e) => setEmail(e.target.value)} placeholder = 'Username / Email Address' name = 'Username' ref = {userRef} className = 'UsernameBox' required autoComplete = 'off'/>
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

export default CreateAccDoctor;
