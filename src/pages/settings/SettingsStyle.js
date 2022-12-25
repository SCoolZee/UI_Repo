import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    hideButtons: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    gridElement: {
        margin: '15px 0px',
        display: 'flex',
        padding: '0px 20px 0px 0px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0px 15px 0px !important',
            margin: 0
        }
    },
    header: {
        backgroundColor: '#101F33',
        padding: '5px',
        color: theme.palette.common.white,
        marginTop: '15px'
    },
    rowColumn:{
        display:'flex',
        flexDirection:'row'
    }
}))