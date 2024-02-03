import style from './style.module.css';
import ilustationImg from '../../assets/images/illustration.svg';

export const Illustration = () => {
  return (
    <aside className={style.illustration}>
      <img src={ilustationImg} alt="Ilustração simbolizando perguntas e respostas" />
      <strong>Toda pergunta tem uma resposta.</strong>
      <p>Aprenda e compartilhe conhecimento com outras pessoas.</p>
    </aside>
  )
}