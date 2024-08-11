import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import useFetch from "./hooks/useFetch";
import '../styles/Profile.css';


function Profile() {
    const navigate = useNavigate();
    const { token } = useAuth("state");
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingState, setIsEditingState] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const dobRef = useRef(null);
    const bioRef = useRef(null);
    const userStateRef = useRef(null);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        data: updatedUserData,
        isLoading: loadingUpdate,
        isError: errorUpdating,
        doFetch: updateProfile,
    } = useFetch();

    const {
        data: profileImageData,
        isLoading: isLoadingUpdate,
        isError: errorProfileImage,
        doFetch: updateProfileImage,
    } = useFetch();

    const {
        data: userStates,
        isLoading: isLoadingUserStates,
        isError: isErrorUserStates,
        doFetch: fetchUserStates,
    } = useFetch(`${import.meta.env.VITE_API_BASE_URL}users/user-states/`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    const handlePlayerClick = () => {
        navigate('/songs');
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            return response.json();
        })
        .then((data) => {
            setUserData(data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [token]);

    useEffect(() => {
        if (updatedUserData && isEditingState) {
            setIsEditingState(false);
            setUserData((prevData) => ({
                ...prevData,
                state: updatedUserData.state,
            }));
        }
    }, [updatedUserData, isEditingState]);

    useEffect(() => {
        if (profileImageData) {
            setUserData((prevData) => ({
                ...prevData,
                image: profileImageData.image,
            }));
        }
    }, [profileImageData]);

    useEffect(() => {
        fetchUserStates();
    }, [fetchUserStates]);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateProfile(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    email: emailRef.current.value,
                    dob: dobRef.current.value,
                    bio: bioRef.current.value,
                }),
            }
        );
    }

    function handleStateChange(event) {
        const newUserStateID = event.target.value;

        updateProfile(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    state: newUserStateID,
                }),
            }
        );
    }

    function handleButtonClick(section) {
        setActiveSection(section);
    }

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="appContainer">
                <div className="card">
                    <div className="card">
                        {userData ? (
                            <div className="superconteiner">  
                                <div className="card" data-state={activeSection}>
                                    <div className="card-header">
                                        <div className="card-cover"></div>
                                        <img className="card-avatar" src="/assets/workboticono.jpg" alt="Avatar" />
                                        <h1 className="card-fullname">WORKBOT</h1>
                                        <h2 className="card-jobtitle">DeveloperGroup</h2>
                                    </div>
                                    <div className="card-main">
                                        <div className={`card-section ${activeSection === "about" ? "is-active" : ""}`} id="about">
                                        <div className="card-content">
                                            <div className="card-subtitle">{userData.first_name} {userData.last_name}</div>
                                            <p className="card-desc">
                                                Email: {userData.email}
                                                <br />
                                                Fecha de Nacimiento: {userData.dob}
                                                <br />
                                                Biografía: {userData.bio || "No disponible"}
                                            </p>
                                        </div>
                                        </div>
                                        <div className={`card-section ${activeSection === "experience" ? "is-active" : ""}`} id="experience">
                                        <div className="card-content">
                                            <div className="card-subtitle">Integrantes</div>
                                            <div className="card-timeline">
                                            <div className="card-item">
                                                <div className="card-item-title">Front-end Developer at <span>JotForm</span></div>
                                                <div className="card-item-desc">Raul Ríos</div>
                                            </div>
                                            <div className="card-item">
                                                <div className="card-item-title">Back-end Developer at <span>GitHub</span></div>
                                                <div className="card-item-desc">Claudia Chavarría</div>
                                            </div>
                                            <div className="card-item">
                                                <div className="card-item-title">Full-Stack Developer at <span>CodePen</span></div>
                                                <div className="card-item-desc">Mauro Gómez</div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className={`card-section ${activeSection === "contact" ? "is-active" : ""}`} id="contact">
                                        <div className="card-content">
                                            <div className="card-subtitle">CONTACTO</div>
                                            <div className="card-contact-wrapper">
                                            <div className="card-contact">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" /></svg>
                                                Catedral Basílica Salta capital CP:4400
                                            </div>
                                            <div className="card-contact">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>(387) 456-9999
                                            </div>
                                            <div className="card-contact">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <path d="M22 6l-10 7L2 6" /></svg>
                                                workbotdevelopers@gmail.com   
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="card-buttons">
                                        <button onClick={() => handleButtonClick("about")} className={activeSection === "about" ? "is-active" : ""}>ACERCA DE</button>
                                        <button onClick={() => handleButtonClick("experience")} className={activeSection === "experience" ? "is-active" : ""}>INTEGRANTES</button>
                                        <button onClick={() => handleButtonClick("contact")} className={activeSection === "contact" ? "is-active" : ""}>CONTACTO</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="subtitle">No se encontraron datos del usuario.</p>
                        )}
                    </div>
                </div>
            </div>
            <button className="btn_volver" onClick={handlePlayerClick}>Volver</button>
        </>
    );
}

export default Profile;
