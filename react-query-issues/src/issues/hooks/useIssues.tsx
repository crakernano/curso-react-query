import { useQueries, useQuery } from '@tanstack/react-query';
import { githubApi } from '../../apis/githubApi';
import { Issue, State } from '../interfaces/issue';

interface Props {
    state?: State;
    labels: string[]
}

const getIssues = async(state?: State, labels: string[] = []):Promise<Issue[]> =>{

    const params = new URLSearchParams();

    // Filtros
    if(state)params.append('state', state);
    if(labels.length > 0){
        const labelString = labels.join(',');
        params.append('labels', labelString)
    }

    // Paginación
    params.append('page', '1');
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', {params})
    return data;

}

export const useIssues = ({state, labels}:Props) =>{
    
    const issueQuery = useQuery(
        ['issues', {state, labels}],
        () =>getIssues(state, labels)
    )
    
    return{
        issueQuery
    }
}