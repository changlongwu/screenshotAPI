import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  console.log(ACCESS_KEY)
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  let defaultValues  ={
    format: "jpeg",
    no_ads: "true",
    no_cookie_banners: "true",
    width: "1920",
    height: "1080",
  }

  // need a state variable to hold and display the screenshot after we make our API call
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  // quota - how many times of screenshot left
  const [quota, setQuota] = useState(null);

  const getQuota = async () =>{
    const response = await fetch("https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY);
    
    const result = await response.json();
    setQuota(result);
  }
  const submitForm =() =>{
    if (inputs.url === "" || inputs.url === " "){
      alert("Please submit an valid url!")
    }
    else{
          {/* turn our dictionary into an array of key and values to loop through 
          using Object.entries() */}
      for (const [key, value] of Object.entries(inputs)){
        if (value == ""){
          inputs[key]=defaultValues[key]
        }
      }
      makeQuery();
    }
  }

  const makeQuery =()=>{
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter+inputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;


    callAPI(query).catch(console.error)
  }

  const callAPI = async (query)=>{
    // fetch(query) 要花时间
    // 用了await， response就是我们要的结果
    const response  = await fetch(query);
    const json = await response.json();

    if (json.url == null){
      alert("There was an error with your request query. Please try again.")
    }
    else{
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
      getQuota();
    }
  }

  const reset =() =>{
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });

  }


  return (
    <div className='whole-page'>
      <div className='quota'>

        {quota ? (
        <p className="quota">
          {" "}
          Remaining API calls: {quota.remaining} out of {quota.limit}
        </p>
      ) : (
        <p></p>
      )}

      </div>

      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm 
      inputs={inputs}
      handleChange={(e) => {
        setInputs((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value.trim(),
        }))

      }}
      onSubmit={submitForm}
      />

      {
      currentImage ?(
        <img className='Screenshot' src={currentImage} alt="screenshot image" />
      ):(
        <div> </div>
      )
      }

      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>

      <br></br>

      <div className="container">
        <Gallery images={prevImages} />
      </div>

  </div>



  )
}

export default App
