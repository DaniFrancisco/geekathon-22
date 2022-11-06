import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Dialog, DialogTitle } from '@mui/material';
import { CalendarMonth, QrCode, Tune, Room, PermIdentity } from '@mui/icons-material';
import { Marker } from '../../api/search';
import { ItineraryCard } from '../Card';

interface NavigationAction {
    label: string,
    openDialog: boolean,
    component: React.ReactNode
}

const NAVIGATION_ACTIONS: NavigationAction[] = [
    { label: "Calendar", component: <CalendarMonth />, openDialog: true },
    { label: "QrCode", component: <QrCode />, openDialog: true },
    { label: "Preferences", component: <Tune />, openDialog: true },
    { label: "Map", component: <Room />, openDialog: false },
    { label: "Account", component: <PermIdentity />, openDialog: true },
]

interface Props {
    selectedItinerary?: Marker
}

export const Navigation: React.FC<Props> = ({ selectedItinerary }) => {
    const [action, setAction] = useState(3);
    const selectedAction = NAVIGATION_ACTIONS[action];

    return (
        <div className="fixed bottom-0 z-50">
            {selectedItinerary &&
                <ItineraryCard selectedItinerary={selectedItinerary} />
            }
            <BottomNavigation
                showLabels
                value={action}
                onChange={(_, newValue) => {
                    setAction(newValue);
                }}
            >
                {NAVIGATION_ACTIONS.map(
                    ({ label, component }) =>
                        <BottomNavigationAction
                            key={label}
                            icon={component}
                            sx={{ margin: "auto" }}
                            label={label}
                        />
                )
                }

            </BottomNavigation>
            <Dialog sx={{ zIndex: 10 }} open={selectedAction.openDialog} fullScreen>
                <DialogTitle>{selectedAction.label}</DialogTitle>
            </Dialog>
        </div>
    );
}