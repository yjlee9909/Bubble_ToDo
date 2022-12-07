import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { cssReflection } from "../styles/common";

const Container = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;
const FormContainer = styled.div`
    position: absolute;
    width: 350px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05), 25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05), inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    border-radius: 68% 32% 69% 31% / 35% 43% 57% 65%;
    transition: 0.5s;
    z-index: 10;
    backdrop-filter: blur(5px);

    h2 {
        color: #333;
        font-size: 1.5em;
        margin-bottom: 15px;
    }
    :hover {
        border-radius: 50%;
    }

    /* 물방울 빛 반사 */
    ::before {
        ${cssReflection}
        top: 50px;
        left: 85px;
        width: 35px;
        height: 35px;
    }
    ::after {
        ${cssReflection}
        width: 15px;
        height: 15px;
        top: 90px;
        left: 110px;
    }
`;

const TodoList = styled.ul`
    /* todolist */
    display: flex;
`;

export default function Todo() {
    const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("todo")) ?? []);
    // undefined or null -> []

    useEffect(() => {
        console.log(todoData);

        /**
         * todoData가 바뀌었을 때
         * 로컬 스토리지에 저장하기
         */
        localStorage.setItem("todo", JSON.stringify(todoData));
    }, [todoData]);

    return (
        <Container>
            <FormContainer reflectionOpacity={0.8}>
                <h2>Todo Bubble</h2>
                <TodoForm setTodoData={setTodoData} />
            </FormContainer>
            <TodoList>
                {todoData.map((data) => (
                    <TodoItem key={data.id} data={data} setTodoData={setTodoData} />
                ))}
            </TodoList>
        </Container>
    );
}

/*
  [
    {
      id: "아이디",
      text: "투두 내용",
      isDone: "했는지 안했는지"
    }
  ]
*/
