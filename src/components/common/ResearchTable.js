import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {IconButton} from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EditResearchModal from "./ResearchModal";
import {Button} from "reactstrap";
import API from "../api";
import download from "js-file-download";
import {confirmAlert} from "react-confirm-alert";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import PaymentModal from "./PaymentModal";
import EditWorkshop from "./WorkshopModal";

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
    API.get(`/research/download/${file}`, {responseType: 'blob'})
        .then(function (response) {
            download(response.data, `${file.substr(14, file.length - 1)}`);
        });
}

const deleteResearch = (id) => {
    confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this Research.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.delete(`research/delete/${id}`)
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
const ApproveResearch = (id) =>{
    confirmAlert({
        title: 'Confirm Approval',
        message: 'Are you sure to approve this research.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.patch("research/update/status",{id:id,status:"approved"})
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

const RejectResearch = (id) =>{
    confirmAlert({
        title: 'Confirm to Reject',
        message: 'Are you sure to reject this research.',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    API.patch("research/update/status",{id:id,status:"rejected"})
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
const ResearchTable = (props) => {
    let count = 0;
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="left">Proposal</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Submitted Date</StyledTableCell>
                        <StyledTableCell align="left">Payment</StyledTableCell>
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
                                    <StyledTableCell style={{width: "20%"}} align="left">{row.title}</StyledTableCell>
                                    <StyledTableCell style={{width: "30%"}} align="left">
                                        <IconButton edge="start" onClick={() => downloadProposal(row.filename)}>
                                            <InsertDriveFileIcon/>
                                        </IconButton>{row.filename.substr(14, row.filename.length - 1)}
                                    </StyledTableCell>
                                    <StyledTableCell style={{width: "10%"}} align="left">{row.approvalStatus}</StyledTableCell>
                                    <StyledTableCell style={{width: "20%"}} align="left">{new Date(row.submitDate).toUTCString()}</StyledTableCell>
                                    <StyledTableCell style={{width: "10%"}} align="left">{row.paymentStatus}</StyledTableCell>
                                    <StyledTableCell style={{width: "5%"}} align="left">
                                    {
                                        token.type === "reviewer" ?
                                            (row.approvalStatus!=="approved" ? (<Button color="primary" onClick={()=>{ApproveResearch(row._id)}}>Approve</Button>):(<Button color="primary" disabled>Approve</Button>))
                                            :((row.approvalStatus === "approved" && row.paymentStatus === "pending") ?
                                                <PaymentModal row={row}/>
                                                :<EditResearchModal row={row}/>
                                            )
                                    }
                                    </StyledTableCell>
                                    <StyledTableCell style={{width: "5%"}} align="left">
                                        {
                                            token.type === "reviewer" ? (row.approvalStatus!=="rejected" ?(<Button color="warning" onClick={()=>{RejectResearch(row._id)}}>Reject</Button>)
                                                :(<Button color="warning" disabled>Reject</Button>))
                                                :(<Button onClick={() => {deleteResearch(row._id)}} color="warning">Delete</Button>)
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    })}
                    {count === 0 && <tr>
                        <td className="table-row-nodata">There are no any researches to display</td>
                    </tr>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default ResearchTable;
