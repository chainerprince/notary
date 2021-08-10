import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/bookingAction';
import { getAdminRooms,deleteRoom } from '../../state/actions/roomAction';
import Loader from '../layout/Loader';
import { DELETE_ROOM_RESET } from '../../state/constants/roomConstants';

const AllRooms = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {rooms,loading,error} = useSelector(state=>state.allRooms)
    const {isDeleted,error:deleteError}  = useSelector(state=>state.deleteroom)
    

    useEffect(() => {
        dispatch(getAdminRooms())
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            router.push('/admin/rooms');
            dispatch({type:DELETE_ROOM_RESET})
        }

    }, [dispatch,isDeleted,deleteError])

    
  const deleteHandler = (id) =>{
      console.log(id)
      dispatch(deleteRoom(id));
  }
    const setRooms = () => {
        const data = {
            columns :[
                {
                    label: "Room Id",
                    field:'id',
                    sort:'asc'
                },
                {
                    label: "Name",
                    field:'name',
                    sort:'asc'
                },
                {
                    label: "Price / Night",
                    field:'price',
                    sort:'asc'
                },
                {
                    label: "Category",
                    field:'category',
                    sort:'asc'
                },
                {
                    label: "Actions",
                    field:'action',
                    sort:'asc'
                },
            ],
            rows:[]
        }

        rooms && rooms.forEach(room => {
              data.rows.push({
                  id:room._id,
                  name:room.name,
                 
                  price:`$${room.pricePerNight}`,
                  category:`${room.category}`,
                  action:
                  <>
                   <Link href={`/admin/rooms/${room._id}`}>
                      <a  className="btn btn-primary">
                          <i className="fa fa-pencil"></i>
                          
                      </a>
                   </Link>
                   <button 
                   
                   className="btn-danger btn mx-2"
                   onClick = {()=>deleteHandler(room._id)}
                   >
                       <i className="fa fa-trash"></i>
                   </button>
                  </>
              })
        });


        return data;
    }

    return (
        <div className="container container-fluid">
            {loading ? <Loader /> : 
            <>

            <h1 className="my-4">{`${rooms && rooms.length} Rooms`}</h1>

            <Link href="/admin/rooms/new">
                <a className="mt-0 btn text-white float-right btn-danger">Create Room</a>
            </Link>


            </>            
            }
        
        <MDBDataTable
         data={setRooms()}
         className="px-3"
         bordered
         striped
         hover
        />

    </div>
    )
}

export default AllRooms
