import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../libs/styles/common";
import TDButton from "../../../components/Button";
import { useTodo } from "providers/todo-provider";

const AddTodoModal = ({ setIsOpenAddTodoModal }) => {

  const {addTodo, getTodo} = useTodo()

  /**
   * @description
   * @param {*} event FormEvent
   */
  const onPressAddTodo = async (event) => {
    event.preventDefault();

    //-------------------------------------------------------------------------
    // axios2 수업 :

    const {title, content} = event.target
    await addTodo({
      title: title.value,
      content: content.value
    }) //--> 성공하지 않으면 에러가 발생하니까 밑의 코드가 작동을 하지 않는다
    setIsOpenAddTodoModal(false)
    await getTodo() //-->  추가되고 조회를 다시 하는 것이다

    //-------------------------------------------------------------------------
  };

  return (
    <S.Modal>
      <S.Form onSubmit={onPressAddTodo}>
        <S.Title>
          <h1>ADD TODO LIST</h1>
          <button type="button" onClick={() => setIsOpenAddTodoModal(false)}>
            x
          </button>
        </S.Title>
        <S.Content>
          <input name="title" placeholder="제목을 입력해주세요" />
          <textarea name="content" placeholder="할 일을 입력해주세요" />
        </S.Content>
        <TDButton variant={"primary"} size={"full"}>
          {/* {state.loading ? "Loading..." : "ADD"} */}
        </TDButton>
        {/* {state.error && state.error.message} */}
      </S.Form>
    </S.Modal>
  );
};
export default AddTodoModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Form = styled.form`
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

const Title = styled.div`
  font-size: 24px;
  ${flexAlignCenter};
  justify-content: space-between;

  & > button {
    border: none;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Content = styled.div`
  ${flexCenter};
  margin-top: 16px;
  flex-direction: column;

  & > input {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  & > textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 16px;
  }
`;

const S = {
  Modal,
  Form,
  Content,
  Title,
};
