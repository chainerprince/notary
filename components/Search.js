import { useRouter } from 'next/router';
import React,{useState} from 'react'

const Search = () => {
    const [location, setlocation] = useState('');
    const [guests, setguests] = useState('');
    const [category, setcategory] = useState('');

    const router = useRouter();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(location.trim()){
            router.push(`/?location=${location}&guest=${guests}&category=${category}`);       
        }else{
            router.push('/');
        }
    }
    return (
        <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h2 className="mb-3">Search Rooms</h2>
            <div className="form-group">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="new york"
                value={location}
                onChange={(e)=>setlocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="guest_field">No. of Guests</label>
              <select className="form-control" id="guest_field" 
              value={guests}
              onChange = {e=>setguests(e.target.value)}
              >
                {
                   [1,2,3,4,5,6].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="room_type_field">Room Type</label>
              <select className="form-control" id="rom_type_field" 
              value={category}
              onChange = {e=>setcategory(e.target.value)}
              >
                {
                   ["King","Twins","Single"].map(num=>(
                    <option value={num} key={num}>{num}</option>
                   ))
                }
              </select>
            </div>

            <button type="submit" className="btn btn-block py-2">Search</button>
          </form>
        </div>
      </div>
    </div>

    )
}

export default Search
