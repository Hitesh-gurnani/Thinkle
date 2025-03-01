import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import ContentSubmission from "./components/organisms/ContentManagement/ContentSubmission";
import Sidebar from "./components/organisms/Sidebar/Sidebar";
import UploadContent from "./components/organisms/UploadNewContent/UploadContent";

function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/coaches" element={<div>Coaches</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/earnings" element={<div>Earnings</div>} />
          <Route
            path="/submissions"
            element={
              <>
                <div>
                  <div className={styles.title}>Thinkle+ Creator</div>
                  <div className={styles.subheading}>
                    Create Content that generate revenue for you
                  </div>
                </div>
                <UploadContent />
                <ContentSubmission />
              </>
            }
          />
          <Route path="/refer" element={<div>Refer</div>} />
          <Route path="/trending" element={<div>Trending</div>} />
          <Route path="/help" element={<div>Help</div>} />
          <Route path="/profile" element={<div>Profile</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
