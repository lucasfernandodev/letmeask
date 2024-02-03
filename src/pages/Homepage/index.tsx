import style from './style.module.css';
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';

import ilustationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import { database } from '../../services/firebase';


export function Homepage() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {

    if (!user) {
      try {
        await signInWithGoogle();
        history.push('/rooms/new');
      } catch (error) {
        console.log("Error ao logar com o google", error)
      }
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exist.')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room Already close');
      return
    }

    history.push(`rooms/${roomCode}`)
  }

  return (
    <div id="page-auth" className={style.homepage}>
      <aside>
        <img src={ilustationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className={style['main-content']}>
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className={style.buttonGoogle} >
            <img src={googleIconImg} alt="ícone do Google" />
            Crie sua sala com o Google
          </button>
          <div className={style.separetor}><span>ou entre em uma sala</span></div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />


            <Button type="submit">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1H14.3333C14.7754 1 15.1993 1.17559 15.5118 1.48816C15.8244 1.80072 16 2.22464 16 2.66667V14.3333C16 14.7754 15.8244 15.1993 15.5118 15.5118C15.1993 15.8244 14.7754 16 14.3333 16H11M6.83333 12.6667L11 8.5M11 8.5L6.83333 4.33333M11 8.5L1 8.5" stroke="#FEFEFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}