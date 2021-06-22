import ilustationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import {Button} from '../components/Button';

export function NewRoom (){
    return (
        <div id="page-auth">
        <aside>
            <img src={ilustationImg} alt="Ilustração snbolizando perguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as duvidas da sua audiencia em tempo real.</p>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="Letmeask" />
                <h2>Criar uma nova sala</h2>
                <form>
                    <input 
                        type="text" 
                        placeholder="Nome da sala"
                    />
                    <Button type="submit">
                        Criar sala
                    </Button>
                </form>
                <p>
                    Quer entrar em uma sala existente? <a href="#">clique aqui</a>
                </p>
            </div>
        </main>
    </div>
    )
}