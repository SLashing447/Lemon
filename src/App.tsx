import Main from "./components/Main/Main";
import "./style/Base/base.css";
import "./style/Global/global.css";
import "./style/colors/colors.css";
import Account from "./Account/Account";

function App() {
    const user = true;

    return <>{user ? <Main /> : <Account />}</>;
}

export default App;
