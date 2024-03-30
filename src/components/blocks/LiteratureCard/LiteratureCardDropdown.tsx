import React from 'react';
import MenuButton from "@mui/joy/MenuButton";
import IconButton from "@mui/joy/IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dropdown from "@mui/joy/Dropdown";

const LiteratureCardDropdown = () => {
    return (
        <Dropdown>
            <MenuButton
                variant="plain"
                size="sm"
                sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: 10, position: 'absolute', top: '0.875rem', right: '0.5rem' }}
            >
                <IconButton size={"sm"} sx={{borderRadius: 10}} variant={"plain"}><MoreVertRoundedIcon/></IconButton>
            </MenuButton>
            <Menu
                placement="bottom-end"
                size="sm"
                variant={"soft"}
                sx={{
                    zIndex: '99999',
                    p: 0.7,
                    gap: 0,
                    '--ListItem-radius': '7px',
                    borderRadius: "10px"
                }}
            >
                <MenuItem>
                    <EditRoundedIcon />
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteRoundedIcon />
                    Remove
                </MenuItem>
            </Menu>
        </Dropdown>
    );
};

export default LiteratureCardDropdown;