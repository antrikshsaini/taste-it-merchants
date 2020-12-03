// Libraries
import React from 'react'
import MediaQuery from 'react-responsive';

// MaterialUI
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';

// Images
import CustomerIcon from "../../../../assets/img/icons/account.svg"
import ReviewIcon from "../../../../assets/img/icons/review.svg"
import FeedbackIcon from "../../../../assets/img/icons/feedback.svg"

// Other
import {BASE_URL} from "../../../../config/config"


// Order No. Formatter
const orderNoFormatter = new Intl.NumberFormat('en', {
  minimumIntegerDigits: 3, 
  useGrouping: false
});

// Quantity Formatter
const quantityFormatter = new Intl.NumberFormat('en', {
  minimumIntegerDigits: 2, 
  useGrouping: false
});

function createData(orderNo, menuID, product, quantity, status, customerName, review, feedback, date ) {
  const reviewStars = "★"
  
  return {
    orderNo,
    menuID,
    product,
    quantity,
    status,
    customerInfo: [
      { customerName: customerName, review: reviewStars.repeat(review), feedback: feedback },
    ],
  }
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow className="ordersTable__row">
        {/* Order No. */}
        <TableCell component="th" scope="row">
          <div className="ordersTable__orderNoWrap">
            <div className="ordersTable__orderNo"><div>{orderNoFormatter.format(row.orderNo)}</div></div>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </TableCell>
        
        {/* For Mobile Design */}
        <MediaQuery maxDeviceWidth={1200}>
          <TableCell  className="ordersTable__nameQuantityCell">
            {/* Product Name */}
            <div className="ordersTable__productName" >{row.product}</div>
            {/* Quantity */}
            <div  className="ordersTable__quantity" >{quantityFormatter.format(row.quantity)}</div>
          </TableCell>
        </MediaQuery>

        {/* For Desk top Design */}
        <MediaQuery minDeviceWidth={1201}>
          <TableCell className="ordersTable__productName" onClick={() => setOpen(!open)}>
            <div  className="ordersTable__productName-wrap">
              {/* Menu Image */}
              <img src={`${BASE_URL}/menus/image/${row.menuID}`}  alt="Menu" className="ordersTable__menuImg"/>
              {/* Product Name */}
              <span>{row.product}</span>
            </div>
          </TableCell>
          {/* Quantity */}
          <TableCell  className="ordersTable__quantity" onClick={() => setOpen(!open)}>{quantityFormatter.format(row.quantity)}</TableCell>
        </MediaQuery>

        {/* Status */}
        <TableCell className="ordersTable__statusDropdown">
          <Select
          variant="outlined"
          defaultValue={row.status}
          InputProps={{
            readOnly: true,
          }}
          disabled
          style={{width: '300px', borderRadius: '20px'}}
          IconComponent = {ExpandMoreIcon}
          >
            <MenuItem key='1' value='2'>Being Prepared</MenuItem>
            <MenuItem key='2' value='3'>Being Delivered</MenuItem>
            <MenuItem key='3' value='4'>Delivered</MenuItem>
            <MenuItem key='4' value='5'>Reviewed</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
      <TableRow>
        {/* Detail Table */}
        <TableCell className="ordersTable__detailTable" colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <hr />
              <Table size="small" aria-label="purchases"  style={{ display: 'flex', flexDirection: 'row'}}>
                <TableHead  className="ordersTable__detailTable-tabelHeader">
                  <TableRow  style={{ display: 'flex', flexDirection: 'column'}}>
                    <TableCell className="ordersTable__detailTable-tHCell"><img src={CustomerIcon} alt="Customer"/><span>Customer's Name</span></TableCell>
                    <TableCell className="ordersTable__detailTable-tHCell"><img src={ReviewIcon} alt="Review"/><span>Review</span></TableCell>
                    <TableCell className="ordersTable__detailTable-tHCell"><img src={FeedbackIcon} alt="Feedback"/><span>feedback</span></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.customerInfo.map((customerInfoRow) => (
                    <TableRow key={customerInfoRow.customerName} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <TableCell component="th" scope="row" style={{ border: 'none', fontFamily: 'NexaXBold'}} className="ordersTable__detailTable-cell">
                        {customerInfoRow.customerName}
                      </TableCell>
                      <TableCell style={{ border: 'none', fontFamily: 'NexaXBold'}} className="ordersTable__detailTable-cell">{customerInfoRow.review ? <span style={{color: '#FFC400'}}>{customerInfoRow.review}</span> : 'Not reviewed yet'}</TableCell>
                      <TableCell style={{ border: 'none', fontFamily: 'NexaXBold'}} className="ordersTable__detailTable-cell">{customerInfoRow.feedback ? customerInfoRow.feedback: 'Not reviewed yet'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}


export default function OrderTable(props) {
  const rows = []
  const orders = props.orders
  
  for(let i=0; i<orders.length; i++){
    const newData = createData(i+1, orders[i].menuID, orders[i].menuName, orders[i].forHowManyPeople, orders[i].orderStatusID, `${orders[i].firstName} ${orders[i].lastName}`, orders[i].rate, orders[i].review, orders[i].createdAt)
    rows[i]=(newData)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead  className="ordersTable__tabelHeader">
          <TableRow>
            <TableCell className="table__orderNoHeader">Order No.</TableCell>
            <TableCell className="table__productHeader">Product</TableCell>
            <TableCell className="table__quantityHeader">Quantity</TableCell>
            <TableCell className="table__statusHeader">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} key={row.orderNo}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
