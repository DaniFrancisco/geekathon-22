import React from 'react';

import { Marker } from "../../api/search";
import { Box, Typography, CardMedia, CardContent, CardActions, Button, Card, Chip } from '@mui/material';
import { Headset, Star, TransferWithinAStation } from '@mui/icons-material';

interface Props {
    selectedItinerary: Marker
}

const ITINERARY_TYPE_MAPPING: Record<Marker["type"], React.ReactNode> = {
    audio: <Headset />,
    trail: <TransferWithinAStation />
}

export const ItineraryCard: React.FC<Props> = ({ selectedItinerary }) => {
    return (
        <Card sx={{ padding: "8px" }}>
            <Box sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={selectedItinerary.photo}
                    sx={{ maxHeight: "12rem", padding: "12px" }}
                />
                <Box>
                    <CardContent sx={{ padding: 0 }} >
                        <Typography gutterBottom variant="subtitle2" component="div">
                            {ITINERARY_TYPE_MAPPING[selectedItinerary.type]}
                            {selectedItinerary.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedItinerary.description}
                        </Typography>
                        <Typography variant="overline" color="text.secondary">
                            {`Tour by ${selectedItinerary.by}`}
                        </Typography>
                        <Box>
                            <Star />
                            <Typography variant="overline" color="text.secondary">
                                {`${selectedItinerary.rating.avg} (${selectedItinerary.rating.numberOfValuations})`}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Box>

            {selectedItinerary.tags.map(tag => <Chip label={tag} />)}
        </Card>
    )
}