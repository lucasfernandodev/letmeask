import copyImg from "../../assets/images/copy.svg";
import style from './style.module.css';

type RoomCodeProps = {
  code: string
}
export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipBoard() {
    window.navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={style['room-code']} onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copy run code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
