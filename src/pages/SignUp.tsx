import React, {useState} from 'react';
import Backendless from "backendless";
import Navbar from "../Navbar";

const SignUp = () => {

    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp('8FB4F1E2-8E43-C930-FF28-8337A82F9500', '78C66327-A0B6-42BF-8644-D6BE33B42CA9');

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [country, setCountry] = useState("")
    const [gender, setGender] = useState("")
    const reg = () => {
        const user = new Backendless.User()
        user.email = email
        user.password = password
        // @ts-ignore
        user.name = name
        // @ts-ignore
        user.age = age
        // @ts-ignore
        user.country = country
        // @ts-ignore
        user.gender = gender
        Backendless.UserService.register(user).then((response) => {
            Backendless.Files.upload("reg.txt", `users/${name}`)
            Backendless.Files.upload("reg.txt", `users/${name}/sharedWithMe`)
        })
    }

    return (
        <div>
            <Navbar/>
            <div style={{margin: "10px"}}>
                <div style={{marginBottom: "10px"}}>Регистрация</div>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="email"
                       onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="password"
                       type="password"
                       onChange={(e) => setPassword(e.target.value)} value={password}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="name"
                       onChange={(e) => setName(e.target.value)} value={name}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="age"
                       onChange={(e) => setAge(e.target.value)} value={age}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="country"
                       onChange={(e) => setCountry(e.target.value)} value={country}/>
                <input className="form-control" style={{width: "15%", marginBottom: "10px"}} placeholder="gender"
                       onChange={(e) => setGender(e.target.value)} value={gender}/>
                <button onClick={reg} style={{width: "15%", backgroundColor: "transparent"}}>Reg</button>
            </div>
        </div>
    );
};

export default SignUp;