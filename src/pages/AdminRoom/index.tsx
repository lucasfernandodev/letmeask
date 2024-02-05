import style from './style.module.css';
import { useParams, useHistory } from "react-router-dom";

import answerImg from "../../assets/images/answer.svg";
import { CheckSVG } from "../../components/CheckSVG";
import deleteImg from "../../assets/images/delete.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode/index.tsx";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import AnswerSVG from '../../components/AnswerSVG';
import DeleteSVG from '../../components/DeleteSVG';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);


  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja apagar essa pergunta")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id={style['page-room']}>
      <header>
        <div className={style.content}>
          <img src={logoImg} alt="Letmeask" />
          <div className={style.groupButtons}>
            <RoomCode code={roomId} />
            <Button className={style.btnEncerrar} isOutlined onClick={handleEndRoom}>
              Encerrar
            </Button>
          </div>
        </div>
      </header>

      <main className={style.content}>
        <div className={style['room-title']}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={style['question-list']}>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswer={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <div className={style.actions}>
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <CheckSVG />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <AnswerSVG />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    className={style.delete}
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <DeleteSVG />
                  </button>
                </div>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
