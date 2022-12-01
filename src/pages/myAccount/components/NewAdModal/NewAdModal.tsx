import "./NewAdModal.scss";
import Modal from "react-bootstrap/Modal";
import { Brands, years } from "../../../../functions/Constantes";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuth } from "../../../../Context/UserContext";

interface donationAd {
  title: string;
  location: string;
  date: string;
  description: string;
  contact: string;
  images: Array<any>;
}

function NewAdModal({ show, handleClose }: any) {
  const [ad, setAd] = useState<donationAd>({
    title: "",
    location: "",
    date: "",
    description: "",
    contact: "",
    images: [],
  });
  const user = useAuth().user;

  const [loading, setLoading] = useState<boolean>(false);

  const handleImages = (e: any) => {
    let filesD = e.files;

    setAd({ ...ad, images: Array.from(filesD) });
  };

  const createAd = async () => {
    setLoading(true);

    let finalArrayFiles = new Array();

    if (ad.images.length > 0) {
      for (let index = 0; index < ad.images.length; index++) {
        if (ad.images[index].imageUrl === undefined) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            "cars/" + uuidv4() + "/" + ad.images[index].name
          );

          // Create file metadata including the content type
          /** @type {any} */
          const metadata = {
            contentType: ad.images[index].type,
          };

          // Upload the file and metadata
          const uploadTask = await uploadBytesResumable(
            storageRef,
            ad.images[index],
            metadata
          );

          await getDownloadURL(uploadTask.ref).then((downloadURL) => {
            const data = {
              name: ad.images[index].name,
              imageUrl: downloadURL,
            };

            finalArrayFiles.push(data);
          });
        }

        if (index === ad.images.length - 1) {
          const docRef = await addDoc(collection(db, "ads"), {
            title: ad.title,
            location: ad.location,
            date: ad.date,
            description: ad.description,
            contact: ad.contact,
            images: finalArrayFiles,
            userId: user.id,
            createdAt: new Date(),
          }).then(() => {
            setAd({
              title: "",
              location: "",
              date: "",
              description: "",
              contact: "",
              images: [],
            });
            setLoading(false);
            handleClose();
          });
        }
      }
    } else {
      alert("Favor de agregar imagenes");
    }
  };

  const close = () => {
    setAd({
      title: "",
      location: "",
      date: "",
      description: "",
      contact: "",
      images: [],
    });
    handleClose();
  };

  function isNumber(char: any) {
    if (typeof char !== "string") {
      return false;
    }

    if (char.trim() === "") {
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
            <h3>Título</h3>
            <div className="input-container">
              <input
                type="text"
                name="title"
                id="title"
                value={ad.title}
                onChange={(e) => setAd({ ...ad, title: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <h3>Ubicación</h3>
            <div className="input-container">
              <input
                type="text"
                name="ad"
                id="ad"
                value={ad.location}
                onChange={(e) => setAd({ ...ad, location: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <h3>Fecha</h3>
            <div className="input-container">
              <input
                type="date"
                name="date"
                id="date"
                value={ad.date}
                onChange={(e) => setAd({ ...ad, date: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <h3>Contacto</h3>
            <div className="input-container">
              <textarea
                name="contact"
                id="contact"
                rows={6}
                value={ad.contact}
                onChange={(e) => setAd({ ...ad, contact: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <h3>Descripción</h3>
            <div className="input-container">
              <textarea
                name="description"
                id="description"
                rows={6}
                value={ad.description}
                onChange={(e) => setAd({ ...ad, description: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <h3>Imágenes</h3>
            <div className="input-container">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImages(e.target)}
              />
            </div>
            <div>
              {ad.images.length > 0 && (
                <>
                  {ad.images.map((image, index) => {
                    return (
                      <img
                        className="w-100"
                        key={"previewImage-" + index}
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="secondary-action-btn" onClick={close}>
          Cerrar
        </button>
        <button className="primary-action-btn" onClick={createAd}>
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewAdModal;
