import style from './style.module.css';
import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import ilustationImg from "../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Illustration } from '../../components/Ilustration';

export function NewRoom() {

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();


  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/Rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={style.newRoom}>
      <Illustration />
      <main>
        <div className={style["main-content"]}>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => {
                setNewRoom(event.target.value);
              }}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
