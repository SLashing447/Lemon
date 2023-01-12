import { useState, useRef } from "react";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import createRipple from "../../components/Generic/createRipple/createRipple";
import { AccountUi } from "../SignIn/SignIn";

function SignUp() {
    const [step, setStep] = useState(0);
    const { Input, Button, Header, Inp } = AccountUi;
    const [email, setEmail] = useState<string>("");
    const inpRefs = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const isAllRight = () => {
        if (step === 0 && email?.trim() !== "") {
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

                            wordBreak: "break-all",
                        }}
                    >
                        <span>Enter the OTP sent on</span> <span>{email}</span>
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
                            tabIndex={-1}
                            type="text"
                        />
                    </Input>
                </>
            )}{" "}
            <Button tabIndex={0} onClick={onClick}>
                {step !== 3 ? "Next" : "Finish"}
            </Button>
        </>
    );
}

export default SignUp;
