import React, { useState } from 'react';
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { SearchClient, City } from '../../api/search';
import { LocalDining, Diamond, Museum, Brush, Attractions, Landscape } from '@mui/icons-material';

const searchClient = new SearchClient();

interface Props {
    setCity: React.Dispatch<City>
}

interface Filter {
    label: string
    component: React.ReactNode
}

const FILTERS: Filter[] = [
    { label: "Cuisine", component: <LocalDining /> },
    { label: "Hidden Gems", component: <Diamond /> },
    { label: "Museums", component: <Museum /> },
    { label: "Art", component: <Brush /> },
    { label: "Main Attractions", component: <Attractions /> },
    { label: "Landscape", component: <Landscape /> },
];

export const Header: React.FC<Props> = ({ setCity }) => {
    const { data } = searchClient.getCities();
    const [filter, setFilter] = useState();

    const onChange: typeof ToggleButtonGroupProps.onChange = (_, value) => {
        setFilter(value)
    }

    return (
        <header className="p-4 text-center fixed rounded-b z-10 w-full bg-white">
            <Autocomplete
                options={data}
                size="small"
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} label="Where to?" />
                )}
                onChange={(_, location) => setCity(location as City)}
            />
            <ToggleButtonGroup onChange={onChange} sx={{ paddingTop: "8px" }} exclusive size="small">
                {FILTERS.map(
                    ({ component, label }) =>
                        <ToggleButton sx={{ display: "block" }} value={label} key={label}>
                            {component}
                            <Typography variant="caption">{label}</Typography>
                        </ToggleButton>
                )}
            </ToggleButtonGroup>
        </header >
    );
}