'use client';
import { useEffect, useMemo, useState } from 'react';

export interface Badges {
  label: string;
  bg: string;
  text: string;
}

export interface PropsBadge {
  range: number;
}

export default function Badge({ range }: PropsBadge) {
  const badges = useMemo(() => [
    { label: 'Exclusive', bg: 'bg-red-100', text: 'text-red-800' },
    { label: 'Owner', bg: 'bg-red-100', text: 'text-red-800' },
    { label: 'Provider Direct', bg: 'bg-red-100', text: 'text-red-800' },
    { label: 'Best Seller', bg: 'bg-red-100', text: 'text-red-800' },
    { label: 'Promotion', bg: 'bg-green-100', text: 'text-green-800' },
    { label: 'Recommendation', bg: 'bg-green-100', text: 'text-green-800' },
    { label: 'Instant', bg: 'bg-green-100', text: 'text-green-800' },
    { label: 'Super Fast', bg: 'bg-green-100', text: 'text-green-800' },
    { label: 'Real', bg: 'bg-green-100', text: 'text-green-800' },
    { label: '30 days Refill', bg: 'bg-green-100', text: 'text-green-800' },
  ], []);

  const [randomBadges, setRandomBadges] = useState<Badges[]>([]);

  useEffect(() => {
    function getRandomBadges(badgeList: Badges[], count: number) {
      const redBadges = badgeList.filter((badge) => badge.text === 'text-red-800');
      const otherBadges = badgeList.filter((badge) => badge.text !== 'text-red-800');
      const shuffledOtherBadges = [...otherBadges].sort(() => 0.5 - Math.random());
      return [...redBadges, ...shuffledOtherBadges].slice(0, count);
    }

    // Chọn ngẫu nhiên chỉ trên client
    setRandomBadges(getRandomBadges(badges, range));
  }, [range, badges]);

  return (
    <>
      {randomBadges.map((badge, index) => (
        <span
          key={index}
          className={`${badge.bg} ${badge.text} text-xs font-semibold mr-1 px-2 py-0.5 rounded-full`}
        >
          {badge.label}
        </span>
      ))}
    </>
  );
}
