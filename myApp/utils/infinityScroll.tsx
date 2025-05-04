import { useState, useEffect } from 'react';

export default function useInfiniteScroll(fetchData) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newItems = await fetchData(page);
    setItems((prev) => [...prev, ...newItems]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { items, loadMore, loading };