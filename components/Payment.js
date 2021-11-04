import { useRouter } from "next/router"
import { useState,useHistory, useEffect } from "react"
import axios from 'axios'

const Payment = () => {
    const [amount,setAmount] = useState(0)
    const [phone,setPhone] = useState('')
    const [pin,setPin] = useState('')
    
    const router = useRouter()
   const {amount:Amount,id} = router.query

   console.log(amount) 
 
 console.log(amount)
//   useEffect(() => {
//      setAmount(Amount * 100)
     
      
//   }, [amount])
   

    const bookRoomMtn = async(e) =>{
        e.preventDefault()
        
        
        try{
            
         const link = `http://localhost:3000/api/checkout/mtn/${id}`;
         
      console.log(phone,pin,amount)
      const {data} = await axios.post(link,{'amount':2000,pin,phone})

      if(data.status='success') {
          window.location.assign(data.meta.authorization.redirect) 
      }
      
      
      
      
        }catch(error){
            console.log(error) 
            
            // toast.error(error.message) 
        }
 }
  

 
     return (
         <div className="payment shadow py-2 px-5">
             <h4 className="text-center my-3">Enter Payment Details</h4>
                 <form onSubmit={bookRoomMtn}>
                     <label htmlFor="phone">Phone</label>
                     <input type="text" className="form-control" name="phone" id="phone" onChange={e=>setPhone(e.target.value)} />
                     <label htmlFor="phone">Amount(RWF)</label>
                     <input type="text" className="form-control" value="2000" disabled name="amount" id="amount" />
                     <label htmlFor="pin">Pin</label>
                     <input type="password" className="form-control" name="pin" id="pin" onChange={e=>setPin(e.target.value)} />
                     <button className="bg-warning border-0 shadow rounded p-2 my-3 text-white">pay-MTN</button>
                 </form>
         </div>
     )
}

export default Payment