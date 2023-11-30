import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Select, MenuItem, SelectChangeEvent, Card } from '@mui/material';
import ScheduledTreatMents from '@/components/ScheduledTreatMents';
import Link from 'next/link';
import ScheduledAppointments from '@/components/ScheduledAppointments';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [center, setCenter] = React.useState<string | null>(null);
    const [value, setValue] = React.useState(2);
    const [showPassword, setShowPassword] = React.useState(false);
    const [area, setArea] = React.useState('');
    const [pass, setPass] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        const val = localStorage.getItem('center');
        setCenter(val);
    }, [center])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAreaChange = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    };

    const handleLogin = () => {
        if (pass === '1234') {
            localStorage.setItem('center', area);
            setCenter(area)
            setValue(2)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('center')
        setCenter(null)
    }

    if (!center) {
        return (
            <main className='flex flex-col space-y-3 h-screen w-screen items-center justify-center'>
                <div className='w-2/5 space-y-6'>
                    <Typography variant="h4">Login</Typography>
                    <FormControl fullWidth >
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

                    <FormControl margin='dense' fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button onClick={handleLogin} variant="contained" fullWidth >Login</Button>
                </div>
            </main>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                    <Link href={'/'}>
                        <Tab label='Home' />
                    </Link>
                    <Tab label="Doctors" {...a11yProps(1)} />
                    <Tab label="Appointments" {...a11yProps(2)} />
                    <Tab label="Dialysis Treatment" {...a11yProps(3)} />
                    <Tab label='Logout' onClick={handleLogout} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={1}>
                <main className='h-full w-full flex flex-col space-y-4'>
                    <Card variant='outlined' className='p-4 space-y-2 w-3/5'>
                        <Typography variant='h5' fontWeight={'bold'}>
                            Dr. Michael Rodriguez - Dialysis and Transplantation Expert:
                        </Typography>
                        <Typography variant='body1' color={'text.secondary'}>
                            As a seasoned specialist in dialysis and transplantation, Dr. Michael Rodriguez brings a wealth of knowledge to our team. With a focus on improving the quality of life for patients with end-stage renal disease, Dr. Rodriguez has extensive experience in both hemodialysis and peritoneal dialysis modalities. His expertise also extends to pre- and post-transplant care, ensuring comprehensive support for patients on their transplant journey.                        </Typography>
                    </Card>
                    <Card variant='outlined' className='p-4 space-y-2 w-3/5'>
                        <Typography variant='h5' fontWeight={'bold'}>
                            Dr. Sarah Patel - Hypertension Management and Vascular Access Specialist:
                        </Typography>
                        <Typography variant='body1' color={'text.secondary'}>
                            Dr. Sarah Patel is renowned for her expertise in managing hypertension in patients with kidney diseases. With a keen interest in vascular access procedures for dialysis, she ensures optimal access for patients undergoing hemodialysis. Dr. Patel is committed to addressing the intricate connection between hypertension and kidney health, providing tailored treatment plans to improve overall cardiovascular and renal well-being.                        </Typography>
                    </Card>
                    <Card variant='outlined' className='p-4 space-y-2 w-3/5'>
                        <Typography variant='h5' fontWeight={'bold'}>
                            Dr. Emily Turner - Nephrology Specialist:
                        </Typography>
                        <Typography variant='body1' color={'text.secondary'}>
                            Dr. Emily Turner is a board-certified nephrologist with over 15 years of experience in renal care. Her expertise lies in the diagnosis and treatment of kidney diseases, including chronic kidney disease, glomerulonephritis, and hypertension-related kidney issues. Dr. Turner is dedicated to providing personalized care, utilizing the latest advancements in nephrology to optimize patient outcomes.                        </Typography>
                    </Card>
                    <Card variant='outlined' className='p-4 space-y-2 w-3/5'>
                        <Typography variant='h5' fontWeight={'bold'}>
                            Dr. Jonathan Barnes - Patient-Centric Care and Education Advocate:                        </Typography>
                        <Typography variant='body1' color={'text.secondary'}>
                            Dr. Jonathan Barnes is not only a seasoned nephrologist but also a passionate advocate for patient education and empowerment. With a focus on delivering patient-centric care, Dr. Barnes emphasizes preventive measures and lifestyle modifications to slow the progression of kidney diseases.                        </Typography>
                    </Card>

                </main>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ScheduledAppointments />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <ScheduledTreatMents />
            </CustomTabPanel>
        </Box>
    );
}
