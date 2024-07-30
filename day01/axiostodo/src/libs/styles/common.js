import { css, keyframes } from "styled-components";


export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const flexAlignCenter = css`
    display: flex;
    align-items: center;
`

export const fadeIn = keyframes`
    0% {
        opacity: 0;
        /* top: 50px; */
        transform: translateY(200px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`