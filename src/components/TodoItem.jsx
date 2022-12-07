import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { cssReflection } from "../styles/common";

const keyframeItemMove = keyframes`
    0% {
        transform: translateY(100vh);
    }
    100% {
        transform: translateY(-100vh);
    }
`;
const keyframeItemMorph = keyframes`
    0%, 100% {
        border-radius: 34% 66% 36% 64% / 55% 43% 57% 45% ;
    }
    34% {
        border-radius: 70% 30% 76% 24% / 25% 65% 35% 75% ;
    }
    67% {
        border-radius: 38% 62% 26% 74% / 59% 41% 59% 41% ;
    }
`;

const Item = styled.li`
    /* todo li */
    list-style: none;
    width: 100px;
    height: 100px;
    margin: 0 4px;

    animation: ${keyframeItemMove} linear infinite;
    animation-duration: ${({ animationDuration }) => animationDuration / 1}s;

    :hover {
        /* hover 하면 멈추기 */
        animation-play-state: paused;
    }
    ::before {
        ${cssReflection}
        width: 20px;
        height: 20px;
        left: 30px;
        top: 15px;
    }
`;
const Label = styled.label`
    /* todo label */
    color: #fff;
    line-height: 1.2em;
    letter-spacing: 0.1em;
    font-size: 0.8em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    cursor: pointer;
    animation: ${keyframeItemMorph} linear infinite;
    animation-duration: ${({ animationDuration }) => animationDuration / 5}s;

    ${({ isDone }) => (isDone ? cssDoneTodo : cssUndoneTodo)}
`;
const cssDoneTodo = css`
    background-color: #ff2d75;
    box-shadow: inset 10px 10px rgba(89, 28, 97, 0.05), 15px 25px 10px rgba(78, 4, 107, 0.1), 15px 20px 20px rgba(187, 13, 178, 0.1), inset -10px -10px 15px rgba(221, 209, 215, 0.5);
`;
const cssUndoneTodo = css`
    background-color: #4fc3dc;
    box-shadow: inset 10px 10px rgba(1, 180, 255, 0.05), 15px 25px 10px rgba(1, 180, 255, 0.1), 15px 20px 20px rgba(1, 180, 255, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5);
`;

export default function TodoItem({ data, setTodoData }) {
    const checkboxRef = useRef(null);

    const [animationDuration, setAnimationDuration] = useState(0);

    const onTodoItemClick = () => {
        setTodoData((prevArr) =>
            prevArr.map((prevData) => {
                if (prevData.id === data.id) {
                    return {
                        ...prevData,
                        isDone: checkboxRef.current.checked,
                    };
                }
                return prevData;
            })
        );
    };

    useEffect(() => {
        if (data.isDone) {
            checkboxRef.current.checked = true;
        }
        setAnimationDuration(125 / (Math.random() * 19 + 1));
    }, []);

    const onTodoItemDoubleClick = () => {
        setTodoData((prevArr) => prevArr.filter((prevData) => prevData.id !== data.id));
    };

    useEffect(() => {
        if (data.isDone) {
            checkboxRef.current.checked = true;
        }
    }, []);

    return (
        <Item reflectionOpacity={0.45} animationDuration={animationDuration}>
            <Label onClick={onTodoItemClick} onDoubleClick={onTodoItemDoubleClick} isDone={data.isDone} animationDuration={animationDuration}>
                <input ref={checkboxRef} type="checkbox" className="sr-only" />
                {data.text}
            </Label>
            {data.isDone}
        </Item>
    );
}
