import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type Repository = {
  full_name: string;
  description: string;
};
export function Repos() {
  const { data: repositories, isFetching } = useQuery<Repository[]>(
    'listRepo',
    async () => {
      const response = await axios.get(
        'https://api.github.com/users/welingtoncassis/repos'
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minuto
    }
  );
  return (
    <ul>
      {isFetching && <p>Carregando ..</p>}

      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`repo/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
