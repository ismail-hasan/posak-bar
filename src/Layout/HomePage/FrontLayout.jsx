import React from 'react';
import MainNav from '../../Components/MainNav';
import MainHero from '../../Components/MainHero';
import NewFooter from '../../Components/NewFooter';
import YoutubeSection from '../../Components/YoutubeSection';
import StoreCard from '../../Components/StoreCard';
import CaruselBanner from '../../Components/CaruselBanner';
import Alert from '../../Components/Alert';
import QualityTwo from '../../Components/QualityTwo';
import FrontBanner from './FrontBanner';
import Quality from '../../Components/Quality';
import Copyright from '../../DashBord/Copyright';

const FrontLayout = () => {
      return (
            <div>
                  <FrontBanner></FrontBanner>
                  <Quality></Quality>
                  <QualityTwo></QualityTwo>
                  <StoreCard></StoreCard>
                  <CaruselBanner></CaruselBanner>
                  <Alert></Alert>
                  <YoutubeSection></YoutubeSection>
                  <Copyright></Copyright>
            </div>
      );
};

export default FrontLayout;