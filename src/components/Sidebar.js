import React from 'react'
import { Avatar, Box, Button, Drawer, IconButton, Typography } from '@mui/material'
import Link from '@mui/material/Link';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import MovieIcon from '@mui/icons-material/Movie';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const CatLinkTab = styled(Box)({
    display:'flex',
    alignItems:'center',
    gap:'5px',
    '&:hover':{
      color:blue[200]
    }
  })



const Sidebar = ({openDrawer, setOpenDrawer}) => {
    
  return (
    <React.Fragment>
        <Drawer
         open={openDrawer}
         onClose={() => setOpenDrawer(!openDrawer)}
         variant='temporary'
         sx={{
            '& .MuiPaper-root':{
                width:'100%',
                maxWidth:280
            }
         }}
        >
       <Box sx={{height:'100%', padding:1}}>
           <Box width={1} paddingX={2} paddingY={1}>
            <Link to='/' style={{ textDecoration: 'none' }}>
             <IconButton size='large' disabled>
              <Avatar
                variant='rounded'
                sx={{
                backgroundColor:blue[200],
                height:55,
                width:55,
                marginRight:'15px'
                }}
              >
              <img src='' alt='' />
            </Avatar>
            <Typography
             variant='h4'
             component='div'
             sx={{
              flexGrow:1,
              color:blue[200],
              fontWeignt:'bold',
              textDecoration:'none',
              fontFamily:'"Cookie", cursive'
             }}
            >
              Blog
            </Typography>
          </IconButton>
        </Link>
     </Box>
         <Box paddingX={2} paddingY={2}>
                 <Box paddingY={1}>
                   <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=art' >
                     <CatLinkTab >
                      <ArtTrackIcon />
                      <Typography>ART</Typography>
                     </CatLinkTab>
                    </Link>
                   </Box>
                  

                    <Box paddingY={1}>
                    <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=science' >
                     <CatLinkTab >
                      <ScienceIcon />
                      <Typography>SCIENCE</Typography>
                     </CatLinkTab>
                    </Link>
                    </Box>

                    <Box paddingY={1}>
                    <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=technology' >
                     <CatLinkTab >
                      < BiotechIcon />
                      <Typography>TECHNOLOGY</Typography>
                     </CatLinkTab>
                    </Link>
                    </Box>

                   <Box paddingY={1}>
                   <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=cinema' >
                     <CatLinkTab >
                      <MovieIcon />
                      <Typography>CINEMA</Typography>
                     </CatLinkTab>
                    </Link>
                   </Box>

                   <Box paddingY={1}>
                   <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=cinema' >
                     <CatLinkTab >
                      <DesignServicesIcon/>
                      <Typography>DESIGN</Typography>
                     </CatLinkTab>
                    </Link>
                   </Box>

                   <Box paddingY={1}>
                   <Link style={{textDecoration:'none', color:'inherit'}} to='/?cat=cinema' >
                     <CatLinkTab >
                      <FoodBankIcon/>
                      <Typography>FOOD</Typography>
                     </CatLinkTab>
                    </Link>
                   </Box>

               
                  <Box paddingY={1}>
                   <Button variant='outlined' sx={{color:'black'}}>Write</Button>
                   </Box>
                   <Box paddingY={1}>
                   <Button variant='outlined' sx={{color:'black'}}>Register</Button>
                   </Box>
                   <Box paddingY={1}>
                  <Button variant='outlined' sx={{color:'black'}}>Login</Button>
                  </Box>
                
     
                
          </Box>
        </Box>
     </Drawer>
    </React.Fragment>
  )
}

export default Sidebar