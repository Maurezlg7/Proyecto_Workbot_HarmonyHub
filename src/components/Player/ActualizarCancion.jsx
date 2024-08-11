import React from 'react';
import '../../styles/ActualizarCancion.css';

function ActualizarCancion({ handleUpdateSong, handleUpdateInputChange, updateData, setUpdateData, songToUpdate }) {
    const selectedSong = songToUpdate;

    React.useEffect(() => {
        if (selectedSong) {
            setUpdateData({ title: selectedSong.title, year: selectedSong.year, album: selectedSong.album });
        }
    }, [selectedSong, setUpdateData]);

    return (
        <div>
            {selectedSong && (
                <form onSubmit={handleUpdateSong} className="UpdateSongForm">
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={updateData.title || ''}
                            onChange={handleUpdateInputChange}
                            required
                            maxLength="255"
                        />
                    </div>
                    <div>
                        <label>Año de lanzamiento:</label>
                        <input
                            type="number"
                            name="year"
                            value={updateData.year || ''}
                            onChange={handleUpdateInputChange}
                            required
                            min="1900"
                            max="2024"
                        />
                    </div>
                    <div>
                        <label>Álbum:</label>
                        <input
                            type="number"
                            name="album"
                            value={updateData.album || ''}
                            onChange={handleUpdateInputChange}
                        />
                    </div>
                    <button type="submit">Actualizar Canción</button>
                </form>
            )}
        </div>
    );
}

export default ActualizarCancion;
