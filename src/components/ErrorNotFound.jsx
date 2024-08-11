import '../styles/ErrorNotFound.css';
import { useNavigate } from 'react-router-dom';

function ErrorNotFound(){
    const navigate = useNavigate();
    const handlePlayerClick = () => {
        navigate('/login');
    };

    return(
        <div className='Container_All'>
            <div class="container container-star">
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-1"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
                <div class="star-2"></div>
            </div>

            <div class="container-title">
            <div class="title">
                <div class="number">4</div>
                <div class="moon">
                <div class="face">
                    <div class="mouth"></div>
                    <div class="eyes">
                    <div class="eye-left"></div>
                    <div class="eye-right"></div>
                    </div>
                </div>
                </div>
                <div class="number">4</div>
            </div>
            <div class="subtitle">Otro intento, regresa al inicio de Harmony por favor.</div>
            <button id="homeButton" onClick={handlePlayerClick}>Regresar</button>
            </div>
        </div>
    );    
}

export default ErrorNotFound;