import { ReactNode } from "react";
import style from './style.module.css';
import userImage from '../../assets/images/user.svg';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswer?: boolean,
  isHighlighted?: boolean
};

export function Question({ content, author, children, isAnswer = false, isHighlighted = false }: QuestionProps) {
  return (
    <div className={`${style.question} ${isAnswer ? 'answered' : ''} ${isHighlighted ? 'Highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className={style["user-info"]}>
          <img src={author.avatar} alt={author.name} onError={el => {(el.target as HTMLImageElement).src=userImage as string}}/>
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
