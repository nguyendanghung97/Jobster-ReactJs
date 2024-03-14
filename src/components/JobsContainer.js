import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading, PageBtnContainer } from '../components'
import { getAllJobs } from '../features/allJobs/allJobsSlice';

const JobsContainer = () => {

  const { jobs, isLoading, numOfPages, totalJobs, page, search, searchStatus, searchType, sort } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  // sử dụng useEffect để gửi một action getAllJobs() đến Redux store mỗi khi có sự thay đổi trong các dependency là page, search, searchStatus, searchType, và sort
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    )
  };

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  };

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 0 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}

export default JobsContainer