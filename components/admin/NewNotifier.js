import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/notifierAction';
import { newNotifier } from '../../state/actions/notifierAction';
import Loading from '../layout/Loading';
import { NEW_NOTIFIER_RESET } from '../../state/constants/notifierConstants';
import Image from 'next/image';
import Loader from '../layout/Loader';

const Application = () => {

    const [name ,setName] = useState('');
    const [district ,setDistrict] = useState('kicukiro');
    const [description ,setDescription] = useState('');
    const [sector ,setSector] = useState('');
    const [category ,setCategory] = useState('private');
    const [education,setEducation] = useState('');
    const [price,setPrice] = useState('1000Rwf');
    
    const [land ,setLand] = useState(false);
    const [marriage ,setMarriage] = useState(false);
    const [migration ,setMigration] = useState(false);
    const [reports ,setReports] = useState(false);
    const [birth ,setBirth] = useState(false);
    const [images,setImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([])

    const dispatch = useDispatch();
    const router = useRouter();
    const {success,loading,error} = useSelector(state=>state.newNotifier)
    

    useEffect(() => {
        
        if(error){
           console.log(error)
            toast.error(error)
            dispatch(clearErrors())
        }
        if(success){
            router.push('/admin/notifiers');
            dispatch({type:NEW_NOTIFIER_RESET});
        }

    }, [dispatch,error,success,router])


    const imageHandler = e => {

        const files = Array.from(e.target.files);
        

        
        

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
        const notifierData = {
            name,
            pricePerDocument:price,
            description,
            address: {sector,district},
            category,
            education,            
            landServices: land,
            birthCertificates: birth,
            marriage,
            migrationSersvices: migration,
            schoolReports:reports,
            images
        }
        
        dispatch(newNotifier(notifierData))
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
                 </div>
                             
                 <div className="form-group">
                    <label htmlFor="category_field">District</label>

                    <select className="form-control" id="guest_field" 
              value={district}
              onChange = {e=>setDistrict(e.target.value)}
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
                 <div className="form-group">
                    <label htmlFor="sector_field">Sector</label>
                    <input
                       type="text"
                       id="sector_field"
                       className="form-control"
                       value={sector}
                       onChange = {e=>setSector(e.target.value)}
                       required
                       />
                 </div>
                 <label className="mb-3">Documents Available</label>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="land_checkbox"
                       value={land}
                       onChange={e=>setLand(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="internet_checkbox">
                    Land Services
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="marriage_checkbox"
                       value={marriage}
                       onChange={e=>setMarriage(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="breakfast_checkbox">
                    Marriage
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="birth_checkbox"
                       value={birth}
                       onChange={e=>setBirth(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="birth_checkbox">
                    Birth Certificates
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="migration_checkbox"
                       value={migration}
                       onChange={e=>setMigration(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="migration_checkbox">
                    Migration Services
                    </label>
                 </div>
                 <div className="form-check">
                    <input
                       className="form-check-input"
                       type="checkbox"
                       id="reports_checkbox"
                       value={reports}
                       onChange={e=>setReports(e.target.checked)}
                       />
                    <label className="form-check-label" htmlFor="reports_checkbox">
                    School Reports
                    </label>
                 </div>
                  <div className="form-group">
                    <label htmlFor="price_field">Average price per document</label>
                    <input
                       type="text"
                       id="price_field"
                       className="form-control"
                       value={price}
                       onChange = {e=>setPrice(e.target.value)}
                       required
                       />
                 </div>
                 <div className="form-group mt-4">
                      <div className="form-group">
                    <label htmlFor="category_field">Choose your education</label>
                    <select className="form-control" id="education_field" 
              value={education}
              onChange = {e=>setEducation(e.target.value)}
              >
                {
                   ['Bachelors','Masters','PHD'].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
                    {/* <select className="form-control" id="education_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
                 </div>
                    <label>Images of education certificates</label>
                    <div className="custom-file">
                       <input
                          type="file"
                          name="notifier_images"
                          className="custom-file-input"
                          id="customFile"
                          onChange={imageHandler}
                          multiple
                          disabled
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
                 <div className="form-group">
                    <label htmlFor="description_field">Enter more about your notary office</label>
                    <textarea
                       className="form-control"
                       id="description_field"
                       rows="8"
                       value={description}
                       onChange = {e=>setDescription(e.target.value)}
                       required
                       ></textarea>
                 </div>
                 <button 
                 type="submit" 
                 className="btn btn-block bg-choco text-white new-notifier-btn py-3"
                 disabled = {loading?true:false}
                 >
                     {loading ? <Loader /> : "Apply"}
                 
                 </button>
              </form>
           </div>
        </div>
     </div >
    )
}

export default Application
