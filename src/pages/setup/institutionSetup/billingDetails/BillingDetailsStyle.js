import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    gridElement: {
        margin: '15px 0px',
        position: 'relative',
        display: 'flex',
        padding: '0px 20px 0px 0px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0px 15px 0px !important',
            margin: 0
        }
    },
    hideButtons: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    header: {
        backgroundColor: '#101F33',
        padding: '5px',
        color: theme.palette.common.white,
        marginTop: '10px'
    },
    inputDesign: {
        fontSize: '1rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
        fontWeight: '400',
        lineHeight: "1.5",
        letterSpacing: '0.00938em',
        '& .MuiInputBase-input': {
            padding: '5px 0 7px'
        },
        [theme.breakpoints.down('sm')]: {
            //fontSize: '1rem !important',
            padding: '7px 10px 0px 7px',
            '& .MuiInputBase-input': {
                padding: '6px 0 7px'
            }
        },

    },
    multiLineInputDesign: {
        fontSize: '1rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
        fontWeight: '400',
        lineHeight: "1.5",
        letterSpacing: '0.00938em',
        padding: '0px 10px 0px 7px !important',
        '& .MuiInputBase-input': {
            padding: '2px 0 7px'
        },
        [theme.breakpoints.down('sm')]: {
            //fontSize: '1rem !important',
            padding: '7px 10px 0px 7px',
            '& .MuiInputBase-input': {
                padding: '6px 0 7px'
            }
        },

    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '10px'
        }
    },
    label: {
        fontSize: '1rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
        fontWeight: '400',
        lineHeight: "1.5",
        letterSpacing: '0.00938em',
        color: theme.palette.grey[700],
        padding: '3px 10px 0px 7px',
        '& .MuiTypography-body1': {
            fontSize: '1.3rem !important',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem !important',
            padding: '7px 10px 0px 7px',
            '& .MuiTypography-body1': {
                fontSize: '1rem !important',
            },
        }
    },
    modalDesign: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        '& > box-116': {
            margin: '0px',
            maxWidth: '0px'
        }
    },
    toolTip: {
        position: 'inherit',
        bottom: '11% !important',
        right: '25% !important',
        display: (localStorage.getItem('activeSubscription') === 'true') ? 'none !important' : 'inline-block !important'
    },
    hideToolTip: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));