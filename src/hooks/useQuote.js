import { useQuery } from '@tanstack/react-query';

export default function useQuote() {
  return useQuery({
    queryKey: ['quote'],
    queryFn: async () => {
      const res = await fetch('https://api.quotable.io/random');
      const json = await res.json();
      return `${json.content} — ${json.author}`;
    },
    staleTime: 1000 * 60 * 30,
  });
}
