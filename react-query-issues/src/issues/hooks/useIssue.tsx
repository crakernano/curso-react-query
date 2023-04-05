import { useQuery } from "@tanstack/react-query"
import { Issue } from "../interfaces/issue"
import { githubApi } from "../../apis/githubApi"


export const getIssueInfo = async(issueNumber: number):Promise<Issue>=>{
    const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

export const getIssueComments = async(issueNumber: number):Promise<Issue[]>=>{
    const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}

export const useIssue = ( issueNumber: number)=>{
    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssueInfo(issueNumber),

    )
    
    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments' ],
        () => getIssueComments(issueQuery.data?.number!),
        {
            enabled: issueQuery.data !== undefined //De esta forma solo se carga si hay datos en la petición anterior (issureQuery)
        }

    )

    return {
        issueQuery, 
        commentsQuery
    }
}