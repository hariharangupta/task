// using third party API to the dat to the table

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import { CircularProgress } from "@mui/material";

const ApiDataTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("https://jsonplaceholder.org/posts")
      .then((res) => {
        const APIdata = res.data;
        setData(APIdata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: "auto", width: "80%", border: "1px solid black" }}>
      {" "}
      <h1>Using third party API </h1>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : data.length > 0 ? (
        <>
          {" "}
          <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 50, margin: "auto" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow style={{ background: "black" }}>
                    <TableCell align="center" style={{ color: "white " }}>
                      Category
                    </TableCell>
                    <TableCell align="center" style={{ color: "white " }}>
                      Content
                    </TableCell>
                    <TableCell align="center" style={{ color: "white " }}>
                      Title
                    </TableCell>
                    <TableCell align="center" style={{ color: "white " }}>
                      Slug
                    </TableCell>
                    <TableCell align="center" style={{ color: "white " }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((item) => (
                    <TableRow
                      key={item.id}
                      style={{
                        background: item.id % 2 === 0 ? "#9d9d9d" : "#ededed",
                      }}
                    >
                      <TableCell align="center">{item.category}</TableCell>
                      <TableCell align="center">
                        {`${item.content.substring(0, 50)}...`}
                      </TableCell>
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">{item.slug}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              count={data.length}
              component="div"
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      ) : (
        <h1>No Records found.</h1>
      )}
    </div>
  );
};

export default ApiDataTable;
