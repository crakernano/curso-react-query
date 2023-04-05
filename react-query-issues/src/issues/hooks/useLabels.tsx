import { useQuery } from "@tanstack/react-query"

import { githubApi } from "../../apis/githubApi";
import { Label } from "../interfaces/label";

const getLabels = async():Promise<Label[]> =>{
    const {data} = await githubApi.get<Label[]>('/labels')
    /*
    const res = await fetch('https://api.github.com/repos/facebook/react/labels');
    const data = await res.json();
    */
    return data;
  }

export const useLabels = () =>{

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime:  1000 * 60 * 60, //1h 
            //initialData: []
            //placeholderData: []
        }
      );
      return labelsQuery
}