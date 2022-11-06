import React, { useState } from 'react';
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, Typography } from '@mui/material';
import { SearchClient, City } from '../../api/search';
import { LocalDining, Diamond, Museum, Brush, Attractions, Landscape } from '@mui/icons-material';
import { Filter, FilterType } from '../../App';

const searchClient = new SearchClient();

interface Props {
    setCity: React.Dispatch<City>
    filter: Filter | unknown
    setFilter: React.Dispatch<FilterType>
}

const FILTERS: Filter[] = [
    { slug: "cuisine", label: "Cuisine", component: <LocalDining /> },
    { slug: "hidden-gems", label: "Hidden Gems", component: <Diamond /> },
    { slug: "museums", label: "Museums", component: <Museum /> },
    { slug: "art", label: "Art", component: <Brush /> },
    { slug: "main-attractions", label: "Main Attractions", component: <Attractions /> },
    { slug: "landscape", label: "Landscape", component: <Landscape /> },
];

export const Header: React.FC<Props> = ({ setCity, filter, setFilter }) => {
    const { data } = searchClient.getCities();

    const onChange: ToggleButtonGroupProps["onChange"] = (_, value) => {
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
            <ToggleButtonGroup value={filter} onChange={onChange} sx={{ paddingTop: "8px" }} exclusive size="small">
                {FILTERS.map(
                    ({ component, slug, label }) =>
                        <ToggleButton sx={{ display: "block" }} value={slug} key={slug}>
                            {component}
                            <Typography fontSize={8} >{label}</Typography>
                        </ToggleButton>
                )}
            </ToggleButtonGroup>
        </header >
    );
}