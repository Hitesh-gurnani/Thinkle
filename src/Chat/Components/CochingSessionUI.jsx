import React, { useState } from "react";
import styles from "../CSS/coachingsession.module.css";
import Button from "../../components/atoms/Button/Button";
import Booking from "./Booking/Booking";

function CochingSessionUI() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to your coaching session! How can I help you today?",
      sender: "coach",
      timestamp: new Date(),
    },
  ]);

  const handleOpenModal = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.coachingSessionContainer}>
        <div className={styles.sessionHeader}>
          <img
            src={
              "https://s3.ap-south-1.amazonaws.com/imagestorethinkle/linkedin/67b9ccee946efb0dea99d4dd/profile/1740559713422.67b9ccee946efb0dea99d4dd.jpg"
            }
            alt="coach"
            className={styles.coachAvatar}
          />
          <div className={styles.sessionTitle}>
            1:1 Coaching Session with Dipankar
          </div>
        </div>
        <Button className={styles.sessionButton} onClick={handleOpenModal}>
          Pending
        </Button>
      </div>

      {console.log("Modal state:", isModalOpen)}
      <Booking
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        heading="Send Booking request?"
        subHeading="You are going to send a booking session request to Dipankar"
      />
    </>
  );
}

export default CochingSessionUI;
