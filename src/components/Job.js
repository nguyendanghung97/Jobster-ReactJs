import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../features/job/jobSlice';

const Job = ({company, position, status, jobLocation, createdAt, jobType , _id}) => {

  const dispatch = useDispatch();

  // const date = createdAt;
  // Format lại date
  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
        <header>
            <div className='main-icon'>{company.charAt(0)}</div>
            <div className='info'>
              <h5>{position}</h5>
              <p>{company}</p>
            </div>
        </header>
        <div className='content'> 
          <div className='content-center'>
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} />
            <JobInfo icon={<FaBriefcase />} text={jobType} />

            {/* {`status ${status}`}: template string */}
            <div className={`status ${status}`}>{status}</div>
          </div>
          <footer>
            <div className='actions'>
              <Link 
                className='btn edit-btn'
                to='/add-job'
                onClick={() => {
                  dispatch(setEditJob({editJobId:_id, company, position, status, jobLocation, createdAt, jobType}))
                }}
              >
                Edit
              </Link>
              <button
                className='btn delete-btn'
                type='button'
                onClick={() => {
                  dispatch(deleteJob(_id));
                }}
              >
                Delete
              </button>
            </div>
          </footer>
        </div>
    </Wrapper>
  )
}

export default Job