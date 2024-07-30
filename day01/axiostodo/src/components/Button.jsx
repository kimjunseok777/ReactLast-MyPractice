
import styled, { css } from "styled-components"


/** 
 @params size: small, medium, full
 size: 디자인 시스템에 등록된 버튼 컴포넌트의 사이즈 값
*/
const TDButton = ({size, shape, variant, children, ...rest}) => {
    return(
        <S.Button
            {...{size, shape, variant}}
            {...rest}
        >
            {children}
        </S.Button>
    )
}
export default TDButton

const variantCSS = {
    primary: css`
        background-color: #0a540a;
        color: #fff;
    `,
    secondary: css`
        background-color: #4b4be4;
        color: #fff;
    `,
    "primary-text": css`
        color: #0a540a;
        background-color: transparent;
        outline: none;
    `
}

const sizeCSS = {
    small: css`
        padding: 16px;
    `,
    medium: css`
        padding: 16px 32px;
    `,
    full: css`
        width: 100%;
        aspect-ratio: 8 / 1; //가로 8 세로 1
    `
}

const shapeCSS = {
    shape: css`
        border-radius: 8px;
    `,
    round: css`
        border-radius: 50%;
    `
}

const Button = styled.button`
        ${(obj)=> variantCSS[obj.variant]}
        ${({size})=> sizeCSS[size]}
        ${(props)=> shapeCSS[props.shape]}
`

const S = {
    Button
}