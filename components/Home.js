import React,{useEffect} from 'react'
import  Pagination  from 'react-js-pagination';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../state/actions/notifierAction';
import NotifierItem from './notifier/NotifierItem';
import {useRouter} from 'next/router'
import Link from 'next/link';
const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {notifiers,resPerPage,filteredNotifiersCount,notifiersCount,error} = useSelector(state=>state.allNotifiers);
  const {user} = useSelector(state=>state.login)  
  useEffect(() => {
   if(error){
      toast.error(error)
      dispatch(clearErrors)
   }
   
  },[error,dispatch])
   useEffect(() => {
   if(user?.role == 'notifier'){
      
      router.push('/notifier/appointments')
   }
   
  },[user,router])
  let {page = 1,location} = router.query;
  page = Number(page);

  const handlePagination = (pageNumber) =>{
    window.location.href = `/?page=${pageNumber}`
  }

  let count = notifiersCount;
  if(location) {
    count = filteredNotifiersCount;
  }
    
    return (
      
       <>

    <section id="notifiers" className="container-fluid mt-5">

  { notifiers && notifiers.length !== 0 &&  <h2 className='mb-3 ml-2 stays-heading'>{location ? `Notifiers in ${location}` : "All Notifiers" }</h2>}

{
  notifiers && notifiers.length !== 0 && ( <Link href='/search'> 
    <a  className='ml-2 back-to-search'>

    <i className='fa fa-arrow-left'></i> Search    
    </a> 
    </Link>)
}
   

    <div className="row justify-content-center align-items-center my-auto h-100"> 
       {notifiers && notifiers.length===0 ? 
        <div className="alert alert-danger"><b>No Notifiers Available</b></div>
        :
     notifiers &&   notifiers.filter(notifier=>notifier.status=='true').map(notifier=> <NotifierItem key={notifier._id} notifier={notifier} />)
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
