// import { memo, useState } from 'react'
// import { AppBar, Divider, IconButton, SwipeableDrawer, Toolbar } from '@mui/material'
// import { Box } from '@mui/system'
// import Image from 'mui-image'
// // import logo from '../../assets/images/logo_4cap.svg'
// import { Menu, Box as BoxIcon } from 'react-feather'

// const Home = () => {
//   const [drawer, setDrawer] = useState(true)
//   const ruoter = [
//     {
//       title: 'Main',
//       children: [
//         {
//           title: 'dashboard',
//           path: '/',
//           icon: <BoxIcon />
//         }
//       ]
//     },
//     {
//       title: 'WEB APPS',
//       children: [
//         {
//           title: 'dashboard',
//           path: '/',
//           icon: <BoxIcon />
//         }
//       ]
//     }
//   ]

//   const styles = {
//     drawer: {
//       width: '240px',
//       flexShrink: 0,
//       '& .MuiDrawer-paper': {
//         width: '240px',
//         boxSizing: 'border-box',
//         backgroundColor: 'primary.main'
//       }
//     },
//     drawerHeader: {
//       display: 'flex',
//       justifyContent: 'space-between'
//     },
//     drawerHeaderIcon: {
//       marginLeft: '10px'
//     }
//   }

//   const DrawerHeader = () => (
//     <Box sx={styles.drawerHeader} py={1} px={2}>
//       <Image style={styles.drawerHeaderIcon} src='https://www.posibilidades.com.mx/4cap2023/images/logo/logo_4cap_300x100.svg' alt='logo' width={120} height={40} duration={0} />
//       <IconButton color='grey' onClick={() => setDrawer(false)}>
//         <Menu size={22} />
//       </IconButton>
//     </Box>
//   )
//   return (
//     <>
//       <AppBar position='fixed'>
//         <Toolbar>
//         </Toolbar>
//       </AppBar>
//       <SwipeableDrawer open={true} onClose={() => { }} onOpen={() => { }} sx={styles.drawer}>
//         <DrawerHeader />
//         <Divider />
//       </SwipeableDrawer>
//     </>
//   )
// }
// export default memo(Home)
