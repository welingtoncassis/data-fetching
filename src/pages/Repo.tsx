import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Repository } from './Repos';

export function Repo() {
  const params = useParams();
  const currentepository = params['*'] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    // await queryClient.invalidateQueries(['repos']);

    // patch to api to update

    const previousRepos = queryClient.getQueryData<Repository[]>('listRepo');
    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentepository) {
          return { ...repo, description: 'new descriptio' };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData('listRepo', nextRepos);
    }
  }

  return (
    <>
      <h1>{currentepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>
        Alterar descricao
      </button>
    </>
  );
}
