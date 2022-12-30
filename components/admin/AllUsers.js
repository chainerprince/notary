import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Loader from '../layout/Loader';
import { DELETE_USER_RESET } from '../../state/constants/userConstants';
import { allUser, deleteUser } from '../../state/actions/userActions';

const Users = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {users,loading,error} = useSelector(state=>state.allUsers)
    
    const {isDeleted,error:deleteError}  = useSelector(state=>state.user)
    

    useEffect(() => {
        
        dispatch(allUser())
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            router.push('/admin/users');
            dispatch({type:DELETE_USER_RESET})
        }
     

    }, [dispatch,error,isDeleted])

    


  const deleteHandler = (id) =>{
    console.log("Reached here")
      dispatch(deleteUser(id));
      
  }
  const setUsers = () => {
    const data = {
        columns: [
            {
                label: 'User ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Email',
                field: 'email',
                sort: 'asc'
            },
            {
                label: 'Role',
                field: 'role',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
                sort: 'asc'
            }

        ],
        rows: []
    }

    users && users.forEach(user => {
        data.rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            actions:
                <>
                    <Link href={`/admin/users/${user._id}`}>
                        <a className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                        </a>
                    </Link>
                    {/*  */}
                    <button 
                    className="btn btn-danger mx-2"
                    onClick={() => deleteHandler(user._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>

                </>
        })
    })

    return data;

}
    return (
        <div className="container container-fluid">
            {loading ? <Loader /> : 
            <>

            <h1 className="my-4">{`${users && users.length} Users`}</h1>




            </>            
            }
        
        <MDBDataTable
         data={setUsers()}
         className="px-3"
         bordered
         striped
         hover
        />

    </div>
    )
}

export default Users
