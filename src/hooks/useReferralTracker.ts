import { useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';

export const useReferralTracker = () => {
  const [referrals, setReferrals] = useState(currentUser.referrals);
  const [points, setPoints] = useState(currentUser.points);
  const [badge, setBadge] = useState(currentUser.badge);

  // Logic to determine badge based on referral count
  useEffect(() => {
    if (referrals >= 50) {
      setBadge('Guardian');
    } else if (referrals >= 10) {
      setBadge('Catalyst');
    } else {
      setBadge('Spark');
    }
    
    // Example: Each referral is worth 100 points
    setPoints(referrals * 100);
  }, [referrals]);

  const addReferral = () => {
    setReferrals(prev => prev + 1);
    // In a real app, this would also update a database
  };

  return {
    referrals,
    points,
    badge,
    addReferral
  };
};