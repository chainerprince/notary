
import React,{useEffect,useState} from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { clearErrors, getRoomDetails } from '../../state/actions/roomAction';
import { updateRoom } from '../../state/actions/roomAction';
import Loading from '../layout/Loading';
import { NEW_ROOM_RESET } from '../../state/constants/roomConstants';

const UpdateRoom = () => {

    const [name ,setName] = useState('');
    const [price ,setPrice] = useState('');
    const [description ,setDescription] = useState('');
    const [address ,setAddress] = useState('');
    const [category ,setCategory] = useState('King');
    const [guestCapacity,setGuestCapacity] = useState(1);
    const [numOfBeds ,setNumOfBeds] = useState(1);
    const [internet ,setInternet] = useState(false);
    const [breakfast ,setBreakfast] = useState(false);
    const [petsAllowed ,setPetsAllowed] = useState(false);
    const [roomCleaning ,setRoomCleaning] = useState(false);
    const [airConditioned ,setAirConditioned] = useState(false);
    const [images,setImages] = useState([]);
    const [oldImages,setOldImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([])

    const dispatch = useDispatch();
    const router = useRouter();
    const {isUpdated,loading,error} = useSelector(state=>state.updateRoom)
    const {room,loading:detailsLoading,error:detailsError} = useSelector(state=>state.roomDetails)
    
   const {id} = router.query
   
    useEffect(() => {
        
        if(room && room._id !== id){
            dispatch(getRoomDetails('',id))
        }else{
            setName(room.name)
            setDescription(room.description)
            setPrice(room.pricePerNight)
            setAddress(room.address)
            setCategory(room.category)
            setGuestCapacity(room.guestCapacity)
            setNumOfBeds(room.numOfBeds)
            setInternet(room.internet)
            setBreakfast(room.breakfast)
            setAirConditioned(room.airConditioned)
            setPetsAllowed(room.petsAllowed)
            setRoomCleaning(room.roomCleaning)
            setOldImages(room.images)
        }

        
        if(error){
           console.log(error)
            toast.error(error)
            dispatch(clearErrors())
        }


        if(detailsError){
           
            toast.error(detailsError)
            dispatch(clearErrors())
        }


        if(isUpdated){
            router.push('/admin/rooms');
            dispatch({type:NEW_ROOM_RESET});
        }

    }, [dispatch,error,isUpdated,room,detailsError])


    const imageHandler = e => {

        const files = Array.from(e.target.files);
        

        setImages([]);
        setOldImages([]);
        setImagesPreview([]);
        console.log(files)

        files.forEach(file=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImages(prev=>[...prev,reader.result]);
                    setImagesPreview(prev=>[...prev,reader.result]);
                }
            }
            reader.readAsDataURL(file)
        })


        
            
        
    }
    

    const handleSubmit = e=>{
        e.preventDefault();
        const roomData = {
            name,
            pricePerNight:price,
            description,
            address,
            category,
            guestCapacity: Number(guestCapacity),
            numOfBeds: Number(numOfBeds),
            internet,
            breakfast,
            petsAllowed,
            roomCleaning,
            images
        }
        console.log(images)
        if(images.length !== 0)  roomData.images = images;
        dispatch(updateRoom(room._id,roomData))
    }


    

    return (
       <>
        {
         detailsLoading ? <Loader /> :



        <div className="container container-fluid">
        <div className="row wrapper">
           <div className="col-10 col-lg-8">
              <form className="shadow-lg" onSubmit={handleSubmit} enctype="multipart/form-data">
                 <h1 className="mb-4">New Room</h1>
                 <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                       type="text"
                       id="name_field"
                       className="form-control"
                       value={name}
                       onChange = {e=>setName(e.target.value)}
                       required
                       />
                 </div>
                 <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                       type="text"
                       id="price_field"
                       className="form-control"
                       value={price}
                       onChange = {e=>setPrice(e.target.value)}
                       required
                       />
                 </div>
                 <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                       className="form-control"
                       id="description_field"
                       rows="8"
                       value={description}
                       onChange = {e=>setDescription(e.target.value)}
                       required
                       ></textarea>
                 </div>
                 <div className="form-group">
                    <label htmlFor="address_field">Address</label>
                    <input
                       type="text"
                       id="address_field"
                       className="form-control"
                       value={address}
                       onChange = {e=>setAddress(e.target.value)}
                       required
                       />
                 </div>
                 <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select className="form-control" id="rom_type_field" 
              value={category}
              onChange = {e=>setCategory(e.target.value)}
              >
                {
                   ["King","Twins","Single"].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
                    {/* <select className="form-control" id="category_field" value="">
                       <option value="">King</option>
                       <option value="">Single</option>
                       <option value="">Twins</option>
                    </select> */}
                 </div>
                 <div className="form-group">
                    <label htmlFor="category_field">Guest Capacity</label>
                    <select className="form-control" id="guest_field" 
              value={guestCapacity}
              onChange = {e=>setGuestCapacity(e.target.value)}
              >
                {
                   [1,2,3,4,5,6].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
                    {/* <select className="form-control" id="guestCapacity_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
                 </div>
                 <div className="form-group">
                    <label htmlFor="category_field">Number of Beds</label>

                    <select className="form-control" id="guest_field" 
              value={numOfBeds}
              onChange = {e=>setNumOfBeds(e.target.value)}
              >
                {
                   [1,2,3,4,5,6].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
                    {/* <select className="form-control" id="numOfBeds_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
                 </div>
                 <label className="mb-3">Room Features</label>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="internet_checkbox"
                       value={internet}
                       checked={internet}
                       onChange={e=>setInternet(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="internet_checkbox">
                    Internet
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="breakfast_checkbox"
                       value={breakfast}
                       checked={breakfast}
                       onChange={e=>setBreakfast(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="breakfast_checkbox">
                    Breakfast
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="airConditioned_checkbox"
                       value={airConditioned}
                       checked={airConditioned}
                       onChange={e=>setAirConditioned(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                    Air Conditioned
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="petsAllowed_checkbox"
                       value={petsAllowed}
                       onChange={e=>setPetsAllowed(e.target.checked)}
                       checked={petsAllowed}
                       />
                    <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                    Pets Allowed
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="roomCleaning_checkbox"
                       value={roomCleaning}
                       checked={roomCleaning}
                       onChange={e=>setRoomCleaning(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                    Room Cleaning
                    </label>
                 </div>
                 <div className="form-group mt-4">
                    <label>Images</label>
                    <div className="custom-file">
                       <input
                          type="file"
                          name="room_images"
                          className="custom-file-input"
                          id="customFile"
                          onChange={imageHandler}
                          multiple
                          />
                       <label className="custom-file-label" htmlFor="customFile">
                       Choose Images
                       </label>
                    </div>

                    {
                        imagesPreview.map(img=>
                            <img
                            src={img}
                            alt={img}
                            key={img}
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                            />
                        )
                    }

{
                        oldImages && oldImages.map(img=>
                            <img
                            src={img.url}
                            alt={img.public_id}
                            key={img.public_id}
                            className="mt-3 mr-2"
                            width="55"
                            height="52"
                            />
                        )
                    }

                 </div>
                 <button 
                 type="submit" 
                 className="btn btn-block new-room-btn py-3"
                 disabled = {loading?true:false}
                 >
                     {loading ? <Loading /> : "UPDATE"}
                 
                 </button>
              </form>
           </div>
        </div>
     </div >
        }
       </>
    )
}

export default UpdateRoom
