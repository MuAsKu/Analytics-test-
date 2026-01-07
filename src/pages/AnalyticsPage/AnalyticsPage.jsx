import Sidebar from "../../components/forAnalyticsPage/Sidebar/Sidebar";
import Header from "../../components/forAnalyticsPage/Header/Header";
import "./AnalyticsPage.css";
import Heatmap from "../../components/forAnalyticsPage/Heatmap/Heatmap";
import AnalyticsCards from "../../components/forAnalyticsPage/AnalyticsCards/AnalyticsCards";
import DonutStats from "../../components/forAnalyticsPage/DonutStats/DonutStats";
import RetentionOverview from "../../components/forAnalyticsPage/RetentionOverview/RetentionOverview";

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
