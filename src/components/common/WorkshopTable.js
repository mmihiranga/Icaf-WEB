import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {IconButton} from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EditWorkshop from "./WorkshopModal";
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
    API.get(`/workshop/download/${file}`, {responseType: 'blob'})
        .then(function (response) {
            download(response.data, `${file.substr(14, file.length - 1)}`);
        });
}

const deleteWorkshop = (id) => {
    confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this Workshop.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.delete(`workshop/delete/${id}`)
                        .then((res) => {
                            window.location.reload();
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

const ApproveWorkshop = (id) =>{
    confirmAlert({
        title: 'Confirm Approval',
        message: 'Are you sure to approve this Workshop.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.patch("workshop/update/status",{id:id,status:"approved"})
                        .then((res) => {
                            window.location.reload();
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

const RejectWorkshop = (id) =>{
    confirmAlert({
        title: 'Confirm to Reject',
        message: 'Are you sure to reject this Workshop.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.patch("workshop/update/status",{id:id,status:"rejected"})
                        .then((res) => {
                            window.location.reload();
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

const WorkshopTable = (props) => {
    let count = 0;
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Topic</StyledTableCell>
                        <StyledTableCell align="left">Description</StyledTableCell>
                        <StyledTableCell align="left">Proposal</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Submitted Date</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.map((row) => {
                        if (row.approvalStatus === props.status || props.status === "all") {
                            count++;
                            return (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell style={{width: "12.5%"}} align="left">{row.topic}</StyledTableCell>
                                    <StyledTableCell style={{width: "30%"}} align="left">{row.description}</StyledTableCell>
                                    <StyledTableCell style={{width: "20%"}} align="left">
                                        <IconButton edge="start" onClick={() => downloadProposal(row.filename)}>
                                            <InsertDriveFileIcon/>
                                        </IconButton>{row.filename.substr(14, row.filename.length - 1)}
                                    </StyledTableCell>
                                    <StyledTableCell style={{width: "2.5%"}} align="left">{row.approvalStatus}</StyledTableCell>
                                    <StyledTableCell style={{width: "11%"}} align="left">{new Date(row.submitDate).toUTCString()}</StyledTableCell>
                                    <StyledTableCell style={{width: "2%"}} align="left">
                                        {
                                            token.type === "reviewer" ?
                                                (row.approvalStatus!=="approved" ? (<Button color="primary" onClick={()=>{ApproveWorkshop(row._id)}}>Approve</Button>):(<Button color="primary" disabled>Approve</Button>))
                                                :(<EditWorkshop row={row}/>)
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell style={{width: "2%"}} align="left">
                                        {
                                            token.type === "reviewer" ? (row.approvalStatus!=="rejected" ?(<Button color="warning" onClick={()=>{RejectWorkshop(row._id)}}>Reject</Button>):(<Button color="warning" disabled>Reject</Button>)):(<Button onClick={() => {deleteWorkshop(row._id)}} color="warning">Delete</Button>)
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    })}
                    {count === 0 && <tr>
                        <td className="table-row-nodata">There are no any workshops to display</td>
                    </tr>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default WorkshopTable;
