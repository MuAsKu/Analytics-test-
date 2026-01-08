import Sidebar from "../../components/forAnalyticsPage/Sidebar/Sidebar";
import Header from "../../components/forAnalyticsPage/Header/Header";
import styles from "./AnalyticsPage.module.css";
import Heatmap from "../../components/forAnalyticsPage/Heatmap/Heatmap";
import AnalyticsCards from "../../components/forAnalyticsPage/AnalyticsCards/AnalyticsCards";
import DonutStats from "../../components/forAnalyticsPage/DonutStats/DonutStats";
import RetentionOverview from "../../components/forAnalyticsPage/RetentionOverview/RetentionOverview";

function AnalyticsPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.dashboardContainer}>
          <div className={styles.leftColumn}>
            <Heatmap />
            <DonutStats />
          </div>
          <div className={styles.rightColumn}>
            <AnalyticsCards />
            <RetentionOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
