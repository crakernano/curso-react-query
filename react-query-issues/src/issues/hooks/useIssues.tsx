import { useQueries, useQuery } from '@tanstack/react-query';
import { githubApi } from '../../apis/githubApi';
import { Issue } from '../interfaces/issue';

const getIssues = async():Promise<Issue[]> =>{
    const { data } = await githubApi.get<Issue[]>('/issues')
    return data;

}

export const useIssues = () =>{
    
    const issueQuery = useQuery(
        ['issues'],
        getIssues
    )
    
    return{
        issueQuery
    }
}