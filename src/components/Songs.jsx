import { useEffect, useState, useRef } from "react";
import '../styles/Player.css';
import Opciones from './Player/Opciones';
import AgregarCancion from './Player/AgregarCancion';
import ActualizarCancion from './Player/ActualizarCancion';
import Genres from './Player/Genres';

export default function songs() {
    const [options, setOptions] = useState('Opciones');
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [artistsData, setArtistsData] = useState([]);
    const [genresData, setGenresData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [deleteSongTitle, setDeleteSongTitle] = useState('');
    const [songToUpdate, setSongToUpdate] = useState(null);
    const [updateData, setUpdateData] = useState({ title: '', year: '', album: '' });
    const [newSong, setNewSong] = useState({ title: '', year: '', file: null, album: '' });
    const [page, setPage] = useState(1);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [nextUrl, setNextUrl] = useState(null);
    const [filters, setFilters] = useState({});
    const [activeMenu, setActiveMenu] = useState(null);

    const observerRef = useRef();
    const audioRef = useRef();

    const handleClick = (option) => {
        setOptions(option);
        setPage(1);
        setNextUrl(null);
        setLoading(false);
        setSearchTitle('');
        setSongsData([]);
        setAlbumsData([]);
        setArtistsData([]);
        setGenresData([]);
    };    

    const handleSongClick = (song) => {
        if (song.song_file) {
            setCurrentSong(song.song_file);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = song.song_file;
                audioRef.current.play();
            }
        } else {
            alert('Esta canción no tiene archivo asociado.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSong({ ...newSong, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['audio/mpeg', 'audio/mp3'];
    
        if (file && allowedTypes.includes(file.type)) {
            setNewSong({ ...newSong, file });
        } else {
            alert('Por favor, selecciona un archivo MP3 válido.');
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newSong.title);
        formData.append('year', newSong.year);
        formData.append('album', newSong.album);
        if (newSong.file) {
            formData.append('file', newSong.file);
        }
    
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                },
            });
            if (!response.ok) throw new Error(`Network response was not ok: ${await response.text()}`);
            const data = await response.json();
            setSongsData([...songsData, data]);
            setNewSong({ title: '', year: '', file: null, album: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };
        

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    const handleUpdateSong = async (e) => {
        e.preventDefault();
        if (!songToUpdate) return;
        const { title, year, album } = updateData;

        const dataToUpdate = { title: title || undefined, year: year ? parseInt(year, 10) : undefined, album: album ? parseInt(album, 10) : undefined };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${songToUpdate.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                },
                body: JSON.stringify(dataToUpdate)
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const updatedSong = await response.json();
            setSongsData(songsData.map(song => song.id === updatedSong.id ? updatedSong : song));
            setSongToUpdate(null);
            setUpdateData({ title: '', year: '', album: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (songId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${songId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSongsData(songsData.filter(song => song.id !== songId));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchData = async (type) => {
        setLoading(true);
        let url = nextUrl || `${import.meta.env.VITE_API_BASE_URL}harmonyhub/${type}/?page=${page}&page_size=5&ordering=-created_at`;
        if (filters[type]) {
            url += `&${new URLSearchParams(filters[type]).toString()}`;
        }

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
            const data = await response.json();
            if (data.results) {
                if (type === 'songs') {
                    setSongsData(prevData => {
                        const newSongs = data.results.filter(song => !prevData.some(existingSong => existingSong.id === song.id));
                        return [...prevData, ...newSongs];
                    });
                } else if (type === 'albums') {
                    setAlbumsData(prevData => {
                        const newAlbums = data.results.filter(album => !prevData.some(existingAlbum => existingAlbum.id === album.id));
                        return [...prevData, ...newAlbums];
                    });
                } else if (type === 'artists') {
                    setArtistsData(prevData => {
                        const newArtists = data.results.filter(artist => !prevData.some(existingArtist => existingArtist.id === artist.id));
                        return [...prevData, ...newArtists];
                    });
                } else if (type === 'genres') {
                    setGenresData(prevData => {
                        const newGenres = data.results.filter(genre => !prevData.some(existingGenre => existingGenre.id === genre.id));
                        return [...prevData, ...newGenres];
                    });
                }
                setNextUrl(data.next);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const fetchSongsByOwner = async (ownerId) => {
        setLoading(true);
        let url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?owner=${ownerId}&page=${page}&page_size=5&ordering=-created_at`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
            const data = await response.json();
            if (data.results) {
                setSongsData(prevData => [...prevData, ...data.results]);
                setNextUrl(data.next);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (options === 'Canciones') {
            fetchSongsByOwner(65);
        } else if (options === 'Albums') {
            fetchData('albums');
        } else if (options === 'Artistas') {
            fetchData('artists');
        } else if (options === 'Generos') {
            fetchData('genres');
        }
    }, [options, filters]);

    const handleLeftArrowClick = () => {
        setCarouselIndex(prevIndex => (prevIndex === 0 ? genresData.length - 1 : prevIndex - 1));
    };
    
    const handleRightArrowClick = () => {
        setCarouselIndex(prevIndex => (prevIndex === genresData.length - 1 ? 0 : prevIndex + 1));
    };

    const handleOptionsClick = (songId) => {
        setActiveMenu(songId);
    };

    const closePopup = () => {
        setActiveMenu(null);
    };

    return (
        <div className="Secciones">
            <Opciones handleClick={handleClick} />
            <div className="Seccion_B">
                <div className="Visualizacion">
                    {options === 'Opciones' ? (
                        <div className="Conteiner_Options">
                            <button onClick={() => handleClick('Albums')} className="op-Albums op_sa">Albums</button>
                            <button onClick={() => handleClick('Canciones')} className="op-Songs op_sa">Canciones</button>
                            <button onClick={() => handleClick('Artistas')} className="op-Artists op_sa">Artistas</button>
                            <button onClick={() => handleClick('Generos')} className="op-Genres op_sa">Generos</button>
                        </div>
                    ) : options === 'Agregar Cancion' ? (
                        <AgregarCancion
                            newSong={newSong}
                            handleInputChange={handleInputChange}
                            handleFileChange={handleFileChange}
                            handleSubmit={handleSubmit}
                        />
                    ) : options === 'Actualizar Cancion' ? (
                        <ActualizarCancion
                            handleUpdateSong={handleUpdateSong}
                            handleUpdateInputChange={handleUpdateInputChange}
                            updateData={updateData}
                            setUpdateData={setUpdateData}
                            songToUpdate={songToUpdate}
                        />
                    ) : options === 'Canciones' ? (
                        <div className="Songs">
                            <div className="BusquedaContainer">
                                <div className="Buscador">
                                    <input
                                        type="text"
                                        placeholder="Buscar por título..."
                                        value={searchTitle}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchTitle(value);
                                            fetchData('songs');
                                        }}
                                    />
                                </div>
                            </div>
                            <ul>
                                {songsData
                                    .slice(0, 100)
                                    .filter(song => song.title.toLowerCase().includes(searchTitle.toLowerCase()))
                                    .map((song) => (
                                        <li key={song.id} className="song-list">
                                            <button onClick={() => handleSongClick(song)} className="btn_play_song">
                                                {song.title}
                                            </button>
                                            <button onClick={() => handleOptionsClick(song.id)} className="btn_settings">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                                </svg>
                                            </button>
                                            {activeMenu === song.id && (
                                                <div className="popup">
                                                    <button onClick={closePopup} className="popup-close">×</button>
                                                    <button onClick={() => {
                                                        setActiveMenu(null);
                                                        setSongToUpdate(song);
                                                        setUpdateData({ title: song.title, year: song.year, album: song.album });
                                                        setOptions('Actualizar Cancion');
                                                    }}>Editar Canción</button>
                                                    <button onClick={() => {
                                                        handleDelete(song.id);
                                                        setActiveMenu(null);
                                                    }}>Eliminar Canción</button>
                                                </div>
                                            )}
                                        </li>
                                    ))
                                }
                            </ul>
                            {loading && <p>Cargando más canciones...</p>}
                        </div>
                    ) : options === 'Albums' ? (
                        <div className="Portadas">
                            <ul>
                                {albumsData.map((album) => (
                                    <li key={album.id}>
                                        <button>{album.title}</button>
                                    </li>
                                ))}
                            </ul>
                            {loading && <p>Cargando más albums...</p>}
                        </div>
                    ) : options === 'Artistas' ? (
                        <div className="Portadas">
                            <ul>
                                {artistsData.map((artist) => (
                                    <li key={artist.id}>
                                        <button>{artist.name}</button>
                                    </li>
                                ))}
                            </ul>
                            {loading && <p>Cargando más artistas...</p>}
                        </div>
                    ) : options === 'Generos' ? (
                        <Genres
                            handleLeftArrowClick={handleLeftArrowClick}
                            handleRightArrowClick={handleRightArrowClick}
                            carouselIndex={carouselIndex}
                            genresData={genresData}
                        />
                    ) : null}
                </div>
                {currentSong && (
                    <div className="Play_Song">
                        <div className="Song">
                            <audio controls ref={audioRef} src={currentSong}></audio>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
