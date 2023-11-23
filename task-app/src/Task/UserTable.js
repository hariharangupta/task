import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserTable = () => {
  const data = JSON.parse(localStorage.getItem("userData")) || [];

  return (
    <>
      {data?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">EMAIL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      {" "}
                      {String(item.name).toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {String(item.email).toUpperCase()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <p>No Records found</p>
      )}
    </>
  );
};

export default UserTable;
