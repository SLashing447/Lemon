import Main from "./components/Main/Main";
import "./style/Base/base.css";
import "./style/Global/global.css";
import "./style/colors/colors.css";
import "./assets/addon/addOn.css";
import Account from "./Account/Account";
import Input from "./components/Generic/Input/Input";
import { useState } from "react";

function App() {
    const user = true;
    const [text, setText] = useState("");

    // return (
    //     <>
    //         <Input placeholder="Enter your name" onChange={setText} />
    //         {/* {text} */}
    //     </>
    // );
    return <>{user ? <Main /> : <Account />}</>;
}

export default App;
