import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import '../../styles/Login.css';

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const eyeRef = useRef(null);
    const beamRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo iniciar sesión");
                }
                return response.json();
            })
            .then((responseData) => {
                login(responseData.token);
            })
            .catch((error) => {
                console.error("Error al iniciar sesión", error);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        const root = document.documentElement;

        function handleMouseMove(e) {
            if (beamRef.current) {
                let rect = beamRef.current.getBoundingClientRect();
                let mouseX = rect.right + (rect.width / 2); 
                let mouseY = rect.top + (rect.height / 2);
                let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
                let degrees = (rad * (20 / Math.PI) * -1) - 350;

                root.style.setProperty('--beamDegrees', `${degrees}deg`);
            }
        }

        function handleEyeClick(e) {
            e.preventDefault();
            document.body.classList.toggle('show-password');
            if (passwordRef.current) {
                passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
                passwordRef.current.focus();
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        if (eyeRef.current) {
            eyeRef.current.addEventListener('click', handleEyeClick);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (eyeRef.current) {
                eyeRef.current.removeEventListener('click', handleEyeClick);
            }
        };
    }, []);

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Bienvenido a HARMONY</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">Usuario:</label>
                        <div className="input-wrapper">
                            <input
                                className="input"
                                type="text"
                                id="username"
                                name="username"
                                ref={usernameRef}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                data-lpignore="true"
                            />
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Contraseña:</label>
                        <div className="input-wrapper">
                            <input
                                className="input"
                                type="password"
                                id="password"
                                name="password"
                                ref={passwordRef}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                data-lpignore="true"
                            />
                            <button type="button" id="eyeball" className="eye-button" ref={eyeRef}>
                                <div className="eye"></div>
                            </button>
                            <div id="beam" className="beam" ref={beamRef}></div>
                        </div>
                    </div>
                    <div className="form-field">
                        <button
                            type="submit"
                            id="submit"
                            className="submit-button"
                        >
                        Iniciar Sesión    
                        </button>
                        {isLoading && <p>Cargando...</p>}
                        {isError && <p>Error al cargar los datos.</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
