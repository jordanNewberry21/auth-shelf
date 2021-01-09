import React, { useRef } from 'react';

function Upload() {
    const fileInput = useRef();

    const handleClick = event => { 
        event.preventDefault();
        console.log(fileInput.current)
        // this will house the function to upload to S3
    };

    return (
        <>
            <form className='upload-steps' onSubmit={handleClick}>
                <label>
                    Upload File:
                    <input type='file' ref={fileInput} />
                </label>
                <br />
                <button type='submit'>Upload</button>
            </form>

        </>
    )
}

export default Upload;