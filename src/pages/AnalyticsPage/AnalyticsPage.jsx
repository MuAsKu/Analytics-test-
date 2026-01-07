import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./AnalyticsPage.css";
import Heatmap from "../../components/Heatmap/Heatmap";
import AnalyticsCards from "../../components/AnalyticsCards/AnalyticsCards";
import DonutStats from "../../components/DonutStats/DonutStats";
import RetentionOverview from "../../components/RetentionOverview/RetentionOverview";

function AnalyticsPage() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-container">
          <div className="left-column">
            <Heatmap />
            <DonutStats />
          </div>
          <div className="right-column">
            <AnalyticsCards />
            <RetentionOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
