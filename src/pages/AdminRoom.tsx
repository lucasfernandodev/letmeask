import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import "../styles/rooms.scss";

import {Question} from '../components/Question'
import {useRoom} from '../hooks/useRoom'

import deleteImg from '../assets/images/delete.svg'
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newQuestion, setNewQuestion] = useState("");
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId)

  async function handleEndRoom(){
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja apagar essa pergunta')){
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        


        <div className="question-list">
        {
          questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content} 
                author={question.author}
              >
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Excluir pergunta" />
                </button>
              </Question>
            )
          })
        }
        </div>
      </main>
    </div>
  );
}
