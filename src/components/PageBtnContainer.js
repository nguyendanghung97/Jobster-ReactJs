import { useDispatch, useSelector } from "react-redux"
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {

  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  // tạo một mảng pages với độ dài numOfPages
  // Hàm callback được truyền vào Array.from() sẽ được gọi cho mỗi phần tử của mảng mới tạo ra.
  const pages = Array.from({ length: numOfPages}, (_,index) => {
    return index + 1;
  });
  console.log('pages', pages);

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      {pages.map((pageNumber) => {
        return (
          // pageNumber === page: Mặc định active cho page 1
          <button
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            type="button"
            key={pageNumber}
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </button>
        );
      })}
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer