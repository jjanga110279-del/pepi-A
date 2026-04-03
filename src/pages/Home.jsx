import React from 'react';
import Layout from '../components/common/Layout';
import HeroSlider from '../components/home/HeroSlider';
import Best50Section from '../components/home/Best50Section';
import EventBanner from '../components/home/EventBanner';
import NewInSlider from '../components/home/NewInSlider';
import PopularRecommended from '../components/home/PopularRecommended';
import ReviewSlider from '../components/home/ReviewSlider';

export default function Home() {
  return (
    <Layout>
      <HeroSlider />
      <Best50Section />
      <EventBanner />
      <NewInSlider />
      <PopularRecommended />
      <ReviewSlider />
    </Layout>
  );
}
