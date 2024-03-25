import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AuthService from "../../../../http/services/AuthService";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";


const Profile = () => {
    const navigate = useNavigate()

    async function doLogout() {
        await AuthService.logout()
        navigate("/")
    }

    const user = useSelector((state: RootState) => state.user.userData)

    return (
        <div>
            <Dropdown>
                <MenuButton
                    variant="soft"
                    size="lg"
                    sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
                >
                    <Avatar
                        src=""
                        srcSet=""
                        sx={{ maxWidth: '64px', maxHeight: '64px' }}
                    />
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    size="sm"
                    variant={"soft"}
                    sx={{
                        zIndex: '99999',
                        p: 1,
                        gap: 1,
                        '--ListItem-radius': '20px',
                        borderRadius: "20px"
                    }}
                >
                    <MenuItem>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                src=""
                                srcSet=""
                                sx={{ borderRadius: '50%' }}
                            />
                            <Box sx={{ ml: 1.5 }}>
                                <Typography level="title-sm" textColor="text.primary">
                                    {user?.username}
                                </Typography>
                                <Typography level="body-xs" textColor="text.tertiary">
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                    <ListDivider />
                    <MenuItem>
                        <HelpRoundedIcon />
                        Help
                    </MenuItem>
                    <MenuItem>
                        <SettingsRoundedIcon />
                        Settings
                    </MenuItem>
                    <ListDivider />

                    <MenuItem
                        component="a"
                        href="https://google.com"
                    >
                        Support us
                        <OpenInNewRoundedIcon />
                    </MenuItem>
                    <ListDivider />
                    <MenuItem onClick={doLogout}>
                        <LogoutRoundedIcon />
                        Log out
                    </MenuItem>
                </Menu>
            </Dropdown>
        </div>
    );
};

export default Profile;