import React, {useEffect, useState} from 'react';
import Backendless from "backendless";
import Navbar from "../Navbar";

const Home = () => {

        Backendless.serverURL = "https://api.backendless.com";
        Backendless.initApp('8FB4F1E2-8E43-C930-FF28-8337A82F9500', '78C66327-A0B6-42BF-8644-D6BE33B42CA9');

        const [user, setUser] = useState<any>()

        const [image, setImage] = useState<any>("")

        const handleFile = () => {
            Backendless.Files.upload(image, `users/${user.name}`).then(() => {

            }).catch((e) => {
                Backendless.Logging.getLogger("createFile").error(e.message)
            })
        }

        const [nameFolder, setNameFolder] = useState("")

        const createFolder = () => {
            Backendless.Files.upload("reg.txt", `users/${user.name}/${nameFolder}`)
        }


        const [nameFolderDelete, setNameFolderDelete] = useState("")

        const deleteFolder = () => {
            Backendless.Files.remove(`users/${user.name}/${nameFolderDelete}`)
        }

        const [list, setList] = useState<any>()

        const fetchList = () => {
            Backendless.Files.listing(`users/${user.name}/sharedWithMe`).then((response) => {
                setList(response)
            })
        }

        useEffect(() => {
            Backendless.UserService.isValidLogin()
        }, [])

        useEffect(() => {
            Backendless.UserService.getCurrentUser().then(response => {
                setUser(response)
            })
        }, [])

        return (
            <div className="App">
                <Navbar/>
                <header className="App-header">

                    <div style={{margin: "10px"}}>

                        {image &&
                        <img src={URL.createObjectURL(image)}
                             style={{width: "100px", height: "100px", objectFit: "contain"}}
                             alt="product-img"/>
                        }
                        <input type="file" onChange={
                            (e) => setImage(e.target.files && e.target.files[0])
                        }/>
                        <button onClick={handleFile}>Отправить файл</button>

                        <div>Создать папку/файл</div>
                        <input className="form-control" placeholder="создать по имени" value={nameFolder}
                               style={{width: "15%", backgroundColor: "transparent", marginBottom: "10px"}}
                               onChange={(e) => setNameFolder(e.target.value)}/>
                        <div>
                            <button onClick={createFolder}
                                    style={{width: "15%", backgroundColor: "transparent", marginBottom: "10px"}}>Создать
                            </button>
                        </div>

                        <div>Удалить папку/файл по имени</div>
                        <div>
                            <input className="form-control" placeholder="удалить по имени" value={nameFolderDelete}
                                   style={{width: "15%", backgroundColor: "transparent", marginBottom: "10px"}}
                                   onChange={(e) => setNameFolderDelete(e.target.value)}/>
                        </div>
                        <div>
                            <button onClick={deleteFolder}
                                    style={{width: "15%", backgroundColor: "transparent", marginBottom: "10px"}}>Удалить
                            </button>
                        </div>

                        <button onClick={fetchList}
                                style={{width: "15%", backgroundColor: "transparent", marginBottom: "10px"}}>«shared with
                            me»
                        </button>
                        <div style={{display: "flex", alignItems: "center"}}>
                            {list?.map((item: any) =>
                                <div>
                                    <img src={item.publicUrl} alt=""/>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

            </div>
        );
    }
;

export default Home;