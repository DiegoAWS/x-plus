import axios from "axios";
import fs from "fs";
export const uploadImage = async (file) => {

    fs.writeFileSync('test.png', file)
    
    
    const baseUrl = 'https://api.imgbb.com/1/upload'

    try {
      const response = await axios.post(baseUrl, {
        image: file,
        key:"3c7a1ceea4e2a55740b54548f7532653"
      },{
        headers: {
            'Content-Type': 'application/json',
        }
      })


        return response?.data
    } catch (error) {

        console.error('Error uploading:');
        console.error(error);
        return 
    }
};
