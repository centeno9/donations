import "./NewAdModal.scss";
import Modal from "react-bootstrap/Modal";
import { Brands, years } from "../../../../functions/Constantes";
import { useEffect, useState } from "react";


function NewAdModal({ show, handleClose }: any) {

    const [brand, setBrand] = useState("Selecciona una marca");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [transmision, setTransmision] = useState("");
    const [km, setKm] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<Array<any>>([]);

    const handleImages = (e: any) => {
        
        console.log(e.files)
        let filesD = e.files;

        setImages([...images, ...Array.from(filesD)]);
    }

    useEffect(() => {
        console.log(images)
    }, [images]);

    return (
        <Modal className="new-ad-modal" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo anuncio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-container">
                    <div className="form-row">
                        <h3>Marca</h3>
                        <div className="input-container">
                            <select name="brands" id="brands" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="none">Selecciona una marca</option>
                                {Brands.map((brand, index) => {
                                    return (
                                        <option value={brand} key={"brand-" + index} >{brand}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Modelo</h3>
                        <div className="input-container">
                            <input type="text" name="model" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Año</h3>
                        <div className="input-container">
                            <select name="brands" id="brands" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                                <option value="0">Selecciona un año</option>
                                {years.map((year, index) => {
                                    return (
                                        <option value={year} key={"years-" + index} >{year}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Transmisión</h3>
                        <div className="input-container">
                            <select name="transmision" id="transmision" value={transmision} onChange={(e) => setTransmision(e.target.value)}>
                                <option value="automatica">Automática</option>
                                <option value="estandar">Estándar</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Kilometraje</h3>
                        <div className="input-container">
                            <input type="number" name="km" id="km" value={km} onChange={(e) => setKm(parseInt(e.target.value))} />
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Descripción</h3>
                        <div className="input-container">
                            <textarea name="description" id="description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Imágenes</h3>
                        <div className="input-container">
                            <input type="file" multiple accept="image/*" onChange={(e) => handleImages(e.target)}/>
                        </div>
                        <div>
                            {images.length > 0 &&(
                                <>
                                    {images.map((image, index) => {
                                        return(
                                            <img key={"previewImage-" + index} src={URL.createObjectURL(image)} alt="" />
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>
                    Close
                </button>
                <button onClick={handleClose}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewAdModal;