// React (Private Scope)
import React from "react";

// Load library for Table Component
const Table = require("react-data-table-component")["default"];

//////////////////////////////// Component START ///////////////////////////////
const CustomTable = function (props) {
  // Component Styling
  const Style = require("./style")(
    props.rowTextColor,
    props.altRowBgColor,
    props.altTextColor,
    props.headerBgColor,
    props.shadowColor,
    props.rowBgColor,
    props.dense,
    props.rowBorderColor,
    props.headBorderColor,
    props.rowBorderType,
    props.headBorderType,
    props.footerBgColor,
    props.footerBorderType,
    props.footerBorderColor,
    props.rowPaddingTop,
    props.rowPaddingBottom,
    props.headPaddingTop,
    props.headPaddingBottom,
    props.headMarginTop,
    props.headMarginBottom,
    props.textAlign,
    props.rowTextColor,
    props.headTextColor
  );

  // Return Web Table Component
  return (
    <>
      <Table
        className={props.className}
        columns={props.tableSchema}
        data={props.tableData}
        noTableHead={props.noHeader}
        fixedHeader={props.fixedHeader}
        fixedHeaderScrollHeight="30vh"
        responsive={true}
        customStyles={props.customStyles}
        conditionalRowStyles={props.conditionalRowStyles}
        dense={props.dense}
        onRowClicked={props.onRowClicked}
        progressPending={props.progressPending}
        progressComponent={props.progressComponent}
        pagination={props.pagination}
        paginationPerPage={props.paginationPerPage}
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer={props.paginationServer}
        paginationTotalRows={props.paginationTotalRows}
        onChangeRowsPerPage={props.onChangeRowsPerPage}
        onChangePage={props.onChangePage}
        expandableRowsComponent={props.expandableRowsComponent}
        expandableRows={props.expandableRows}
        expandOnRowClicked={props.expandOnRowClicked}
        expandOnRowDoubleClicked={props.expandOnRowDoubleClicked}
        expandableRowsHideExpander={props.expandableRowsHideExpander}
      />

      {props.footerSchema && props.footerData ? (
        <Table
          columns={props.footerSchema}
          data={props.footerData}
          noTableHead={true}
          fixedHeader={props.fixedHeader}
          responsive={true}
          customStyles={Style.footer}
          dense={props.dense}
          onRowClicked={props.onRowClicked}
        />
      ) : null}
    </>
  );
}; ///////////////////////////// Component END //////////////////////////////////

export default CustomTable;