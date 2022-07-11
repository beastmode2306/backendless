import React, {useState} from 'react';
import Backendless from "backendless";
import Navbar from "../Navbar";

const SignIn = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('8FB4F1E2-8E43-C930-FF28-8337A82F9500', '78C66327-A0B6-42BF-8644-D6BE33B42CA9');

    const [emailLog, setEmailLog] = useState("")
    const [passwordLog, setPasswordLog] = useState("")

    const log = () => {
        Backendless.UserService.login(emailLog, passwordLog, true).then((response: any) => {
            console.log(response)
        }).catch((e) => {
            Backendless.Logging.getLogger("SingIn").error(e.message)
        })
    }

    const [restEmail, setRestEmail] = useState("basddff2@gmail.com")

    const help = () => {
        Backendless.UserService.restorePassword(restEmail).then((response) => {
            console.log(response)
        })
    }

    return (
        <div>
            <Navbar/>
            <div style={{margin: "10px"}}>
                <div>Вход</div>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="email"
                       onChange={(e) => setEmailLog(e.target.value)} value={emailLog}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="password"
                       onChange={(e) => setPasswordLog(e.target.value)} value={passwordLog}/>
                <div>
                    <button onClick={log} style={{width: "15%", backgroundColor: "transparent", marginBottom: "5px"}}>Log</button>
                </div>
                <div>
                    <div>
                        <input placeholder="email для восстановления пароля" type="email" style={{width: "15%", marginBottom: "10px"}} onChange={(e) => setRestEmail(e.target.value)}/>
                    </div>
                    <button onClick={help} style={{width: "15%", backgroundColor: "transparent"}}>Восстановить пароль</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;