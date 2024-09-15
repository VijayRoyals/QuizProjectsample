import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Drawer, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
// import FacultyPanelSettingsIcon from '@mui/icons-material/FacultyPanelSettings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddVoucher from './AddVoucher'; // Import the AddVoucher component
import FacultyRegister from './FacultyRegister';
import AddQuestions from './QuestionForm';
import QuestionTable from './QuestionTable';
import VoucherList from './VoucherList';
import ScoreCardTable from './ScoreCardTable';



function FacultyPanel() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');
    const [data, setData] = useState({});
    const [isMinimized, setIsMinimized] = useState(false);

    const handleLogout = () => {
        navigate('/');
        localStorage.clear(); // Clear all local storage items
    };

    const fetchData = (item) => {
        setActiveItem(item);
        axios.get(`http://localhost:8000/api/${item.toLowerCase()}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };

    useEffect(() => {
        fetchData('Voucher');
    }, []);



      // Retrieve user name from localStorage
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) { // Adjust this value as needed
                setIsMinimized(true);
            } else {
                setIsMinimized(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (text) => {
        if (text === 'Add Voucher') {
            setActiveItem('AddVoucher');
          } else if (text === 'Add Exams') {
            setActiveItem('AddExams');
          }else if (text === 'Exams') {
            setActiveItem('Exams');
          }else if (text === 'Voucher') {
            setActiveItem('Voucher');
          }else if (text === 'Results') {
            setActiveItem('Results');
          } else {
            fetchData(text);
            setActiveItem(text);
        }
    };





    const renderMainContent = () => {
        if (activeItem === 'AddVoucher') {
            return <AddVoucher />;
          }
          if (activeItem === 'AddExams') {
            return <AddQuestions />;
          }
          if (activeItem === 'Exams') {
            return <QuestionTable />;
          }
          if (activeItem === 'Voucher') {
            return <VoucherList />;
          }
          if (activeItem === 'Results') {
            return <ScoreCardTable />;
          }
        // Add other components here if needed
        return (
            <Box sx={{ mt: 2, backgroundColor: 'var(--prue-white-color)', padding: 3, borderRadius: 2, boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)' }}>
                <Typography variant="h4" sx={{ color: 'var(--dark-navy-color)' }}>{activeItem}</Typography>
                <Typography variant="body1" sx={{ color: 'var(--dark-navy-color)' }}>
                    {data ? JSON.stringify(data, null, 2) : `No data available for ${activeItem}`}
                </Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'var(--light-grey-color)' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: isMinimized ? 80 : 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMinimized ? 80 : 240,
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--prue-white-color)',
                        borderRight: '1px solid var(--gray-navy-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowX: 'hidden',
                    },
                }}
            >
                {/* Header Section with Logo Icon and Menu Icon */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: isMinimized ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: isMinimized ? 'center' : 'space-between',
                    padding: 2,
                    borderBottom: '1px solid var(--gray-navy-color)',
                    marginBottom: 2,
                    position: 'relative',
                    minHeight: isMinimized ? '64px' : 'auto', // Ensure enough height for minimized state
                }}>
                    {!isMinimized && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: 'var(--dark-navy-color)' }} />
                            <div><h5 >Hi,  {userName} </h5></div>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setIsMinimized(!isMinimized)}
                        sx={{
                            color: 'black', // Default color
                            backgroundColor: 'transparent', // Transparent background
                            '&:hover': {
                                backgroundColor: 'var(--purple-color)', // Purple background on hover
                                color: 'var(--prue-white-color)', // White icon color on hover
                            },
                            borderRadius: '50%',
                            padding: 1,
                            fontSize: '1.5rem', // Adjust the size of the icon
                            position: isMinimized ? 'absolute' : 'relative',
                            bottom: isMinimized ? 10 : 'auto',
                            left: isMinimized ? 10 : 'auto',
                            top: isMinimized ? 'auto' : 10,
                            zIndex: 1,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Sidebar Items */}
                <List sx={{ marginTop: isMinimized ? 0 : 8, flexGrow: 1 }}>
                    {[
                        { text: 'Voucher', icon: <ReceiptIcon /> },
                        { text: 'Add Voucher', icon: <ReceiptIcon /> },
                        { text: 'Exams', icon: <AssignmentIcon /> },
                        { text: 'Add Exams', icon: <AssignmentIcon /> },
                        { text: 'Results', icon: <AssessmentIcon /> },
                    ].map(({ text, icon }) => (
                        <ListItem
                            button
                            key={text}
                            selected={activeItem === text}
                            onClick={() => handleNavigation(text)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'var(--purple-color)',
                                    color: 'var(--prue-white-color)',
                                },
                                paddingLeft: isMinimized ? 1 : 2,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 1,
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'var(--purple-color)',
                                    color: 'var(--prue-white-color)',
                                }
                            }}
                        >
                            <Box sx={{ mr: isMinimized ? 0 : 2, display: 'flex', justifyContent: 'center' }}>
                                {icon}
                            </Box>
                            {!isMinimized && (
                                <ListItemText primary={text} sx={{ color: 'var(--dark-navy-color)', whiteSpace: 'nowrap' }} />
                            )}
                        </ListItem>
                    ))}
                </List>

                {/* Logout Button */}
                <Box sx={{ marginTop: 'auto', mb: 2 }}>
                    <ListItem
                        button
                        key="Logout"
                        onClick={handleLogout}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'var(--purple-color)',
                                color: 'var(--prue-white-color)',
                            },
                            paddingLeft: isMinimized ? 1 : 2,
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 1,
                            transition: 'background-color 0.3s',
                        }}
                    >
                        <Box sx={{ mr: isMinimized ? 0 : 2 }}>
                            <ExitToAppIcon sx={{ color: 'var(--black-color)' }} />
                        </Box>
                        {!isMinimized && (
                            <ListItemText primary="Logout" sx={{ color: 'white', whiteSpace: 'nowrap' }} onClick={handleLogout} />
                        )}
                    </ListItem>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'var(--light-grey-color)' }}>
                {renderMainContent()}
            </Box>
        </Box>
    );
}

export default FacultyPanel;
