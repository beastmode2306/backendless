import React, {useEffect, useState} from 'react';
import Backendless from "backendless";
import Navbar from "../Navbar";

const Friends = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('8FB4F1E2-8E43-C930-FF28-8337A82F9500', '78C66327-A0B6-42BF-8644-D6BE33B42CA9');

    const [users, setUsers] = useState<any>()
    const [user, setUser] = useState<any>()
    const [findUser, setFindUser] = useState<any>()
    const [id, setId] = useState("")

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then(response => {
            setUser(response)
        })
        Backendless.Data.of("Users").find().then(response => setUsers(response))
    }, [])

    const findById = () => {
        Backendless.Data.of("Users").findById({objectId: id}).then((response) => {
            setFindUser(response)
        })
    }

    return (
        <>
            <Navbar/>
            <div style={{margin: "10px", display: "flex", justifyContent: "space-around"}}>
                <div>
                    <div style={{marginBottom: "10px"}}>
                        Друзья
                    </div>
                    {user?.friends.map((friend: { id: string, accept: boolean }) =>
                        <div style={{padding: "10px", marginBottom: "10px"}} key={friend.id}>
                            ID друга
                            {" " + friend.id}
                            <div>
                                Статус заявки
                                <div>
                                    {friend.accept ? "В друзьях" : "Заявка отправлена"}
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary">Удалить</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        Найти / Добавить друга
                        <input className="form-control" style={{marginBottom: "10px"}} placeholder="Введите ID друга"
                               value={id} onChange={(e) => setId(e.target.value)}/>
                        <button className="btn btn-primary" onClick={findById}>Найти</button>
                        <div>
                            <div>Имя {findUser?.name} </div>
                            <div>Почта {findUser?.email} </div>
                            <div>Гендер {findUser?.gender} </div>
                            <div>Возраст {findUser?.age} </div>
                            <button className="btn btn-primary">Добавить в друзья</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Friends;