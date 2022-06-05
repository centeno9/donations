import "./NewAdModal.scss";
import Modal from "react-bootstrap/Modal";
import { Brands, years } from "../../../../functions/Constantes";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../../../Context/UserContext";


function NewAdModal({ show, handleClose }: any) {

    const [brand, setBrand] = useState("none");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [transmision, setTransmision] = useState("none");
    const [km, setKm] = useState<number>(0);
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<Array<any>>([]);
    const [state, setState] = useState<string>("none");
    const user = useAuth().user;

    const [loading, setLoading] = useState<boolean>(false);

    const handleImages = (e: any) => {

        let filesD = e.files;

        setImages([...images, ...Array.from(filesD)]);
    }


    const createAd = async () => {
        setLoading(true);


        let finalArrayFiles = new Array();

        if (images.length > 0) {
            for (let index = 0; index < images.length; index++) {
                if (images[index].imageUrl === undefined) {

                    const storage = getStorage();
                    const storageRef = ref(storage, 'cars/' + uuidv4() + "/" + images[index].name);

                    // Create file metadata including the content type
                    /** @type {any} */
                    const metadata = {
                        contentType: images[index].type,
                    };

                    // Upload the file and metadata
                    const uploadTask = await uploadBytesResumable(storageRef, images[index], metadata);

                    await getDownloadURL(uploadTask.ref).then((downloadURL) => {
                        const data = {
                            name: images[index].name,
                            imageUrl: downloadURL
                        }

                        finalArrayFiles.push(data);
                    });

                }

                if (index === images.length - 1) {


                    let pri = price.replace(",", "").replace(",", "");


                    const docRef = await addDoc(collection(db, "ads"), {
                        brand: brand,
                        model: model,
                        year: year,
                        transmision: transmision,
                        km: km,
                        description: description,
                        images: finalArrayFiles,
                        state: state,
                        price: parseInt(pri),
                        userId: user.id
                    }).then(() => {
                        setBrand("none");
                        setModel("");
                        setTransmision("none");
                        setKm(0);
                        setYear(0);
                        setImages([]);
                        setState("none");
                        setLoading(false);
                        setPrice("")
                        handleClose();
                    });
                }
            }
        }

    }

    const close = () => {
        setBrand("none");
        setModel("");
        setTransmision("none");
        setKm(0);
        setYear(0);
        setImages([]);
        setState("none");
        setPrice("")
        handleClose();
    }

    const handleInputPrice = (e: any) => {

        let s = e.target.value;
        let n = "";

        for (let index = 0; index < s.length; index++) {
            if (isNumber(s[index])) {
                n = n + s[index];
            }

        }

        n = n.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        setPrice(n)

    }

    function isNumber(char: any) {
        if (typeof char !== 'string') {
            return false;
        }

        if (char.trim() === '') {
            return false;
        }

        return !isNaN(char as any);
    }

    return (
        <Modal className="new-ad-modal" show={show} onHide={close} centered>
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
                                <option value="none">Selecciona una opción</option>
                                <option value="automatica">Automática</option>
                                <option value="estandar">Estándar</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <h3>Transmisión</h3>
                        <div className="input-container">
                            <select name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="none">Selecciona una opción</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="seminuevo">Seminuevo</option>
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
                        <h3>Precio</h3>
                        <div className="input-container">
                            <input type="text" name="price" id="price" maxLength={11} value={price} onChange={(e) => handleInputPrice(e)} />
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
                            <input type="file" multiple accept="image/*" onChange={(e) => handleImages(e.target)} />
                        </div>
                        <div>
                            {images.length > 0 && (
                                <>
                                    {images.map((image, index) => {
                                        return (
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
                <button onClick={close}>
                    Close
                </button>
                <button onClick={createAd}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewAdModal;