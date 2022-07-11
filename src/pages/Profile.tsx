import React, {useEffect, useState} from 'react';
import Backendless from "backendless";
import Navbar from "../Navbar";

const Profile = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('8FB4F1E2-8E43-C930-FF28-8337A82F9500', '78C66327-A0B6-42BF-8644-D6BE33B42CA9');

    const [user, setUser] = useState<any>()

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then((response: any) => {
            setUser(response)
        })
    }, [])

    const updateUser = () => {
        Backendless.UserService.update(user)
    }

    const [x, setX] = useState("")
    const [y, setY] = useState("")
    const [desc, setDesc] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const saveGeoPoint = () => {
        Backendless.Data.of("Place").save({location: `POINT (${x} ${y})`, description: desc, imgUrl: imgUrl}).then((response) => {

        }).catch((e) => {
            Backendless.Logging.getLogger("GeoPoint").error(e.message)
        })
    }

    if (user) {
        return (
            <div style={{margin: "10px"}}>
                <Navbar/>
                <div style={{width: "25%", marginBottom: "10px", padding: "10px"}}>
                    Имя
                    <span style={{margin: "0 10px"}}>{user.name}</span>
                    <input value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                </div>
                <div style={{width: "25%", marginBottom: "10px", padding: "10px"}}>
                    Возраст
                    <span style={{margin: "0 10px"}}>{user.age}</span>
                    <input value={user.age} onChange={(e) => setUser({...user, age: e.target.value})}/>
                </div>
                <div style={{width: "25%", marginBottom: "10px", padding: "10px"}}>
                    Страна
                    <span style={{margin: "0 10px"}}>{user.country}</span>
                    <input value={user.country} onChange={(e) => setUser({...user, country: e.target.value})}/>
                </div>
                <div style={{width: "25%", marginBottom: "10px", padding: "10px"}}>
                    Гендер
                    <span style={{margin: "0 10px"}}> {user.gender}</span>
                    <input value={user.gender} onChange={(e) => setUser({...user, gender: e.target.value})}/>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <button onClick={updateUser} className="btn btn-primary">Update</button>
                </div>
                <div>
                    <div style={{marginBottom: "10px"}}>
                        <input placeholder="x" value={x} onChange={(e) => setX(e.target.value)}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <input placeholder="y" value={y} onChange={(e) => setY(e.target.value)}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <input placeholder="Описание" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <input placeholder="Ссылка на фото" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary" onClick={saveGeoPoint}>Сохранить координаты</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>loading...</div>
        )
    }
};

export default Profile;