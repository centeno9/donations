import { useAuth } from "../../../../Context/UserContext";
import "./MyInfoContent.scss";

function MyInfoContent() {

    const user = useAuth().user;

    return (
        <div className="my-info-main-container">
            <div className="profile-pic-container">
                <div className="image-container">
                    {user.profilePic !== "" && (
                        <img src={user.profilePic} alt="imagen de perfil" />
                    )}
                </div>
            </div>
            <div className="info-card">
                <div className="row">
                    <h3 className="title">Mis datos</h3>
                </div>
                <div className="row">
                    <h3>Nombre</h3>
                    <div className="input-container">
                        <input type="text" value={user.name} placeholder="Nombre" disabled={true} name="" id="" />
                    </div>
                </div>
                <div className="row">
                    <h3>Correo</h3>
                    <div className="input-container">
                        <input type="email" value={user.email} placeholder="Correo" disabled={true} name="" id="" />
                    </div>
                </div>
                <div className="row">
                    <h3>Celular</h3>
                    <div className="input-container">
                        <input type="text" value={user.phone !== null ? user.phone : ""} placeholder="Celular" disabled={true} name="" id="" />
                    </div>
                </div>
                <div className="row">
                    <button className="edit-btn">Editar</button>
                </div>
            </div>
        </div>
    );
}

export default MyInfoContent;