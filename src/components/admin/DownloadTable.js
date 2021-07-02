import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {IconButton} from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EditWorkshop from "../common/WorkshopModal";
import {Button} from "reactstrap";
import API from "../api";
import download from "js-file-download";
import {confirmAlert} from "react-confirm-alert";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const token =JSON.parse(sessionStorage.getItem("token"));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "grey",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const downloadProposal = (file) => {
    API.get(`/download/download/${file}`, {responseType: 'blob'})
        .then(function (response) {
            download(response.data, `${file.substr(14, file.length - 1)}`);
        });
}

const deleteDocuments= (id) => {
    confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this Document.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.delete(`download/delete/${id}`)
                        .then((res) => {

                        }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            {
                label: 'No'
            }
        ]
    });
}



const DownloadTable = (props) => {
    let count = 0;
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                        <StyledTableCell align="left">Templates</StyledTableCell>
                        <StyledTableCell align="left">Uploaded Date</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.map((row) => {
                        if (row.type === props.status || props.status === "all") {
                            count++;
                            return (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell style={{width: "12.5%"}} align="left">{row.type}</StyledTableCell>
                                    <StyledTableCell style={{width: "30%"}} align="left">{row.description}</StyledTableCell>
                                    <StyledTableCell style={{width: "20%"}} align="left">
                                        <IconButton edge="start" onClick={() => downloadProposal(row.filename)}>
                                            <InsertDriveFileIcon/>
                                        </IconButton>{row.filename.substr(14, row.filename.length - 1)}
                                    </StyledTableCell>
                                    <StyledTableCell style={{width: "11%"}} align="left">{new Date(row.submitDate).toUTCString()}</StyledTableCell>
                                    
                                    <StyledTableCell style={{width: "2%"}} align="left">
                                        <Button onClick={() => {deleteDocuments(row._id)}} color="warning">Delete</Button>
                                        
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    })}
                    {count === 0 && <tr>
                        <td className="table-row-nodata">There are no any documents to display</td>
                    </tr>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DownloadTable;
