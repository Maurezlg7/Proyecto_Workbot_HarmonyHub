import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className='Home_Conteiner'>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap" rel="stylesheet"></link>
            <div className="container">
                <h1 className="text">BIENVENIDOS<span>DESCUBRE</span></h1>
                <h1 className="text">A<span>HARMONY</span></h1>
                <h1 className="text">DISFRUTA<span>LLEVA</span></h1>
                <h1 className="text">SIEMPRE<span><a href="https://stacksorted.com/text-effects/minh-pham" target="_blank" rel="noopener noreferrer">CONTIGO</a></span></h1>
                <h1 className="text">LA MEJOR<span><a href="https://twitter.com/juxtopposed" target="_blank" rel="noopener noreferrer">MUSICA</a></span></h1>
            </div>

            <button id="ingresa" onClick={handleClick}>Ingresar</button>

            <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/ScrollTrigger.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/ScrollToPlugin.min.js'></script>
        </div>
    );
}
