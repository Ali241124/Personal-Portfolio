import axios from "axios";
import {useState} from "react";

function Contacts(){

const [form,setForm]=useState({
name:"",
email:"",
message:""
});

const sendMessage = async(e)=>{

e.preventDefault();

await axios.post("http://localhost:5000/contact",form);

alert("Message Sent");

}

return(

<section className="p-10 bg-gray-900 text-white">

<h2 className="text-3xl text-center">
Contact Me
</h2>

<form onSubmit={sendMessage} className="flex flex-col gap-4 mt-6">

<input
placeholder="Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="Email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<textarea
placeholder="Message"
onChange={(e)=>setForm({...form,message:e.target.value})}
/>

<button className="bg-blue-500 p-2">
Send
</button>

</form>

</section>

)

}

export default Contacts