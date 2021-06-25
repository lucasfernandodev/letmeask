import { useEffect } from "react";
import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import "../styles/rooms.scss";

import {Question} from '../components/Question'
import {useRoom} from '../hooks/useRoom'



type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const {questions, title} = useRoom(roomId)


  async function handleCreateSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged  in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
          <RoomCode code={roomId} />
          <Button isOutlined>Encerrar</Button>
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
              />
            )
          })
        }
        </div>
      </main>
    </div>
  );
}
