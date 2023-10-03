import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'var(--navy)',
  boxShadow: 24,
  p: 4,
};

interface Props {
    Modelopen: boolean;
    handleModelClose: () => void;
}

export default function BasicModal({Modelopen, handleModelClose}: Props) {

    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [github, setGithub] = React.useState("");

    const handlesave = () => {
      try{
        axios.post('https://jainex17-backend.vercel.app/api/v1/savedetails', {name, phone, github}, {withCredentials: true}).then((res) => {
          console.log(res);
            
        if(res.data.success){
            toast.success("Profile Updated Successfully");
            handleModelClose();
          }
        }).catch((err) => {
          console.log(err);
        })
      }catch(err){
        console.log(err);
      }
    }


  return (
    <>
      <Modal
        open={Modelopen}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{textAlign:"center"}}>
            Profile
          </Typography>

            <div className='userprofile'>
                <div className='profileform'>

                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label htmlFor='phone number'>Phone Number</label>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                <label htmlFor='github'>Github</label>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} required />
            
                <button onClick={handlesave}>Save</button>
                </div>
            </div>

        </Box>
      </Modal>
    </>
  );
}