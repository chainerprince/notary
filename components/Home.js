import React,{useEffect} from 'react'
import  Pagination  from 'react-js-pagination';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../state/actions/notifierAction';
import RoomItem from './notifier/NotifierItem';
import {useRouter} from 'next/router'
import Link from 'next/link';
const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {rooms,resPerPage,filteredRoomsCount,roomsCount,error} = useSelector(state=>state.allRooms);
  useEffect(() => {
   if(error){
      toast.error(error)
      dispatch(clearErrors)
   }
   
  },[])
  let {page = 1,location} = router.query;
  page = Number(page);

  const handlePagination = (pageNumber) =>{
    window.location.href = `/?page=${pageNumber}`
  }

  let count = roomsCount;
  if(location) {
    count = filteredRoomsCount;
  }
    return (
      
       <>

    <section id="rooms" className="container-fluid mt-5">

    <h2 className='mb-3 ml-2 stays-heading'>{location ? `Notifiers in ${location}` : "All Notifiers" }</h2>

    <Link href='/search'> 
    <a  className='ml-2 back-to-search'>

    <i className='fa fa-arrow-left'></i> Search
    
    </a> 
    </Link>
    <div className="row"> 
       {rooms && rooms.length===0 ? 
        <div className="alert alert-danger"><b>No Appointments</b></div>
        :
     rooms &&   rooms.map(room=> <RoomItem key={room._id} room={room} />)
      }
        
    </div>
    {resPerPage <  count && 
    <div className="d-flex justify-content-center mt-5">

      <Pagination 
     activePage = {page}
     itemsCountPerPage = {resPerPage}
     totalItemsCount = {count}
     onChange = {handlePagination}
     prevPageText = {"Prev"}
     nextPageText = {"Next"}
     firstPageText = {"First"}
     lastPageText = {"last"}
     itemClass = {"page-item"}
     linkClass= {"page-link"}
  
    />
    </div>
    }
  </section>
 

  </>
    )
}

export default Home
