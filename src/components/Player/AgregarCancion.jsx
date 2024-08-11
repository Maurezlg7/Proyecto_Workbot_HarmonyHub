import React from 'react';
import '../../styles/AgregarCancion.css';

function AgregarCancion({ handleSubmit, handleInputChange, handleFileChange, newSong }) {
    return (
        <form onSubmit={handleSubmit} className="AddSongForm">
            <div className="formGroup">
                <label htmlFor="title">TÍTULO:</label>
                <input 
                    id="title"
                    type="text" 
                    name="title" 
                    value={newSong.title} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="formGroup">
                <label htmlFor="year">AÑO DE LANZAMIENTO:</label>
                <input 
                    id="year"
                    type="number" 
                    name="year" 
                    value={newSong.year} 
                    onChange={handleInputChange} 
                    required 
                />
            </div>
            <div className="formGroup">
                <label htmlFor="album">ÁLBUM:</label>
                <input 
                    id="album"
                    type="text" 
                    name="album" 
                    value={newSong.album} 
                    onChange={handleInputChange}
                />
            </div>
            <div className="fileInputContainer">
                <input 
                    id="file"
                    type="file" 
                    name="file" 
                    accept="audio/mp3" 
                    onChange={handleFileChange} 
                    required 
                />
                <label htmlFor="file" className="fileInputLabel">Selecciona un archivo MP3</label>
            </div>
            <button type="submit" className="submitButton">AÑADIR CANCIÓN</button>
        </form>
    );
}

export default AgregarCancion;
