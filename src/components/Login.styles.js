import styled from "styled-components";

export const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 320px;
    margin: 20px auto;
    padding: 20px;
    color: var(--darkGrey);
    background: var(--lightGrey);
    border-radius: 20px;

    label {
        width: 100%;
        font-size: 1.2rem;
        margin: 10px 0;
    }


    input {
        width: 100%;
        height: 30px;
        border: 1px solid var(--darkGrey);
        border-radius: 20px;
        padding: 10px;
    }


    .error {
        color: red;
        font-size: 1.2rem;
        margin: 10px 0;
    }



`;