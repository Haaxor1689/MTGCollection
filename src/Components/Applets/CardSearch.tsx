import { Grid, Button, TextField, Dialog, DialogTitle, DialogActions, Checkbox, FormGroup, FormControlLabel, DialogContent, Typography, Avatar, Tooltip, Divider } from "@material-ui/core";
import React from "react";
import { AppletPaper, Title, AppletActions, FlexCol } from "../Styled/Grid";
import { State } from "../../State";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import styled from "../Styled/Theme";
import { Autocomplete } from "@material-ui/lab";
import Scry from "../../Utility/Scry";
import { Sprites } from "../../Assets"


// TODO: remove from here & make it reusable?
const PreviewRow = styled.div`
    display: flex;
    margin-top: ${p => p.theme.spacing(1)}px;
    align-items: center;

    & .MuiAutocomplete-root {
        flex-grow: 1;
        margin-right: ${p => p.theme.spacing(1)}px;
    }
`;

// Reusable?
interface CardSearchFilter {

    /** Array of selected colors inside advanced search */
    colors: {
        r: boolean; // Red
        g: boolean; // Green
        u: boolean; // Blue
        b: boolean; // Black
        w: boolean; // White
    };
    /** Checkbox whether the search should match exact colors */
    colorExactMatch: boolean;

    /** Converted Mana Cost */
    cmc: number;
    /** Type: equal [=], less than [<], more than [>] */
    cmcType: string;

    // type: string;
    // subtype: string;

    // legality: string;

}

const initCardSearchFilter = (): CardSearchFilter => {
    return {
        colors: { r: false, g: false, u: false, b: false, w: false },
        colorExactMatch: false,
        cmc: 0,
        cmcType: "=",
    }
}


const CardSearch: React.FC = () => {
    const [state, dispatch] = React.useContext(State);

    // Card name & autocomplete structures
    const [cardName, setCardName] = React.useState<string>("");
    const [autoompleteOptions, setAutocompleteOptions] = React.useState<string[]>([]);

    const updateAutoComplete = (name: string) => {
        setCardName(name);
        Scry.Cards.Autocomplete(cardName).then(names => setAutocompleteOptions(names));
    }

    const performSearch = () => {
        alert(JSON.stringify(filter));
    }

    // Advanced Filters Dialog structures
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    // Filter structures
    const [filter, setFilter] = React.useState<CardSearchFilter>(initCardSearchFilter());
    
    const resetFilter = () => setFilter(initCardSearchFilter());
    const handleColors = (color: 'r' | 'g' | "u" | "b" | "w") => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = { ...filter };
        newFilter.colors[color] = event.target.checked;
        setFilter(newFilter);
    };

    
    return (
        <Grid item xs={12} md>
            <AppletPaper>
                <Title>Card search</Title>

                <FlexCol>
                    <PreviewRow>
                        <Autocomplete
                            autoHighlight disableClearable
                            options={autoompleteOptions}
                            inputValue={cardName}
                            onInputChange={(e, value) => updateAutoComplete(value)}
                            renderInput={params => <TextField {...params} label="Card name" variant="outlined" fullWidth />}
                        />
                    </PreviewRow>
                </FlexCol>

                <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="advanced-card-search-dialog" maxWidth="md" fullWidth>
                    <DialogTitle id="advanced-card-search-dialog">Advanced card search</DialogTitle>
                    <DialogContent>

                        <Typography variant="subtitle2">Filter by color</Typography>
                        <FormGroup row>
                            <FormControlLabel 
                                label={<Avatar><img src={Sprites.Colors.red} title="Red"/></Avatar>}
                                control={<Checkbox checked={filter.colors.r} onChange={handleColors('r')}/>}
                            />
                            <FormControlLabel 
                                label={<Avatar><img src={Sprites.Colors.green} title="Green"/></Avatar>}
                                control={<Checkbox checked={filter.colors.g} onChange={handleColors('g')}/>}
                            />
                            <FormControlLabel 
                                label={<Avatar><img src={Sprites.Colors.blue} title="Blue"/></Avatar>}
                                control={<Checkbox checked={filter.colors.u} onChange={handleColors('u')}/>}
                            />
                            <FormControlLabel 
                                label={<Avatar><img src={Sprites.Colors.black} title="Black"/></Avatar>}
                                control={<Checkbox checked={filter.colors.b} onChange={handleColors('b')}/>}
                            />
                            <FormControlLabel 
                                label={<Avatar><img src={Sprites.Colors.white} title="White"/></Avatar>}
                                control={<Checkbox checked={filter.colors.w} onChange={handleColors('w')}/>}
                            />
                        </FormGroup>

                        <FormControlLabel 
                            label="Exact color match?"
                            control={<Checkbox 
                                checked={filter.colorExactMatch} 
                                onChange={e => setFilter({ ...filter, colorExactMatch: e.target.checked})} 
                            />}
                        />

                        <br/>

                        <ul>
                            <li>[DONE] Filter by color identity (only selected colors or all cards with selected colors)</li>
                            <li>Filter by converted mana cost (equal, less than, more than)</li>
                            <li>Filter by type/subtype (restrict subtype options based on type)</li>
                            <li>Filter by format legality (choose one)</li>
                        </ul>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resetFilter} color="primary">Reset</Button>
                        <Button onClick={closeDialog} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>

                <AppletActions>
                    <Tooltip title="Advanced search filter">
                        <Button onClick={openDialog}><FilterListIcon/></Button>
                    </Tooltip>
                    <Tooltip title="Search for results">
                        <Button onClick={performSearch}><SearchIcon/></Button>
                    </Tooltip>
                </AppletActions>
            </AppletPaper>
        </Grid>
    );
};

export default CardSearch;
