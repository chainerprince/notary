import { useRouter } from 'next/router';
import React,{useState} from 'react'
import Link from 'next/link'

const Search = () => {
    const [location, setlocation] = useState('');
    const [document, setDocument] = useState('');    

    const router = useRouter();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(location.trim()){
            router.push(`/?location=${location}&document=${document}`);       
        }else{
            router.push('/');
        }
    }
    return (
        <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h2 className="mb-3">Search Notifiers Near You</h2>
            <div className="form-group">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="District"
                value={location}
                onChange={(e)=>setlocation(e.target.value)}
              />
            </div>          

            <div className="form-group">
              <label htmlFor="notifier_type_field">Type of documents</label>
              <select className="form-control" id="rom_type_field" 
              value={document}
              onChange = {e=>setDocument(e.target.value)}
              >
                {
                   ["marriage","birthCertificates","landServices","schoolReports","migrationServices"].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
            </div>

            <button type="submit" className="btn btn-block py-2">Search</button>
            <Link href='/'> 
                      <a  className='ml-2 back-to-search'>
                      <i className='fa fa-arrow-left'></i> Back
                      </a> 
            </Link>
          </form>
        </div>
      </div>
    </div>

    )
}

export default Search
