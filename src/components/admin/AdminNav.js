import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PaymentIcon from '@material-ui/icons/Payment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useHistory } from 'react-router-dom';
import  AdminConference  from './AdminConference';
import ManageResearches from "../../views/researches/ManageResearches";
import ManageWorkshops from "../../views/workshop/ManageWorkshops";
import AddDocument from './AddDocument'
import ManageDownloads from "../../views/download/ManageDownloads";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight:38 ,

  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

 const  AdminNav=()=> {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 let t={background: "blue"}

  const [showIcon, setShowResults] = React.useState(false)
  const [ClickIcon1, setClickResults1] = React.useState(false)
  const [ClickIcon2, setClickResults2] = React.useState(true)
  const [ClickIcon3, setClickResults3] = React.useState(true)
  const [ClickIcon4, setClickResults4] = React.useState(true)

  const [ClickIcon6, setClickResults6] = React.useState(true)
  const [ClickIcon7, setClickResults7] = React.useState(true)
  const [ClickIcon8, setClickResults8] = React.useState(true)

  const [title, setTitle] = React.useState("Admin Dashboard")

  const [Barcolour, setBarcolour] = React.useState({background: "linear-gradient(to right, #ff3300 0%, #ff5050 100%"})
  const [fontcolour, setfontcolour] = React.useState('')


  const [viewTab, setView] = React.useState(<ManageDownloads/>)


  const token =JSON.parse(sessionStorage.getItem("token"));
  const history = useHistory();

  useEffect(() => {
    if(token != null){
        if(token.type!=="admin"){
                history.replace("/");
            
        }
    }else{
        history.replace("/");
    }
    
}, []);
    

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowResults(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowResults(false)
  };

  const FindClick = (index) => {
    console.log(index)
    if(index=="Dashboard"){
      setTitle("Admin Dashboard")
      setBarcolour({background: 'linear-gradient(to right, #ff3300 0%, #ff5050 100%'})
      setClickResults1(false)
      setClickResults2(true)
      setClickResults3(true)
      setClickResults4(true)
      setClickResults6(true)
      setClickResults7(true)
      setClickResults8(true)
      setView(<ManageDownloads/>)


    }
    else if(index=="Conference"){
      setTitle("Conference Dashboard")
      setBarcolour({background : "linear-gradient(to right, #ff9900 0%, #ff9966 100%"})
      setClickResults1(true)
      setClickResults2(false)
      setClickResults3(true)
      setClickResults4(true)
      setClickResults6(true)
      setClickResults7(true)
      setClickResults8(true)
      setView(<AdminConference/>)

    }
    else if(index=="Workshop"){
      setTitle("Workshop Dashboard")
      setBarcolour({background : "linear-gradient(to right, #1a1c1b 0%, #4d4d4d 100%"})
      setClickResults1(true)
      setClickResults2(true)
      setClickResults3(false)
      setClickResults4(true)
      setClickResults6(true)
      setClickResults7(true)
      setClickResults8(true)
      setView(<ManageWorkshops/>)
    }
    else if(index=="Research"){
      setTitle("Research Dashboard")
      setBarcolour({background : "linear-gradient(to right, #0033cc 0%, #3399ff 100%"})
      setClickResults1(true)
      setClickResults2(true)
      setClickResults3(true)
      setClickResults4(false)
      setClickResults6(true)
      setClickResults7(true)
      setClickResults8(true)
      setView(<ManageResearches/>)
    }
    else if(index=="Attendance"){
      setTitle("Attendance Dashboard")
      setBarcolour({background : "linear-gradient(to right, #6600cc 0%, #6666ff 100%"})
      setClickResults1(true)
      setClickResults2(true)
      setClickResults3(true)
      setClickResults4(true)
      setClickResults6(false)
      setClickResults7(true)
      setClickResults8(true)

    } else if(index=="Payment"){

      setTitle("Payment Dashboard")
      setBarcolour({background : "linear-gradient(to right, #00cc00 0%, #66ff33 100%"})
      setClickResults1(true)
      setClickResults2(true)
      setClickResults3(true)
      setClickResults4(true)
      setClickResults6(true)
      setClickResults7(false)
      setClickResults8(true)
    }else if(index=="logout"){

    
        sessionStorage.removeItem("token");
        history.push("/login");
        // window.location.reload();
    
  }
  };


  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar id="appbar"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={Barcolour}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
        >
          <MenuIcon />
        </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >


        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} style={showIcon ? {} : { display: 'none' }}>

            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}

          </IconButton>
          {/*<IconButton*/}
          {/*    color="inherit"*/}
          {/*    position="fixed"*/}
          {/*    aria-label="open drawer"*/}
          {/*    onClick={handleDrawerOpen}*/}
          {/*    edge="start"*/}
          {/*    className={clsx(classes.menuButton, {*/}
          {/*      [classes.hide]: open,*/}
          {/*    })}*/}
          {/*>*/}
          {/*  <MenuIcon  />*/}
          {/*</IconButton>*/}
        </div>
        <Divider />
        <List>
          {/*{['Dashboard' , 'Conference', 'Workshop', 'Research','Payment Details'].map((text, index) => (*/}
          {/*  <ListItem button key={text}  onClick={FindClick("D")}>*/}
          {/*    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
          {/*    <ListItemText primary={text} />*/}

          {/*  </ListItem>*/}




          {/*))}*/}

          <ListItem button  onClick={() => FindClick("Dashboard")} style={ClickIcon1 ? {} : { background: "#ff3300", color: "white"}}>
            <ListItemIcon>  <DashboardIcon style={ClickIcon1 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>

          <ListItem button onClick={() => FindClick("Conference")} style={ClickIcon2 ? {} : { background: "#ff9900", color: "white"}}>
            <ListItemIcon> <EventIcon style={ClickIcon2 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Conference"} />
          </ListItem>

          <ListItem button onClick={() => FindClick("Workshop")} style={ClickIcon3 ? {} : { background: "#1a1c1b", color: "white"}} >
            <ListItemIcon>  <PersonIcon style={ClickIcon3 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Workshop"} />
          </ListItem>

          <ListItem button onClick={() => FindClick("Research")} style={ClickIcon4 ? {} : { background: "#0033cc", color: "white"}}>
            <ListItemIcon>  <AccountBoxIcon style={ClickIcon4 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Research"} />
          </ListItem>

          <ListItem button onClick={() => FindClick("Attendance")} style={ClickIcon6 ? {} : { background: "#6600cc", color: "white"}}>
            <ListItemIcon>  <PostAddIcon style={ClickIcon6 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Attendance"} />
          </ListItem>

          <ListItem button onClick={() => FindClick("Payment")} style={ClickIcon7 ? {} : { background: "#00cc00", color: "white"}}>
            <ListItemIcon>  <PaymentIcon style={ClickIcon7 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Payment Details"} />
          </ListItem>

        </List>
        <Divider />
        <List>

          <ListItem button onClick={() => FindClick("Email")} style={ClickIcon8 ? {} : { background: "#636363", color: "white"}}>
            <ListItemIcon>  <MailIcon style={ClickIcon8 ? {} :{ color: "white" }}/></ListItemIcon>
            <ListItemText primary={"Email"} />
          </ListItem>
          <ListItem button onClick={() => FindClick("logout")}>
            <ListItemIcon>  <ExitToAppIcon style={{ color: "#fa4661" }}/></ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
          {/*  <ListItem button key={text} >*/}
          {/*    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
          {/*    <ListItemText primary={text} />*/}
          {/*  </ListItem>*/}
          {/*))}*/}
        </List>



      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div>

        </div>
        {/*<Typography paragraph>*/}

        {/*  donec massa sapien faucibus et molestie ac.*/}
        {/*</Typography>*/}
        <Typography paragraph>



          <div>

            {viewTab}
          </div>



        </Typography>
      </main>
    </div>
  );
}

export default AdminNav;