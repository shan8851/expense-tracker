import { useState } from 'react';

export function useVisibleItems<T>(items: T[], itemsPerPage: number = 5) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const showMoreItems = () => setVisibleCount((prev) => prev + itemsPerPage);
  const showLessItems = () => setVisibleCount((prev) => Math.max(itemsPerPage, prev - itemsPerPage));

  const visibleItems = items.slice(0, visibleCount);

  return {
    visibleItems,
    showMoreItems,
    showLessItems,
    canShowMore: visibleCount < items.length,
    canShowLess: visibleCount > itemsPerPage,
  };
}
