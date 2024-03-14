import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {

  // tạo ra một state có tên là barChart với giá trị ban đầu là true, và một hàm setter có tên là setBarChart được sử dụng để cập nhật giá trị của state barChart.
  const [barChart, setBarChart] = useState(true);
  // Lấy ra giá trị của monthlyApplications
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type='button'
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? 'area chart' : 'bar chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer