import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

interface props {
    preffixIcon?: any;
    suffixIcon?: any;
    onChange: (text: string) => void;
    placeholder?: string;
}

function Input(props: props) {
    const inpRef = useRef<HTMLInputElement | null>(null);
    const [text, setText] = useState("");
    const { Container, Inp, Placeholder, Icon } = components;
    const { onChange, preffixIcon, suffixIcon, placeholder } = props;

    const onTextChange = (e: any) => {
        const txt = e.target.value;
        setText(txt);
        onChange(txt);
    };

    const onInputFocus = () => {
        inpRef.current?.focus();
    };

    return (
        <Container onFocus={onInputFocus} className="flex" tabIndex={0}>
            <Icon>
                <FaUserCircle />
            </Icon>
            <main>
                {placeholder && !text && (
                    <Placeholder>{placeholder}</Placeholder>
                )}
                <Inp
                    // placeholder={placeholder}
                    value={text}
                    ref={inpRef}
                    onChange={onTextChange}
                />
            </main>
        </Container>
    );
}

const components = {
    Container: styled.div`
        background-color: #3a3a3a;
        > main {
            position: relative;
            padding: 0.25rem 1.25rem;
        }

        margin: 1rem;
        border-radius: 5px;
        /* border: none !important; */

        outline: none !important;
    `,
    Inp: styled.input`
        background-color: transparent;
        border: none !important;

        outline: none !important;
        width: 100%;
    `,
    Placeholder: styled.div`
        position: absolute;
        font-size: 0.85rem;
        top: 3.3px;
        left: 20.5px;
        user-select: none;
        cursor: text;
        /* transform: translateY(-50%); */
    `,
    Icon: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
};

export default Input;
