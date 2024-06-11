const APIForm = ({inputs, handleChange, onSubmit}) =>{

    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
      ];

    return(
        <div className="APIForm">
            <h2>Select Your Image Attributes:</h2>
            <form action="" className="form-conatiner">

                {/* turn our dictionary into an array of key and values to loop through 
                using Object.entries() */}
                {
                    inputs && Object.entries(inputs).map(
                        // give me some suggestion
                        ([category, value], index) =>(
                            <li className="form" key={index}>
                                <h2>{category}</h2>
                                <input 
                                type="text" 
                                name={category}
                                value={value}
                                placeholder="Input this attribute..."
                                onChange={handleChange}
                                className="textbox"
                                />
                                <br></br>
                                
                                <p>{inputsInfo[index]}</p>
                            </li>
                        )


                    )
                }

            </form>

            <button type="submit" className="button" onClick={onSubmit}>
            Take that Pic! 🎞
            </button>
        </div>
    )

}

export default APIForm