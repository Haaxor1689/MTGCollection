import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import Scry from "../../Utility/Scry";
import { AppletActions, AppletPaper, FlexCol, Title } from "../Styled/Grid";
import styled from "../Styled/Theme";
import SymbolTypography from "../SymbolTypography";

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
    };
};

const CardSearch: React.FC = () => {
    // Card name & autocomplete structures
    const [cardName, setCardName] = React.useState<string>("");
    const [autoompleteOptions, setAutocompleteOptions] = React.useState<string[]>([]);

    const updateAutoComplete = (name: string) => {
        setCardName(name);
        Scry.Cards.Autocomplete(cardName).then(names => setAutocompleteOptions(names));
    };

    const performSearch = () => {
        alert(JSON.stringify(filter));
    };

    // Advanced Filters Dialog structures
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    // Filter structures
    const [filter, setFilter] = React.useState<CardSearchFilter>(initCardSearchFilter());

    const resetFilter = () => setFilter(initCardSearchFilter());
    const handleColors = (color: "r" | "g" | "u" | "b" | "w") => (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            freeSolo
                            autoHighlight
                            disableClearable
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
                                label={<SymbolTypography text="{R} Red" />}
                                control={<Checkbox checked={filter.colors.r} onChange={handleColors("r")} />}
                            />
                            <FormControlLabel
                                label={<SymbolTypography text="{G} Green" />}
                                control={<Checkbox checked={filter.colors.g} onChange={handleColors("g")} />}
                            />
                            <FormControlLabel
                                label={<SymbolTypography text="{U} Blue" />}
                                control={<Checkbox checked={filter.colors.u} onChange={handleColors("u")} />}
                            />
                            <FormControlLabel
                                label={<SymbolTypography text="{B} Black" />}
                                control={<Checkbox checked={filter.colors.b} onChange={handleColors("b")} />}
                            />
                            <FormControlLabel
                                label={<SymbolTypography text="{W} White" />}
                                control={<Checkbox checked={filter.colors.w} onChange={handleColors("w")} />}
                            />
                        </FormGroup>

                        <FormControlLabel
                            label="Exact color match?"
                            control={<Checkbox checked={filter.colorExactMatch} onChange={e => setFilter({ ...filter, colorExactMatch: e.target.checked })} />}
                        />

                        {/* <br />

                        <ul>
                            <li>[DONE] Filter by color identity (only selected colors or all cards with selected colors)</li>
                            <li>Filter by converted mana cost (equal, less than, more than)</li>
                            <li>Filter by type/subtype (restrict subtype options based on type)</li>
                            <li>Filter by format legality (choose one)</li>
                        </ul> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resetFilter} color="primary">
                            Reset
                        </Button>
                        <Button onClick={closeDialog} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <AppletActions>
                    <Tooltip title="Advanced search filter">
                        <Button onClick={openDialog}>
                            <FilterListIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Search for results">
                        <Button onClick={performSearch}>
                            <SearchIcon />
                        </Button>
                    </Tooltip>
                </AppletActions>
            </AppletPaper>
        </Grid>
    );
};

export default CardSearch;
