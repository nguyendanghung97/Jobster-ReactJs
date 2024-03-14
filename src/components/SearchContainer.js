import React, { useMemo, useState } from 'react'
import Wrapper from '../assets/wrappers/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { FormRow } from './FormRow';
import FormRowSelect from './FormRowSelect';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {

  // Redux hooks (useState, useSelector, useDispatch) là một tập hợp các hooks được cung cấp bởi thư viện Redux để làm việc với React hooks trong ứng dụng React sử dụng Redux cho quản lý state
  const [localSearch, setLocalSearch] = useState('');

  const { isLoading, searchStatus, searchType, sort, sortOptions} = useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  
  // Hàm dispatch này được sử dụng để gửi các actions đến Redux store
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  // Khi sự kiện thay đổi xảy ra (ví dụ: người dùng nhập liệu vào trường input), hàm debounce được gọi.
  // debounce(): được tạo ra để giảm thiểu việc gọi một hàm quá nhiều lần trong một khoảng thời gian ngắn
  const debounce = () => {
    console.log('debounce called')
    let timeoutID;
    return (e) => {
      // Hàm debounce sẽ cập nhật giá trị của trường input (setLocalSearch), và sau đó đặt một timeout để gửi yêu cầu xử lý sau 1 giây.
      setLocalSearch(e.target.value);
      // Nếu trong khoảng thời gian này có sự kiện thay đổi mới xảy ra, timeout sẽ bị xóa và thời gian chờ sẽ bắt đầu lại.
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        // Nếu không có sự kiện thay đổi mới xảy ra trong khoảng thời gian timeout, yêu cầu xử lý mới được gửi đi, đảm bảo rằng chỉ có một yêu cầu được gửi sau khi người dùng kết thúc nhập liệu.
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    }
  };

  // hook useMemo: Là một hook trong React được sử dụng để memoize (tối ưu hóa) kết quả của một hàm hoặc biểu thức
  // Nếu các dependencies không thay đổi, hook này sẽ trả về kết quả được memoize từ lần chạy trước
  // []: Đây là một mảng dependencies trống, có nghĩa là hook useMemo chỉ chạy một lần duy nhất khi component được render lần đầu tiên
  // tạo ra một hàm debounce chỉ một lần khi component được render lần đầu tiên và lưu trữ nó trong biến optimizedDebounce
  const optimizedDebounce = useMemo(() => debounce(), []);
  
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* Search position */}
          <FormRow 
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          <FormRowSelect 
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          <FormRowSelect 
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />

          <FormRowSelect 
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>

        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer