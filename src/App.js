import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import { selectThemeKey } from './store/theme/theme.selector';

import { getInfrastructureStart } from './store/infrastructure/infrastructure.action';
import { getReservationsStart } from './store/reservation/reservation.action';

import WelcomePage from './routes/welcome-page/welcome-page.component';
import InfrastructurePage from './routes/infrastructure-page/infrastructure-page.component';
import ReservationsPage from './routes/reservations-page/reservations-page.component';
import SimulationPage from './routes/simulation-page/simulation-page.component';
import ChargePlanPage from './routes/charge-plan-page/charge-plan-page.component';
import Navigation from './routes/navigation/navigation.component';


import { ThemeProvider } from "@mui/material";
import { THEME_DATA } from './constants/theme-names.constant';

const App = () => {
  const themeKey = useSelector(selectThemeKey);
  const dispatch = useDispatch();

  // load reservations and infrastructure data
  useEffect(() => {
    dispatch(getInfrastructureStart());
    dispatch(getReservationsStart());
  }, []);

  return (
    <ThemeProvider theme={THEME_DATA[themeKey].value}>
      <Routes>
        <Route path='/' element={<WelcomePage />}></Route>

        <Route path='/app' element={<Navigation /> }>
          <Route index element={<InfrastructurePage />}></Route>
          <Route path="reservations" element={<ReservationsPage />}></Route>
          <Route path="simulation" element={<SimulationPage />}></Route>
          <Route path="chargePlan" element={<ChargePlanPage />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;