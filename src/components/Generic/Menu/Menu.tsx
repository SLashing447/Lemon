import { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

interface props {
    pos: {
        x: number;
        y: number;
    };
    style?: any;
    forMobile?: boolean;
    kill: () => void;
    children: any;
    backDropZIndex?: number;

    align?: "left" | "right";
}

function Menu(props: props) {
    const { children, kill, align } = props;
    const style = props.style || {};
    const backDropZIndex = props.backDropZIndex || 6;
    const MenuZIndex = backDropZIndex + 2;

    var pos = props.pos;
    const { Backdrop, MenuUi } = components;
    const [anim, setAnim] = useState("navMenuShowAnim 0.13s linear");
    const ref = useRef<HTMLDivElement | null>(null);

    const onKill = () => {
        setAnim("navMenuHideAnim 0.13s linear");
        setTimeout(() => kill(), 120);
    };

    const __a = () =>
        align === undefined
            ? { right: `${pos.x}px`, top: `${pos.y}px` }
            : align === "right"
            ? { right: `${pos.x}px`, top: `${pos.y}px` }
            : { left: `${pos.x}px`, top: `${pos.y}px` };

    return (
        <>
            <Backdrop
                style={{ position: "fixed", zIndex: backDropZIndex }}
                onClick={onKill}
                onContextMenu={onKill}
            />
            <MenuUi
                ref={ref}
                style={{
                    ...style,
                    ...__a(),
                    position: "absolute",
                    transformOrigin: `top ${align || "right"}`,
                    zIndex: MenuZIndex,
                }}
                anim={anim}
                pos={pos}
                className="flex col"
            >
                {children}
            </MenuUi>
        </>
    );
}

const components = {
    Backdrop: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    `,
    MenuUi: styled.div<{ pos: { x: number; y: number }; anim: string }>`
        position: absolute;
        /* top: ${(props) => props.pos.y}px;
        right: ${(props) => props.pos.x}px; */
        padding: 0.5rem 0.25rem;

        background-color: #222222;
        /* background-color: var(--bg-p5); */
        backdrop-filter: blur(10px);
        gap: 0.15rem;
        border-radius: 7px;
        /* transform-origin: top right;/ */
        animation: ${(props) => props.anim};
        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);

        @keyframes navMenuShowAnim {
            from {
                opacity: 0;
                scale: 0.6;
            }
            to {
                opacity: 1;
                scale: 1;
            }
        }
        @keyframes navMenuHideAnim {
            to {
                opacity: 0;
                scale: 0.6;
            }
            from {
                opacity: 1;
                scale: 1;
            }
        }

        @keyframes navMenuItemAnim {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        > li {
            transition: 0.1s all ease;
            list-style-type: none;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 7px;
            animation: navMenuItemAnim 0.5s 0s both;

            :active {
                scale: 0.99;
            }
            user-select: none;
            :hover {
                background-color: var(--bg-accent);
            }
            /* border: 1px solid white; */
        }
        > li.red:hover {
            background-color: #a1212153;
        }
        > li.yellow:hover {
            background-color: #ffe1002e;
        }
    `,
};

export default Menu;
