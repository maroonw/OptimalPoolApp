import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import PoolItem from '../components/PoolItem'; // Updated import

export default function Home() {
  const [offerPools, setOfferPools] = useState([]); // Updated from offerListings
  const [salePools, setSalePools] = useState([]); // Updated from saleListings
  const [rentPools, setRentPools] = useState([]); // Updated from rentListings
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferPools = async () => {
      try {
        const res = await fetch('/api/pool/get?offer=true&limit=4'); // Updated endpoint
        const data = await res.json();
        setOfferPools(data); // Updated from setOfferListings
        fetchRentPools();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentPools = async () => {
      try {
        const res = await fetch('/api/pool/get?type=rent&limit=4'); // Updated endpoint
        const data = await res.json();
        setRentPools(data); // Updated from setRentListings
        fetchSalePools();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSalePools = async () => {
      try {
        const res = await fetch('/api/pool/get?type=sale&limit=4'); // Updated endpoint
        const data = await res.json();
        setSalePools(data); // Updated from setSaleListings
      } catch (error) {
        log(error);
      }
    };
    fetchOfferPools();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        {/* Introductory content */}
      </div>

      {/* swiper */}
      <Swiper navigation>
        {/* Swiper slides for offerPools */}
      </Swiper>

      {/* Pool results for offer, sale, and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* Display pools in each category using PoolItem components */}
      </div>
    </div>
  );
}
