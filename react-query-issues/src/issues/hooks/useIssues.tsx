import { useQueries, useQuery } from '@tanstack/react-query';
import { githubApi } from '../../apis/githubApi';
import { Issue, State } from '../interfaces/issue';
import { useEffect, useState } from 'react';

interface Props {
    state?: State;
    labels: string[]
}

const getIssues = async(state?: State, labels: string[] = [], page: number = 1):Promise<Issue[]> =>{

    const params = new URLSearchParams();

    // Filtros
    if(state)params.append('state', state);
    if(labels.length > 0){
        const labelString = labels.join(',');
        params.append('labels', labelString)
    }

    // Paginación
    params.append('page', page?.toString());
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', {params})
    return data;

}

export const useIssues = ({state, labels}:Props) =>{
    const [page, setPage] = useState(1)

    // Si cambian los filtros, volvemos a la primera pag
    useEffect(() => {
        setPage(1)
    }, [state, labels])
    
    
    const issueQuery = useQuery(
        ['issues', {state, labels, page}],
        () =>getIssues(state, labels, page)
    )

    const nextPage = () =>{
        if(issueQuery.data?.length === 0) return;
        setPage(page +1);
    }
    
    const prevPage = () =>{
        if(page > 1) setPage(page - 1);
    }

    return{
        issueQuery,
        page : issueQuery.isFetching ? 'Loading' : page,
        nextPage,
        prevPage
    }
}