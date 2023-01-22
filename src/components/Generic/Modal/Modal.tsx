import { useState } from "react";
import styled from "styled-components";

function Modal(props: { children: any; kill: () => void }) {
    const { ModalUI, Backdrop } = components;
    const [anim, setAnim] = useState("showModalAnim 0.15s linear");
    const { children, kill } = props;

    const _kill = () => {
        setAnim("hideModalAnim 0.15s linear");
        setTimeout(() => kill(), 140);
    };

    return (
        <>
            <Backdrop onClick={_kill} onContextMenu={kill} />
            <ModalUI anim={anim}>{children}</ModalUI>
        </>
    );
}
const components = {
    Backdrop: styled.div`
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0.006);

        z-index: 5;
    `,
    ModalUI: styled.div<{
        anim: string;
    }>`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        padding: 0.5rem 2rem;

        /* background-color: ; */

        gap: 0.15rem;
        border-radius: 7px;
        /* transform-origin: top right;/ */
        animation: ${(props) => props.anim};
        background-color: #1c1c1c;
        box-shadow: 0 0 0.2rem black;

        outline: none !important;

        @keyframes showModalAnim {
            from {
                transform: translate(-50%, -30%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
        }
        @keyframes hideModalAnim {
            to {
                transform: translate(-50%, -70%);
                opacity: 0;
            }
            from {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
        }

        > li {
            list-style-type: none;
        }
    `,
};
export default Modal;
