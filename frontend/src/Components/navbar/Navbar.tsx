import React, { useEffect } from "react";
import axios from "axios";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import BasicModal from "./Model";

interface NavbarProps {
  nightLightMode: () => void;
  Theme: string;
  navbarClick: () => void;
  islogin: boolean;
}


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    minWidth: 180,
    backgroundColor: "var(--green)",
    color:
      'rgb(51, 51, 51)',

    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.secondary.dark,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Navbar: React.FC<NavbarProps> = ({
  nightLightMode,
  Theme,
  navbarClick,
  islogin
}) => {

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    document.body.classList.toggle("scroll", window.scrollY > 130);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Modelopen, setModelOpen] = React.useState(false);
  const handleOpen = () => {
    setModelOpen(true);
    setAnchorEl(null);
  }
  const handleModelClose = () => setModelOpen(false);


  const handleLogout = () => {
    axios.get("https://jainex17-backend.vercel.app/api/v1/logout",
    { withCredentials: true })
    .then((res) => {
      if (res.data.success) {
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className="navbar nav">
      <Link to="/">
        <h1> &lt; Jainex /&gt;</h1>
      </Link>
      <ul>
        <li>
          <Link to="#home">Home</Link>
        </li>
        <li>
          <Link to="/">Projects</Link>
        </li>
        <li>
          <Link to="#Contact">Contact</Link>
        </li>
        <li>
          <button onClick={handleClick}>
            <span>Option</span><KeyboardArrowDownIcon />
          </button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}

            onClose={handleClose}

          >
            <MenuItem onClick={nightLightMode}>
              <ListItemIcon>
                <DarkModeIcon fontSize="small" style={{
                  color: "var(--Yankees-Blue)"
                }} />
              </ListItemIcon>
              <ListItemText style={{
                color: "var(--Yankees-Blue)"
              }}>Theme</ListItemText>
            </MenuItem>

            {islogin ? (
              <>
                <MenuItem onClick={handleOpen}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" style={{
                      color: "var(--Yankees-Blue)"
                    }} />
                  </ListItemIcon>
                  <ListItemText style={{
                    color: "var(--Yankees-Blue)"
                  }}>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" style={{
                      color: "var(--Yankees-Blue)"
                    }} />
                  </ListItemIcon>
                  <ListItemText style={{
                    color: "var(--Yankees-Blue)"
                  }}>Logout</ListItemText>
                </MenuItem>
              </>
            )
              :
              <Link to={"/login"}>
              <MenuItem>
                <ListItemIcon>
                  <LoginIcon fontSize="small" style={{
                      color: "var(--Yankees-Blue)"
                    }} />
                </ListItemIcon>
                <ListItemText style={{
                      color: "var(--Yankees-Blue)"
                    }}>Login</ListItemText>
              </MenuItem>
                </Link> 
            }
          </StyledMenu>
        </li>
      </ul>

    

            <BasicModal Modelopen={Modelopen} handleModelClose={handleModelClose} />

      <div className="navbar-btn">
        <button onClick={navbarClick}>
          <svg
            id="navopen"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${Theme === "dark" ? '#ffffff' : '#000000'} `}
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="bevel"
          >
            <line x1="12" y1="40" x2="12" y2="10"></line>
            <line x1="18" y1="40" x2="18" y2="4"></line>
            <line x1="6" y1="40" x2="6" y2="16"></line>
          </svg>

          <svg
            id="navclose"
            className="none"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${Theme === "dark" ? '#ffffff' : '#000000'} `}
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="bevel"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
