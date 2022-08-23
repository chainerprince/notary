import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/notifierAction';
import { newRoom } from '../../state/actions/notifierAction';
import Loading from '../layout/Loading';
import { NEW_ROOM_RESET } from '../../state/constants/notifierConstants';
import Image from 'next/image';

const Application = () => {

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
    const [imagesPreview,setImagesPreview] = useState([])

    const dispatch = useDispatch();
    const router = useRouter();
    const {success,loading,error} = useSelector(state=>state.newRoom)
    

    useEffect(() => {
        
        if(error){
           console.log(error)
            toast.error(error)
            dispatch(clearErrors())
        }
        if(success){
            router.push('/admin/rooms');
            dispatch({type:NEW_ROOM_RESET});
        }

    }, [dispatch,error,success])


    const imageHandler = e => {

        const files = Array.from(e.target.files);
        

        setImages([]);
        setImagesPreview([]);
        

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
        
        dispatch(newRoom(roomData))
    }


    

    return (
        <div className="container container-fluid">
        <div className="row wrapper">
           <div className="col-10 col-lg-8">
              <form className="shadow-lg" onSubmit={handleSubmit} encType="multipart/form-data">
                 <h1 className="mb-4">Apply as a Notifier</h1>
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
                    <label htmlFor="address_field">city</label>
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
                   ["public","private"].map(num=>(
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
                    <label htmlFor="category_field">Choose your education</label>
                    <select className="form-control" id="guest_field" 
              value={guestCapacity}
              onChange = {e=>setGuestCapacity(e.target.value)}
              >
                {
                   ['Bachelors','Masters','PHD'].map(num=>(
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
                    <label htmlFor="category_field">District</label>

                    <select className="form-control" id="guest_field" 
              value={numOfBeds}
              onChange = {e=>setNumOfBeds(e.target.value)}
              >
                {
                   [ 'Gasabo', 'Kicukiro', 'Nyarugenge' ].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
                    {/* <select className="form-control" id="numOfBeds_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
                 </div>
                 <label className="mb-3">Documents Available</label>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="internet_checkbox"
                       value={internet}
                       onChange={e=>setInternet(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="internet_checkbox">
                    Land Services
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="breakfast_checkbox"
                       value={breakfast}
                       onChange={e=>setBreakfast(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="breakfast_checkbox">
                    Marriage
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="airConditioned_checkbox"
                       value={airConditioned}
                       onChange={e=>setAirConditioned(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                    Birth Certificates
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="petsAllowed_checkbox"
                       value={petsAllowed}
                       onChange={e=>setPetsAllowed(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                    Migration Services
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="roomCleaning_checkbox"
                       value={roomCleaning}
                       onChange={e=>setRoomCleaning(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                    School Reports
                    </label>
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
                 <div className="form-group mt-4">
                    <label>Images of licenses</label>
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
                            <Image
                            key={img}
                            src={img}
                            alt={img}
                            className="mt-3 mr-2"
                            width={55}
                            height={52}
                            />
                        )
                    }

                 </div>
                 <button 
                 type="submit" 
                 className="btn btn-block new-room-btn py-3"
                 disabled = {loading?true:false}
                 >
                     {loading ? <Loading /> : "ADD"}
                 
                 </button>
              </form>
           </div>
        </div>
     </div >
    )
}

export default Application
