import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issue';


export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const {issueQuery, page, nextPage, prevPage} = useIssues({state, labels: selectedLabels});

  const onChangeLabel = (labelName: string) =>{
    (selectedLabels.includes(labelName))
    ? setSelectedLabels( selectedLabels.filter(label => label !== labelName))
    : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issueQuery.isLoading
            ? (<LoadingIcon />)
            : (<IssueList 
                issues={issueQuery.data || []}
                state={ state }
                onStateChanged = {(newState) => setState(newState)}
                />)
            
        }
        
        <button 
            className='btn btn-outline-primary'
            disabled={issueQuery.isFetching }
            onClick={() =>{prevPage()}}>... More ..</button>

      </div>
      
      <div className="col-4">
        <LabelPicker 
        selectedLabel={selectedLabels}
        onChange={(labelName) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  )
}
