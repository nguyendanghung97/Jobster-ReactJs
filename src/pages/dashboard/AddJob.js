import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {

  // Lấy location từ profile
  const {user} = useSelector((store) => store.user);

  const { 
    isLoading, 
    position, 
    company, 
    jobLocation, 
    jobTypeOptions, 
    jobType, 
    statusOptions, 
    status, 
    isEditing, 
    editJobId
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !position || !company || !jobLocation ) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isEditing) {
      dispatch(editJob({jobId: editJobId, job: {position, company, jobLocation, jobType, status}}))
    } else {
      dispatch(createJob({position, company, jobLocation, jobType, status}))
    }
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value)
    dispatch(handleChange({name, value}));
  }

  // Cụ thể, reducer handleChange sẽ cập nhật trạng thái của thuộc tính có tên là 'jobLocation' (được truyền qua name trong payload) của slice thành giá trị được lấy từ user.location (được truyền qua value trong payload)
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>
          {isEditing ? 'edit job' : 'add job'}
        </h3>
        <div className='form-center'>
          <FormRow 
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow 
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow 
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
  
          {/* status */}
          <FormRowSelect 
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect 
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob