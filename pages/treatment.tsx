import Typography from '@mui/joy/Typography';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Navbar from '@/components/Navbar';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import scheduleTreatment from '@/utils/mutations/treatment';

const treatment = () => {
    const [urgency, setUrgency] = React.useState('');
    const [area, setArea] = React.useState('');
    const [name, setName] = React.useState('');
    const router = useRouter();
    const mutation = useMutation(scheduleTreatment);

    const handleUrgencyChange = (event: SelectChangeEvent) => {
        setUrgency(event.target.value as string);
    };

    const handleAreaChange = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    };

    const handleSubmit = async () => {
        const response = await mutation.mutateAsync({ name, urgency, area });
        if (response.message === 'Done') {
            router.replace('/')
        }
    }

    return (
        <Navbar>
            <main className='flex flex-col space-y-3'>
                <Typography level="h4">Book your Treatment</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
                <FormControl >
                    <InputLabel id="demo-simple-select-urgency">Urgency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={urgency}
                        label="Urgency"
                        onChange={handleUrgencyChange}
                    >
                        <MenuItem value={'Low'}>Low</MenuItem>
                        <MenuItem value={'Medium'}>Medium</MenuItem>
                        <MenuItem value={'High'}>High</MenuItem>
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

                <Button variant="contained" onClick={handleSubmit} >Book</Button>
            </main>
        </Navbar>
    )
}

export default treatment