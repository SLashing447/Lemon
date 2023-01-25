import Main from "./components/Main/Main";
import "./style/Base/base.css";
import "./style/Global/global.css";
import "./assets/addon/addOn.css";
import Account from "./Account/Account";
import Input from "./components/Generic/Input/Input";
import { useState } from "react";
// import { firestore } from "./firebase/firebase";
import { collection, addDoc } from "@firebase/firestore";

function App() {
    const user = true;

    // const ref = collection(firestore, "messages");

    // const [text, setText] = useState("");

    // const onClick = () => {
    //     let data = {
    //         msg: text,
    //     };
    //     addDoc(ref, data);
    // };

    // return (
    //     <>
    //         <input
    //             value={text}
    //             onChange={(e) => setText(e.target.value)}
    //             type="text"
    //         />
    //         <button onClick={onClick}>Send</button>
    //     </>
    // );

    return <>{user ? <Main /> : <Account />}</>;
}

export default App;
