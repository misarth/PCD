import React, { useState } from 'react';
import './Dash.css';
import { Layout, Avatar, Menu, Breadcrumb, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import {Link,Route,Redirect} from 'react-router-dom';
import {GiftOutlined,ContactsOutlined,UserAddOutlined,SwapOutlined,AppstoreAddOutlined,SettingOutlined,BarChartOutlined,UserOutlined,CustomerServiceOutlined,TableOutlined,ShopOutlined,ShoppingOutlined,GlobalOutlined} from '@ant-design/icons';

import { Card} from 'antd';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../api/index.js';
import Redget from '../components/Redget';

import Affred from '../components/Affred';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));


const { Header, Footer, Sider, Content } = Layout;

const Reduction = (props) => {


  const logout = () => {
    props.setAuthorized(false);
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [visible, setVisible] = useState(false);
  const onSelect = name => {
    setSelectedPlayer(name);
    setVisible(true);
  }
  const ViewProfileButton = ({name}) => {
    return <Button type='dashed' style={{float:'right'}} onClick={()=>onSelect(name)}> View Full Profile  </Button>
  }

  const onClose = () => setVisible(false);
  if (!(props.authorized)) {
    return (<Route exact path="/reduction"><Redirect to="/signin" /></Route>);
  }
  else 
  return (
    <div className="App">
      <Layout>
        <Header style={{ padding: 10 }}>
          
        <div className={classes.root} style={{float:'right' , marginRight : 40 , marginTop : -10}}>
        
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{height : 35}}
          >
            <UserOutlined/>
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}><h5><Link to ='/profil'>Profil</Link></h5></MenuItem>
                      <MenuItem onClick={handleClose}><h5>Carte</h5></MenuItem>
                      <MenuItem onClick={logout}><h5>Déconnexion</h5></MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        </div>
          
          <Title style={{ color: 'white' }} level={2}>UNIFID</Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={['Paramcarte']}
              mode="inline"
            >
              <Menu.Item key='Dashboard'>
                <Link to ='/dashboard'><BarChartOutlined />Statistiques</Link>
            </Menu.Item>
            <Menu.Item key='paramcarte'>
                <Link to ='/paramcarte'><SettingOutlined />Paramètres de la carte de fidelité</Link>
            </Menu.Item>
            <Menu.Item key='bons'>
                <Link to ='/bons'><GiftOutlined />Liste des bons d'achats</Link>
            </Menu.Item>
            <Menu.Item key='reduction'>
                <Link to ='/reduction'><GiftOutlined />Liste des réductions</Link>
            </Menu.Item>
            <Menu.Item key='gestioncaissier'>
                <Link to ='/gestioncaissier'><UserAddOutlined />Gestion des caissiers</Link>
            </Menu.Item>
            
            <Menu.Item key='Clients'>
                <Link to ='/clients'><TableOutlined />Table des clients</Link>
            </Menu.Item>
            <Menu.Item key='Profil'>
              <span><Link to='/profil'><UserOutlined />Profil</Link></span>
            </Menu.Item>
  
              <SubMenu
                title={
                  <span>
                    {/*<Icon type="mail" />*/}
                    <span><CustomerServiceOutlined />Nos services</span>
                  </span>
                }
              >
                <Menu.ItemGroup key='AboutUS'>
                  <Menu.Item key='location1'> <Link to='/pointsvente'><ShopOutlined />Points de vente</Link></Menu.Item>
                  
                  <Menu.Item key='location3'> <Link to='/event'> <AppstoreAddOutlined />Evenements</Link></Menu.Item>

                </Menu.ItemGroup>
              </SubMenu>
              
            </Menu>
          </Sider>
          
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1 style ={{fontWeight :'bold'}}>Liste des réductions</h1></Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 1050}}>
         
              <br/>
                            <Affred />
       
        
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}><h5 style={{fontWeight :'bold'}}>UNIFID:</h5> <h6 style={{ color: '#5b8db6'}}>meilleur programme de fidélisation</h6></Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default Reduction;