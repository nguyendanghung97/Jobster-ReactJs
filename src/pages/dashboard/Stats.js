import { useDispatch, useSelector } from 'react-redux';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useEffect } from 'react';
import { showStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
  
  const { isLoading, monthlyApplications } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {/* nếu monthlyApplications có dữ liệu (có ít nhất một ứng dụng hàng tháng), thì ChartsContainer sẽ được render ra màn hình, cùng với StatsContainer */}
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats