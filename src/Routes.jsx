import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PredictiveAnalyticsDashboard from './pages/predictive-analytics-dashboard';
import TransitAuthorityIntegration from './pages/transit-authority-integration';
import RoutePlanner from './pages/route-planner';
import CommunityNetwork from './pages/community-network';
import Homepage from './pages/homepage';
import LiveTrackingDashboard from './pages/live-tracking-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityNetwork />} />
        <Route path="/predictive-analytics-dashboard" element={<PredictiveAnalyticsDashboard />} />
        <Route path="/transit-authority-integration" element={<TransitAuthorityIntegration />} />
        <Route path="/route-planner" element={<RoutePlanner />} />
        <Route path="/community-network" element={<CommunityNetwork />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/live-tracking-dashboard" element={<LiveTrackingDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
