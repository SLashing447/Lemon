import { useState, useRef } from "react";
import { FaUserEdit, FaUserLock } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import createRipple from "../../components/Generic/createRipple/createRipple";
import { AccountUi } from "../SignIn/SignIn";

function SignUp() {
    const [step, setStep] = useState(0);
    const { Input, Button, Header, Inp } = AccountUi;
    const [email, setEmail] = useState<string>("");
    const [otp, setOTP] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCnf, setPasswordCnfm] = useState<string>("");

    const inpRefs = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const isAllRight = () => {
        if (step === 0 && email?.trim() !== "") {
            return true;
        }
        if (step === 1 && otp?.trim() !== "") {
            return true;
        }
        return false;
    };

    const onClick = (e: any) => {
        createRipple(e);
        if (step === 3) return;
        if (isAllRight()) {
            setStep(step + 1);
        }
    };

    return (
        <>
            {" "}
            <Header>
                <h1>Creat Account</h1>
            </Header>{" "}
            {step === 0 && (
                <>
                    <Input
                        onFocus={() => inpRefs[0].current?.focus()}
                        className="flex"
                        tabIndex={0}
                    >
                        <span className="icon flex flexCenter">
                            <MdOutlineAlternateEmail />
                        </span>
                        <Inp
                            placeholder="email"
                            ref={inpRefs[0]}
                            tabIndex={-1}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </Input>
                </>
            )}{" "}
            {step === 1 && (
                <>
                    <div
                        className="text flex col"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <span>Enter the OTP sent on</span>{" "}
                        <span
                            style={{
                                wordBreak: "break-all",
                            }}
                        >
                            {email}
                        </span>
                    </div>
                    <Input
                        onFocus={() => inpRefs[0].current?.focus()}
                        className="flex"
                        tabIndex={0}
                    >
                        <span className="icon flex flexCenter">
                            <MdPassword />
                        </span>
                        <Inp
                            placeholder="OTP"
                            ref={inpRefs[1]}
                            onChange={(e) => setOTP(e.target.value)}
                            tabIndex={-1}
                            type="text"
                        />
                    </Input>
                </>
            )}{" "}
            {step === 2 && (
                <>
                    <div
                        className="text flex col"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Set Your Username and Password
                    </div>
                    <Input
                        onFocus={() => inpRefs[2].current?.focus()}
                        className="flex"
                        tabIndex={0}
                    >
                        <span className="icon flex flexCenter">
                            <FaUserEdit />
                        </span>
                        <Inp
                            placeholder="Username"
                            ref={inpRefs[2]}
                            tabIndex={-1}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                        />
                    </Input>
                    <Input
                        onFocus={() => inpRefs[3].current?.focus()}
                        className="flex"
                        tabIndex={0}
                    >
                        <span className="icon flex flexCenter">
                            <FaUserLock />
                        </span>
                        <Inp
                            placeholder="Password"
                            ref={inpRefs[3]}
                            tabIndex={-1}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                        />
                    </Input>
                    <Input
                        onFocus={() => inpRefs[4].current?.focus()}
                        className="flex"
                        tabIndex={0}
                    >
                        <span className="icon flex flexCenter">
                            <FaUserLock />
                        </span>
                        <Inp
                            placeholder="Confirm Password"
                            ref={inpRefs[4]}
                            tabIndex={-1}
                            type="text"
                            onChange={(e) => setPasswordCnfm(e.target.value)}
                        />
                    </Input>
                </>
            )}{" "}
            <Button tabIndex={0} onClick={onClick}>
                {step !== 2 ? "Next" : "Finish"}
            </Button>
        </>
    );
}

export default SignUp;
