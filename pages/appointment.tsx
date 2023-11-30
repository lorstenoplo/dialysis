import Typography from '@mui/joy/Typography';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Navbar from '@/components/Navbar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import scheduleAppointment from '@/utils/mutations/appointment';

const appointment = () => {
  const [age, setAge] = React.useState('');
  const [area, setArea] = React.useState('');
  const [name, setName] = React.useState('');
  const [problem, setProblem] = React.useState('');
  const router = useRouter();
  const mutation = useMutation(scheduleAppointment);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleAreaChange = (event: SelectChangeEvent) => {
    setArea(event.target.value as string);
  };

  const handleSubmit = async () => {
    const response = await mutation.mutateAsync({ name, age, area, problem });
    if (response.message === 'Done') {
      router.replace('/')
    }
  }

  return (
    <Navbar>
      <main className='flex flex-col space-y-3'>
        <Typography level="h4">Book your appointment</Typography>
        <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
        <TextField value={problem} onChange={(e) => setProblem(e.target.value)} id="outlined-basic" label="Problem" variant="outlined" />
        <FormControl >
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten +</MenuItem>
            <MenuItem value={20}>Twenty +</MenuItem>
            <MenuItem value={30}>Thirty +</MenuItem>
            <MenuItem value={40}>Forty +</MenuItem>
            <MenuItem value={50}>Fifty +</MenuItem>
          </Select>
        </FormControl>

        <FormControl >
          <InputLabel id="demo-simple-select-area">Area</InputLabel>
          <Select
            labelId="demo-simple-select-area"
            id="demo-simple-area"
            value={area}
            label="Area"
            onChange={handleAreaChange}
          >
            <MenuItem value={'Gandhi Nagar'}>Gandhi Nagar</MenuItem>
            <MenuItem value={'HR Layout'}>HR Layout</MenuItem>
            <MenuItem value={"MGR Central"}>MGR Central</MenuItem>
            <MenuItem value={"UB City"}>UB City</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>Book</Button>
      </main>
    </Navbar>
  )
}

export default appointment