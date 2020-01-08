import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { AppState, LoginState } from "../../State";
import GoogleApi from "../../Utility/GoogleApi";
import { AppletContent, Title } from "../Styled/Grid";
import styled from "../Styled/Theme";

const StyledTitle = styled(DialogTitle)`
    color: ${p => p.theme.palette.error.main};
`;

const DeleteButton = styled(Button)`
    color: ${p => p.theme.palette.error.main};
`;

const ContainedDeleteButton = styled(Button)`
    background-color: ${p => p.theme.palette.error.main};

    &:hover {
        background-color: ${p => p.theme.palette.error.light};
    }
`;

const UserInfo: React.FC = () => {
    const { signOut } = React.useContext(LoginState);
    const [state, dispatch] = React.useContext(AppState);

    const [open, setOpen] = React.useState(false);
    const handleDeleteData = () => {
        signOut();
        Object.keys(state.decks).forEach(name => GoogleApi.deleteDeck(dispatch)({ name, id: state.files[name] }));
        setOpen(false);
    };

    return (
        <AppletContent>
            <Title>User info</Title>
            <div>
                <ContainedDeleteButton startIcon={<DeleteIcon />} variant="contained" onClick={() => setOpen(true)}>
                    Delete saved data
                </ContainedDeleteButton>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <StyledTitle>Delete all saved data and sign out</StyledTitle>
                <DialogContent>
                    <DialogContentText>
                        This action will delete all the data (saved decks) saved by this app in your google drive storage and sign you out. After you sign back
                        in the app will create it&apos;s base required files again. This action is irreversible!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <DeleteButton onClick={handleDeleteData}>Delete</DeleteButton>
                </DialogActions>
            </Dialog>
        </AppletContent>
    );
};

export default UserInfo;
