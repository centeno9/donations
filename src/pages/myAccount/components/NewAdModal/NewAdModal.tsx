import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { ReactElement, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../config/firebase";
import { useAuth } from "../../../../Context/UserContext";
import { Brands, years } from "../../../../functions/Constantes";
import "./NewAdModal.scss";

function NewAdModal({ show, handleClose }: any) {
  interface Ad {
    brand: string;
    model: string;
    year: number;
    transmision: string;
    km: number;
    price: number;
    description: string;
    images: any;
    state: any;
    color: string;
    carType: string;
    motor: string;
    vestidure: string;
  }

  const initialAdState: Ad = {
    brand: "",
    model: "",
    year: 0,
    transmision: "",
    km: 0,
    price: 0,
    description: "",
    images: [],
    state: "",
    color: "",
    carType: "",
    motor: "",
    vestidure: "",
  };

  const [ad, setAd] = useState<Ad>({ ...initialAdState });

  const user = useAuth().user;
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const FormStep1 = () => {
    return (
      <>
        <div className="form-row">
          <h3>Marca</h3>
          <div className="input-container">
            <select
              name="brands"
              id="brands"
              value={ad.brand}
              onChange={(e) => setAd({ ...ad, brand: e.target.value })}
            >
              <option value="none">Selecciona una marca</option>
              {Brands.map((brand, index) => {
                return (
                  <option value={brand} key={"brand-" + index}>
                    {brand}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form-row">
          <h3>Modelo</h3>
          <div className="input-container">
            <input
              type="text"
              name="model"
              id="model"
              value={ad.model}
              onChange={(e) => setAd({ ...ad, model: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <h3>Año</h3>
          <div className="input-container">
            <select
              name="brands"
              id="brands"
              value={ad.year}
              onChange={(e) => setAd({ ...ad, year: parseInt(e.target.value) })}
            >
              <option value="0">Selecciona un año</option>
              {years.map((year, index) => {
                return (
                  <option value={year} key={"years-" + index}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form-row">
          <h3>Precio</h3>
          <div className="input-container">
            <input
              type="text"
              name="price"
              id="price"
              maxLength={11}
              value={ad.price}
              onChange={(e) =>
                setAd({ ...ad, price: parseInt(e.target.value) })
              }
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
      </>
    );
  };

  const FormStep2 = () => {
    return (
      <>
        <div className="form-row">
          <h3>Transmisión</h3>
          <div className="input-container">
            <select
              name="transmision"
              id="transmision"
              value={ad.transmision}
              onChange={(e) => setAd({ ...ad, transmision: e.target.value })}
            >
              <option value="none">Selecciona una opción</option>
              <option value="automatica">Automática</option>
              <option value="estandar">Estándar</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <h3>Estado de Auto</h3>
          <div className="input-container">
            <select
              name="state"
              id="state"
              value={ad.state}
              onChange={(e) => setAd({ ...ad, state: e.target.value })}
            >
              <option value="none">Selecciona una opción</option>
              <option value="nuevo">Nuevo</option>
              <option value="seminuevo">Seminuevo</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <h3>Kilometraje</h3>
          <div className="input-container">
            <input
              type="number"
              name="km"
              id="km"
              value={ad.km}
              onChange={(e) => setAd({ ...ad, km: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div className="form-row">
          <h3>Color</h3>
          <div className="input-container">
            <input
              type="text"
              name="color"
              id="color"
              value={ad.color}
              onChange={(e) => setAd({ ...ad, color: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <h3>Motor</h3>
          <div className="input-container">
            <input
              type="text"
              name="motor"
              id="motor"
              value={ad.motor}
              onChange={(e) => setAd({ ...ad, motor: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <h3>Vestidura</h3>
          <div className="input-container">
            <input
              type="text"
              name="vestidure"
              id="vestidure"
              value={ad.vestidure}
              onChange={(e) => setAd({ ...ad, vestidure: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <h3>Tipo de Auto</h3>
          <div className="input-container">
            <input
              type="text"
              name="carType"
              id="carType"
              value={ad.carType}
              onChange={(e) => setAd({ ...ad, carType: e.target.value })}
            />
          </div>
        </div>
      </>
    );
  };

  const FormStep3 = () => {
    return (
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
            <div className="image-preview-container">
              {ad.images.map((image: any, index: number) => {
                return (
                  <div>
                    <img
                      key={"previewImage-" + index}
                      className="image-preview"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const formWizardSteps: ReactElement[] = [FormStep1(), FormStep2(), FormStep3()]

  const handleImages = (e: any) => {
    let filesD = e.files;

    setAd({ ...ad, images: [...ad.images, ...Array.from(filesD)] });
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
          // let pri = price.replace(",", "").replace(",", "");

          const docRef = await addDoc(collection(db, "ads"), {
            ...ad,
            images: finalArrayFiles,
            userId: user.id,
          }).then(() => {
            setAd({ ...initialAdState });
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
    setAd({ ...initialAdState });
    handleClose();
  };

  const formatPrice = (price: number) => {
    let s = price.toString();
    let n = "";

    for (let index = 0; index < s.length; index++) {
      if (isNumber(s[index])) {
        n = n + s[index];
      }
    }

    n = n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return n;
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

  const nextStep = ()=>{
    if(step===formWizardSteps.length-1){
      return createAd()
    }
    return setStep(step+1)
  }

  const prevStep = ()=>{
    return setStep(step-1)
  }

  const isFirstStep = ()=>step===0
  const isLastStep = () =>step===formWizardSteps.length-1

  return (
    <Modal className="new-ad-modal" show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo anuncio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <>
          {formWizardSteps[step]}
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!isFirstStep() ?
          <button className={`secondary-action-btn`} onClick={prevStep}>
          Anterior
        </button>
        : <div></div>
        }
        <button className="primary-action-btn" onClick={nextStep}>
          {isLastStep() ? "Guardar" : "Siguiente"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewAdModal;
