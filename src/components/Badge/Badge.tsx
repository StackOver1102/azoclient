"use client";
import { useMemo } from "react";

export interface Badges {
  label: string;
  bg: string;
  text: string;
}

export interface PropsBadge {
  badges: string[];
}

export default function Badge({ badges }: PropsBadge) {
  const badgeOptions = useMemo(
    () => [
      { label: "Exclusive", bg: "bg-red-100", text: "text-red-800" },
      { label: "Owner", bg: "bg-red-100", text: "text-red-800" },
      { label: "Provider Direct", bg: "bg-red-100", text: "text-red-800" },
      { label: "Best Seller", bg: "bg-red-100", text: "text-red-800" },
      { label: "Promotion", bg: "bg-green-100", text: "text-green-800" },
      { label: "Recommendation", bg: "bg-green-100", text: "text-green-800" },
      { label: "Instant", bg: "bg-green-100", text: "text-green-800" },
      { label: "Super Fast", bg: "bg-green-100", text: "text-green-800" },
      { label: "Real", bg: "bg-green-100", text: "text-green-800" },
      { label: "30 days Refill", bg: "bg-green-100", text: "text-green-800" },
    ],
    []
  );

  // Lấy và sắp xếp danh sách badge theo thứ tự ưu tiên
  const sortedBadges = useMemo(() => {
    const productBadges = badges
      .map((badge) => badgeOptions.find((option) => option.label === badge))
      .filter((badge): badge is NonNullable<typeof badge> => badge !== undefined);

    const redBadges = productBadges.filter((badge) => badge.text === "text-red-800");
    const otherBadges = productBadges.filter((badge) => badge.text !== "text-red-800");

    return [...redBadges, ...otherBadges]; // Red badges first, then others
  }, [badges, badgeOptions]);

  return (
    <>
      {sortedBadges.map((badge, index) => (
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
