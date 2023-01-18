import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

// function handleClick(event) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
//   }
  
const Breadcrumb = ({pagetitle}) => {
  return (
    <div role="presentation">
    <Breadcrumbs aria-label="breadcrumb" sx={{mt:2, ml:3}}>
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Hello Admin
      </Link>
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/orders"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {pagetitle}
      </Link>
      {/* <Typography
        sx={{ display: 'flex', alignItems: 'center' }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Breadcrumb
      </Typography> */}
    </Breadcrumbs>
  </div>
  )
}

export default Breadcrumb
