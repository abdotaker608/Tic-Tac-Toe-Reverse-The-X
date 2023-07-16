import { useGame } from "@/provider/GameProvider";
import "./styles/index.scss";

const Announcement = () => {
  const { winner } = useGame();

  if (winner === undefined) return <></>;

  return (
    <div className="announcement">
      <h2 className="announcement__title">{winner ? "AI" : "You"} Lose!</h2>
    </div>
  );
};

export default Announcement;
